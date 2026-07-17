"use client";

import {
  formatPrice,
  getSessionPrice,
  type SessionDuration,
  type MinDuration,
} from "@/lib/freelance-english-params";

const FEATURES = [
  "حصة فردية أنت و الأستاذ فقط",
  "التدرب على التحدث مباشرة مع الأستاذ المرافق",
  "خبرة الأستاذ في التحضير للأيلتس ستساعدك على التقدم بشكل أفضل",
] as const;

type FreelanceEnglishHeroProps = {
  sessionTitle: string;
  teacherName: string;
  basePrice: number | null;
  duration: SessionDuration;
  minDuration: MinDuration;
  onDurationChange: (duration: SessionDuration) => void;
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

export default function FreelanceEnglishHero({
  sessionTitle,
  teacherName,
  basePrice,
  duration,
  minDuration,
  onDurationChange,
}: FreelanceEnglishHeroProps) {
  const displayPrice = getSessionPrice(basePrice, duration);
  const availableDurations = ([30, 60, 90, 120] as SessionDuration[]).filter(
    (d): d is SessionDuration => d >= minDuration,
  );

  return (
    <div className="mx-auto mb-8 w-full max-w-sm sm:mb-10">
      <div className="overflow-hidden rounded-2xl bg-midnight-blue px-5 pb-6 pt-6 text-center text-off-white shadow-sm sm:px-6 sm:pb-7 sm:pt-7">
        <div>
          <p className="text-sm font-medium text-white/70">عنوان الحصة:</p>
          <h1 className="mt-1 text-xl font-bold leading-snug sm:text-2xl">
            {sessionTitle}
          </h1>
        </div>

        <div className="mt-5">
          <p className="text-sm font-medium text-white/70">الاستاذ الموافق</p>
          <p className="mt-1 text-lg font-bold sm:text-xl">
            {teacherName || "—"}
          </p>
        </div>

        <hr className="my-5 border-white/20" />

        <div>
          <p className="text-sm font-medium text-white/70">السعر:</p>
          <p className="mt-1 text-3xl font-bold sm:text-4xl">
            {formatPrice(displayPrice)}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-white/80">
            لحصة مدتها {duration} دقيقة
          </p>

          <div
            className="mx-auto mt-4 inline-flex rounded-full bg-white/10 p-1"
            role="group"
            aria-label="مدة الحصة"
          >
            {availableDurations.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => onDurationChange(d)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  duration === d
                    ? "bg-primary-blue text-off-white"
                    : "text-white/80 hover:text-off-white"
                }`}
                aria-pressed={duration === d}
              >
                {d} دقيقة
              </button>
            ))}
          </div>
        </div>

        <hr className="my-5 border-white/20" />

        <div>
          <p className="text-sm font-medium text-white/70">ماذا ستحصل؟</p>
          <ul className="mt-3 space-y-3 text-right" dir="rtl">
            {FEATURES.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <CheckIcon />
                <span className="flex-1 text-sm leading-relaxed sm:text-base">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <a
          href="#register"
          className="mt-6 flex w-full items-center justify-center rounded-[10px] border-b-4 border-white/30 bg-primary-blue px-6 py-3.5 text-center text-base font-bold text-off-white transition hover:opacity-95"
        >
          إحجز حصتك الآن
        </a>
      </div>
    </div>
  );
}
