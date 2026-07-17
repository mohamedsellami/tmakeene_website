const DEFAULT_TIMEZONE = "Africa/Algiers";

function parseDateKey(dateKey: string): { year: number; month: number; day: number } {
  const [year, month, day] = dateKey.split("-").map(Number);
  return { year, month, day };
}

function parseTimeParts(time: string): { hour: number; minute: number } {
  const [hour, minute] = time.slice(0, 5).split(":").map(Number);
  return { hour, minute };
}

function getTimezoneOffsetMinutes(
  timeZone: string,
  year: number,
  month: number,
  day: number,
): number {
  const noonUtc = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    timeZoneName: "longOffset",
  }).formatToParts(noonUtc);

  const offsetPart = parts.find((part) => part.type === "timeZoneName")?.value;
  const match = offsetPart?.match(/GMT([+-])(\d{1,2})(?::(\d{2}))?/);
  if (!match) return 0;

  const sign = match[1] === "+" ? 1 : -1;
  const hours = Number(match[2]);
  const minutes = Number(match[3] ?? 0);
  return sign * (hours * 60 + minutes);
}

export function localDateTimeToUtc(
  dateKey: string,
  timeKey: string,
  timeZone: string = DEFAULT_TIMEZONE,
): Date {
  const { year, month, day } = parseDateKey(dateKey);
  const { hour, minute } = parseTimeParts(timeKey);
  const offsetMinutes = getTimezoneOffsetMinutes(timeZone, year, month, day);
  return new Date(
    Date.UTC(year, month - 1, day, hour, minute) - offsetMinutes * 60 * 1000,
  );
}

export function formatBookingDateTimeArabic(
  startsAt: Date,
  timeZone: string = DEFAULT_TIMEZONE,
): string {
  return new Intl.DateTimeFormat("ar-DZ", {
    timeZone,
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(startsAt);
}

export function formatDateKey(date: Date): string {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function addDaysUtc(dateKey: string, days: number): string {
  const { year, month, day } = parseDateKey(dateKey);
  const next = new Date(Date.UTC(year, month - 1, day + days));
  return formatDateKey(next);
}

export const DEFAULT_SLOT_HORIZON_DAYS = 21;
export const MIN_NOTICE_HOURS = 24;
