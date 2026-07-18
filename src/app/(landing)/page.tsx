import type { Metadata } from "next";
import OpenInBrowserButton from "@/components/landing/OpenInBrowserButton";

const envWebApp = process.env.NEXT_PUBLIC_WEB_APP_URL;
const WEB_APP_HREF =
  envWebApp && envWebApp.length > 0
    ? envWebApp.replace(/\/$/, "")
    : "https://app.tafkira.app";

export const metadata: Metadata = {
  title: "تفكيرة — التحضير للآيلتس",
  description:
    "تفكيرة يساعدك على التحضير للآيلتس: تدرب على المحادثة والاستماع مع معلمين. افتح التطبيق في متصفحك وابدأ الآن.",
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
        <p className="mt-4 max-w-md text-base font-medium leading-relaxed text-off-white/90">
          تدرب على المحادثة والاستماع والتحضير للامتحان. افتح التطبيق في
          متصفحك وابدأ من حيث توقفت.
        </p>

        <div className="mt-8 w-full">
          <OpenInBrowserButton appUrl={WEB_APP_HREF} label="ابدأ التحضير" />
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

        <p className="mt-4 max-w-sm text-xs leading-relaxed text-off-white/70">
          ننصح بفتح التطبيق في Chrome أو Safari وليس داخل متصفح
          إنستغرام أو فيسبوك، حتى لا تُفقد جلسة التدريب عند الإغلاق.
        </p>
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
