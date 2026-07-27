"use client";

import { useEffect, useState } from "react";
import { AMA_SESSION_FEATURES } from "@/lib/ama-session";

type AmaSessionHeroProps = {
  sessionTitle: string;
  teacherName: string;
  scheduleLabel: string;
  scheduledAt: string;
};

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={22}
      height={22}
      viewBox="0 0 22 22"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <circle cx="11" cy="11" r="11" fill="#34A0A4" />
      <path
        d="M6.5 11.2l2.8 2.8 6.2-6.4"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type CountdownParts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getCountdownParts(targetMs: number, nowMs: number): CountdownParts | null {
  const diff = targetMs - nowMs;
  if (diff <= 0) return null;

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds };
}

function formatScheduledAtFallback(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "—";

  return new Intl.DateTimeFormat("ar-DZ", {
    timeZone: "Africa/Algiers",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex min-w-[3.25rem] flex-col items-center rounded-lg bg-white/10 px-2 py-2">
      <span className="text-lg font-bold tabular-nums sm:text-xl">
        {String(value).padStart(2, "0")}
      </span>
      <span className="mt-0.5 text-[0.65rem] font-medium text-white/70 sm:text-xs">
        {label}
      </span>
    </div>
  );
}

export default function AmaSessionHero({
  sessionTitle,
  teacherName,
  scheduleLabel,
  scheduledAt,
}: AmaSessionHeroProps) {
  const targetMs = new Date(scheduledAt).getTime();
  const [nowMs, setNowMs] = useState(() => Date.now());

  useEffect(() => {
    if (Number.isNaN(targetMs)) return;
    const id = window.setInterval(() => setNowMs(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [targetMs]);

  const countdown = Number.isNaN(targetMs)
    ? null
    : getCountdownParts(targetMs, nowMs);
  const dateTimeLabel =
    scheduleLabel.trim() || formatScheduledAtFallback(scheduledAt);

  return (
    <div className="mx-auto w-full max-w-sm">
      <div className="overflow-hidden rounded-2xl bg-midnight-blue px-5 pb-6 pt-6 text-center text-off-white shadow-sm sm:px-6 sm:pb-7 sm:pt-7">
        <div className="flex justify-center">
          <span className="inline-flex items-center rounded-full bg-warm-amber px-3 py-1 text-xs font-bold text-midnight-blue sm:text-sm">
            الأماكن محدودة
          </span>
        </div>

        <div className="mt-5">
          <p className="text-sm font-medium text-white/70">عنوان الجلسة:</p>
          <h1 className="mt-1 text-xl font-bold leading-snug sm:text-2xl">
            {sessionTitle}
          </h1>
        </div>

        <div className="mt-5">
          <p className="text-sm font-medium text-white/70">مع الأستاذة</p>
          <p className="mt-1 text-lg font-bold sm:text-xl">
            {teacherName || "—"}
          </p>
        </div>

        <hr className="my-5 border-white/20" />

        <div>
          <p className="text-sm font-medium text-white/70">السعر:</p>
          <p className="mt-1 text-3xl font-bold sm:text-4xl">مجانا</p>
          <p className="mt-3 text-sm leading-relaxed text-white/80 sm:text-base">
            {dateTimeLabel}
          </p>

          <div className="mt-4" aria-live="polite">
            {countdown ? (
              <div className="flex items-center justify-center gap-2">
                <CountdownUnit value={countdown.days} label="يوم" />
                <CountdownUnit value={countdown.hours} label="ساعة" />
                <CountdownUnit value={countdown.minutes} label="دقيقة" />
                <CountdownUnit value={countdown.seconds} label="ثانية" />
              </div>
            ) : (
              <p className="text-sm font-semibold text-warm-amber sm:text-base">
                بدأت الجلسة
              </p>
            )}
          </div>
        </div>

        <hr className="my-5 border-white/20" />

        <div>
          <p className="text-sm font-medium text-white/70">ماذا ستحصل؟</p>
          <ul className="mt-3 space-y-3 text-right" dir="rtl">
            {AMA_SESSION_FEATURES.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <CheckIcon />
                <span className="flex-1 text-sm leading-relaxed sm:text-base">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}
