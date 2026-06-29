const FEATURES = [
  "8 حصص مباشرة مع أستاذ للتدرب على التحدث",
  "تطبيق للتدرب بين الحصص",
  "مشاركة خبرة الأستاذ في الفريلانس",
] as const;

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

export default function FreelanceEnglishHero() {
  return (
    <div className="relative mx-auto mb-8 w-full max-w-sm sm:mb-10">
      <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2">
        <span className="inline-block rounded-full bg-warm-amber px-4 py-1.5 text-sm font-bold text-midnight-blue">
          تبقى 5 أماكن فقط!
        </span>
      </div>

      <div className="overflow-hidden rounded-2xl bg-midnight-blue px-5 pb-6 pt-8 text-center text-off-white shadow-sm sm:px-6 sm:pb-7 sm:pt-9">
        <div>
          <p className="text-sm font-medium text-white/70">عنوان المسار:</p>
          <h1 className="mt-1 text-xl font-bold leading-snug sm:text-2xl">
            Handle Your English-Speaking Clients Confidently
          </h1>
        </div>

        <hr className="my-5 border-white/20" />

        <div>
          <p className="text-sm font-medium text-white/70">السعر:</p>
          <p className="mt-1 text-3xl font-bold sm:text-4xl">4000 دج</p>
          <p className="mt-2 text-sm leading-relaxed text-white/80">
            يتم إسترجاع المبلغ بشكل كامل إذا لم تعجبك الحصة الأولى!
          </p>
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
          احجز مكانك الآن!
        </a>
      </div>
    </div>
  );
}
