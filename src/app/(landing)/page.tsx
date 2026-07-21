import type { Metadata } from "next";

const WHATSAPP_URL = "https://wa.me/213555677816";

export const metadata: Metadata = {
  title: "تفكيرة — التحضير للآيلتس",
  description:
    "تفكيرة يساعدك على التحضير للآيلتس: تدرب على المحادثة والاستماع مع معلمين.",
};

const FEATURES = [
  "تحضير مجاني مخصص للآيلتس",
  "تدرب على المحادثة مع معلم",
  "تابع تقدمك دون فقدان بياناتك",
] as const;

export default function HomeLandingPage() {
  return (
    <div className="flex min-h-dvh flex-col px-4 pb-8 pt-6 sm:px-6 sm:pt-8">
      <header className="flex justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/tafkira_logo_horizantal_white.svg"
          alt="تفكيرة"
          className="h-auto max-h-14 w-auto max-w-[min(100%,280px)] object-contain"
          width={280}
          height={56}
          decoding="async"
        />
      </header>

      <main className="mx-auto mt-10 flex w-full max-w-lg flex-1 flex-col items-center text-center sm:mt-12">
        <h1 className="text-2xl font-bold leading-snug text-off-white sm:text-3xl">
          استعد للآيلتس مع تفكيرة
        </h1>

        <div className="mt-8 w-full max-w-sm rounded-[10px] border border-warm-amber/40 bg-warm-amber/15 px-5 py-5 text-center">
          <p className="text-base font-bold leading-relaxed text-off-white">
            التطبيق متوفر لعدد محدود. تواصل معنا على واتساب باش تحصل على نسختك.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex w-full items-center justify-center rounded-[10px] bg-classic-blue-green px-4 py-3.5 text-base font-bold text-off-white shadow-sm transition hover:opacity-95 active:opacity-90 sm:text-lg"
          >
            تواصل معنا الآن
          </a>
        </div>

        <ul className="mt-8 w-full max-w-sm space-y-3 text-right" dir="rtl">
          {FEATURES.map((feature) => (
            <li
              key={feature}
              className="flex items-center gap-3 rounded-[10px] bg-white/10 px-4 py-3 text-sm font-medium text-off-white sm:text-base"
            >
              <span
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-classic-blue-green text-xs font-bold"
                aria-hidden
              >
                ✓
              </span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </main>

      <footer className="mt-10 flex justify-center pt-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/icons/app_icon.svg"
          alt=""
          className="h-10 w-10 object-contain opacity-80"
          width={40}
          height={40}
          decoding="async"
        />
      </footer>
    </div>
  );
}
