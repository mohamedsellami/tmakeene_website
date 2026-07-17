"use client";

import { useEffect, useMemo, useState } from "react";
import { localDateTimeToUtc } from "@/lib/scheduling/datetime";
import type { SessionDuration, SlotsByDate } from "@/lib/scheduling/types";

export type SelectedSlot = {
  dateKey: string;
  timeKey: string;
  startsAt: string;
};

type SessionSlotPickerProps = {
  tutorId: string;
  contentId: string;
  durationMinutes: SessionDuration;
  selectedSlot: SelectedSlot | null;
  onSlotChange: (slot: SelectedSlot | null) => void;
};

function formatDateLabel(dateKey: string): string {
  const [year, month, day] = dateKey.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
  return new Intl.DateTimeFormat("ar-DZ", {
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(date);
}

export default function SessionSlotPicker({
  tutorId,
  contentId,
  durationMinutes,
  selectedSlot,
  onSlotChange,
}: SessionSlotPickerProps) {
  const [slotsByDate, setSlotsByDate] = useState<SlotsByDate>({});
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const availableDates = useMemo(
    () => Object.keys(slotsByDate).sort(),
    [slotsByDate],
  );

  const timesForSelectedDate = selectedDate ? slotsByDate[selectedDate] ?? [] : [];

  useEffect(() => {
    if (!tutorId) {
      setSlotsByDate({});
      setSelectedDate(null);
      onSlotChange(null);
      return;
    }

    let cancelled = false;

    async function loadSlots() {
      setLoading(true);
      setErrorMessage(null);

      const params = new URLSearchParams({
        tutor_id: tutorId,
        duration_minutes: String(durationMinutes),
      });
      if (contentId) {
        params.set("content_id", contentId);
      }

      try {
        const res = await fetch(`/api/availability/slots?${params.toString()}`);
        const data = (await res.json().catch(() => null)) as
          | { slots?: SlotsByDate; error?: string }
          | null;

        if (!res.ok) {
          throw new Error(data?.error || "تعذر تحميل المواعيد.");
        }

        if (cancelled) return;

        const nextSlots = data?.slots ?? {};
        setSlotsByDate(nextSlots);

        const nextDates = Object.keys(nextSlots).sort();
        const nextSelectedDate =
          selectedSlot?.dateKey && nextSlots[selectedSlot.dateKey]
            ? selectedSlot.dateKey
            : nextDates[0] ?? null;

        setSelectedDate(nextSelectedDate);

        if (
          selectedSlot &&
          nextSelectedDate === selectedSlot.dateKey &&
          nextSlots[nextSelectedDate]?.includes(selectedSlot.timeKey)
        ) {
          return;
        }

        onSlotChange(null);
      } catch (err) {
        if (cancelled) return;
        setSlotsByDate({});
        setSelectedDate(null);
        onSlotChange(null);
        setErrorMessage(
          err instanceof Error ? err.message : "تعذر تحميل المواعيد.",
        );
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadSlots();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tutorId, contentId, durationMinutes]);

  function handleDateSelect(dateKey: string) {
    setSelectedDate(dateKey);
    onSlotChange(null);
  }

  function handleTimeSelect(timeKey: string) {
    if (!selectedDate) return;

    const startsAt = localDateTimeToUtc(selectedDate, timeKey).toISOString();
    onSlotChange({
      dateKey: selectedDate,
      timeKey,
      startsAt,
    });
  }

  if (!tutorId) {
    return (
      <p className="rounded-[10px] border border-light-grey bg-white px-4 py-3 text-sm text-grey">
        لا يمكن عرض المواعيد بدون معرّف الأستاذ.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="mb-2 block text-sm font-semibold text-midnight-blue">
          اختر اليوم
        </p>
        {loading ? (
          <p className="text-sm text-grey">جاري تحميل المواعيد...</p>
        ) : availableDates.length === 0 ? (
          <p className="rounded-[10px] border border-light-grey bg-white px-4 py-3 text-sm text-grey">
            لا توجد مواعيد متاحة حالياً.
          </p>
        ) : (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {availableDates.map((dateKey) => {
              const isSelected = selectedDate === dateKey;
              return (
                <button
                  key={dateKey}
                  type="button"
                  onClick={() => handleDateSelect(dateKey)}
                  className={`shrink-0 rounded-[10px] border px-4 py-3 text-sm font-semibold transition ${
                    isSelected
                      ? "border-primary-blue bg-primary-blue/10 text-primary-blue"
                      : "border-light-grey bg-white text-primary-text hover:border-primary-blue/40"
                  }`}
                >
                  {formatDateLabel(dateKey)}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {selectedDate && timesForSelectedDate.length > 0 ? (
        <div>
          <p className="mb-2 block text-sm font-semibold text-midnight-blue">
            اختر الوقت
          </p>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
            {timesForSelectedDate.map((timeKey) => {
              const isSelected =
                selectedSlot?.dateKey === selectedDate &&
                selectedSlot?.timeKey === timeKey;

              return (
                <button
                  key={timeKey}
                  type="button"
                  onClick={() => handleTimeSelect(timeKey)}
                  className={`rounded-[10px] border px-3 py-2.5 text-sm font-semibold transition ${
                    isSelected
                      ? "border-primary-blue bg-primary-blue/10 text-primary-blue"
                      : "border-light-grey bg-white text-primary-text hover:border-primary-blue/40"
                  }`}
                >
                  {timeKey}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      {errorMessage ? (
        <p
          className="rounded-[10px] border border-cardinal/30 bg-cardinal/10 px-3 py-2 text-sm font-medium text-cardinal"
          role="alert"
        >
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
}
