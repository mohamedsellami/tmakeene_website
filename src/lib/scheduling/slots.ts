import { getSupabaseAdmin } from "@/lib/supabase/server";
import {
  addDaysUtc,
  formatDateKey,
  localDateTimeToUtc,
  MIN_NOTICE_HOURS,
  DEFAULT_SLOT_HORIZON_DAYS,
} from "@/lib/scheduling/datetime";
import type {
  BookingRow,
  SessionDuration,
  SlotsByDate,
  TutorAvailabilityRow,
} from "@/lib/scheduling/types";

const DEFAULT_TIMEZONE = "Africa/Algiers";

type GetAvailableSlotsParams = {
  tutorId: string;
  contentId?: string;
  durationMinutes: SessionDuration;
  fromDate?: string;
  toDate?: string;
};

type SlotCandidate = {
  dateKey: string;
  timeKey: string;
  startsAt: Date;
  endsAt: Date;
};

function parseTimeParts(time: string): { hour: number; minute: number } {
  const [hour, minute] = time.slice(0, 5).split(":").map(Number);
  return { hour, minute };
}

function formatTimeKey(hour: number, minute: number): string {
  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

function timeToMinutes(time: string): number {
  const { hour, minute } = parseTimeParts(time);
  return hour * 60 + minute;
}

function parseDateKey(dateKey: string): { year: number; month: number; day: number } {
  const [year, month, day] = dateKey.split("-").map(Number);
  return { year, month, day };
}

function matchesContentScope(
  rowContentId: string | null,
  requestedContentId?: string,
): boolean {
  if (!rowContentId) return true;
  if (!requestedContentId) return true;
  return rowContentId === requestedContentId;
}

function expandAvailabilityToSlots(
  availability: TutorAvailabilityRow[],
  durationMinutes: SessionDuration,
  fromDate: string,
  toDate: string,
): SlotCandidate[] {
  const slots: SlotCandidate[] = [];
  let cursor = fromDate;

  while (cursor <= toDate) {
    const { year, month, day } = parseDateKey(cursor);
    const dayOfWeek = new Date(Date.UTC(year, month - 1, day)).getUTCDay();

    for (const row of availability) {
      if (row.day_of_week !== dayOfWeek) continue;

      const startMinutes = timeToMinutes(row.start_time);
      const endMinutes = timeToMinutes(row.end_time);

      for (
        let minute = startMinutes;
        minute + durationMinutes <= endMinutes;
        minute += durationMinutes
      ) {
        const hour = Math.floor(minute / 60);
        const min = minute % 60;
        const timeKey = formatTimeKey(hour, min);
        const startsAt = localDateTimeToUtc(cursor, timeKey, row.timezone);
        const endsAt = new Date(startsAt.getTime() + durationMinutes * 60 * 1000);

        slots.push({
          dateKey: cursor,
          timeKey,
          startsAt,
          endsAt,
        });
      }
    }

    cursor = addDaysUtc(cursor, 1);
  }

  return slots;
}

function overlapsBooking(
  slotStart: Date,
  slotEnd: Date,
  booking: BookingRow,
): boolean {
  const bookingStart = new Date(booking.starts_at);
  const bookingEnd = new Date(booking.ends_at);
  return slotStart < bookingEnd && slotEnd > bookingStart;
}

function groupSlotsByDate(slots: SlotCandidate[]): SlotsByDate {
  const grouped: SlotsByDate = {};

  for (const slot of slots) {
    if (!grouped[slot.dateKey]) {
      grouped[slot.dateKey] = [];
    }
    grouped[slot.dateKey].push(slot.timeKey);
  }

  for (const dateKey of Object.keys(grouped)) {
    grouped[dateKey].sort();
  }

  return grouped;
}

export async function getAvailableSlots(
  params: GetAvailableSlotsParams,
): Promise<SlotsByDate> {
  const supabase = getSupabaseAdmin();
  const durationMinutes = params.durationMinutes;
  const fromDate =
    params.fromDate ?? formatDateKey(new Date(Date.now()));
  const toDate =
    params.toDate ?? addDaysUtc(fromDate, DEFAULT_SLOT_HORIZON_DAYS);

  const { data: availabilityRows, error: availabilityError } = await supabase
    .from("tutor_availability")
    .select("*")
    .eq("tutor_id", params.tutorId)
    .eq("is_active", true);

  if (availabilityError) {
    throw availabilityError;
  }

  const availability = (availabilityRows ?? []).filter((row) =>
    matchesContentScope(row.content_id, params.contentId),
  ) as TutorAvailabilityRow[];

  if (availability.length === 0) {
    return {};
  }

  const rangeStartUtc = localDateTimeToUtc(
    fromDate,
    "00:00",
    availability[0]?.timezone ?? DEFAULT_TIMEZONE,
  );
  const rangeEndUtc = localDateTimeToUtc(
    addDaysUtc(toDate, 1),
    "00:00",
    availability[0]?.timezone ?? DEFAULT_TIMEZONE,
  );

  const { data: bookingRows, error: bookingsError } = await supabase
    .from("bookings")
    .select("id, tutor_id, content_id, starts_at, ends_at, duration_minutes, status")
    .eq("tutor_id", params.tutorId)
    .in("status", ["pending", "confirmed"])
    .gte("starts_at", rangeStartUtc.toISOString())
    .lt("starts_at", rangeEndUtc.toISOString());

  if (bookingsError) {
    throw bookingsError;
  }

  const bookings = (bookingRows ?? []) as BookingRow[];
  const minStartTime = Date.now() + MIN_NOTICE_HOURS * 60 * 60 * 1000;

  const candidates = expandAvailabilityToSlots(
    availability,
    durationMinutes,
    fromDate,
    toDate,
  );

  const available = candidates.filter((slot) => {
    if (slot.startsAt.getTime() < minStartTime) return false;
    return !bookings.some((booking) =>
      overlapsBooking(slot.startsAt, slot.endsAt, booking),
    );
  });

  return groupSlotsByDate(available);
}

export async function isSlotAvailable(params: {
  tutorId: string;
  startsAt: string;
  durationMinutes: SessionDuration;
}): Promise<boolean> {
  const startsAt = new Date(params.startsAt);
  if (Number.isNaN(startsAt.getTime())) return false;

  const minStartTime = Date.now() + MIN_NOTICE_HOURS * 60 * 60 * 1000;
  if (startsAt.getTime() < minStartTime) return false;

  const endsAt = new Date(startsAt.getTime() + params.durationMinutes * 60 * 1000);
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("bookings")
    .select("id, starts_at, ends_at")
    .eq("tutor_id", params.tutorId)
    .in("status", ["pending", "confirmed"])
    .lt("starts_at", endsAt.toISOString())
    .gt("ends_at", startsAt.toISOString());

  if (error) {
    throw error;
  }

  return (data ?? []).length === 0;
}

export function getDefaultSlotRange(): { from: string; to: string } {
  const from = formatDateKey(new Date(Date.now()));
  return { from, to: addDaysUtc(from, DEFAULT_SLOT_HORIZON_DAYS) };
}
