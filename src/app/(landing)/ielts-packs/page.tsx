import type { Metadata } from "next";
import OpenInBrowserButton from "@/components/landing/OpenInBrowserButton";

const PACKS_APP_HREF = "https://app.tafkira.app/packs";

export const metadata: Metadata = {
  title: "تفكيرة — دورات التحضير للآيلتس",
  description:
    "اختر دورة التحضير المناسبة لك: أساسيات الأيلتس، الكتابة، أو الدورة الشاملة. افتح التطبيق واختر دورتك.",
};

const PACKS = [
  {
    name: "أساسيات الأيلتس",
    englishName: "IELTS Essential",
    blurb: "للطلاب في بداية التحضير للآيلتس.",
    sessions: "6 حصص",
    price: "5,500 دج",
  },
  {
    name: "دورة تحسين الكتابة للأيلتس",
    englishName: "IELTS Writing",
    blurb: "لمن يريد رفع درجة الكتابة في الآيلتس.",
    sessions: "5 حصص",
    price: "4,500 دج",
  },
  {
    name: "الدورة الشاملة للتحضير للأيلتس",
    englishName: "IELTS Complete",
    blurb: "تحضير كامل: استماع، قراءة، كتابة، ومحادثة.",
    sessions: "13 حصة",
    price: "11,000 دج",
  },
] as const;

export default function IeltsPacksLandingPage() {
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
          دورات التحضير للآيلتس
        </h1>

        <p className="mt-4 max-w-md text-base font-medium leading-relaxed text-off-white/90 sm:text-lg">
          دورات فردية حسب مستواك وهدفك. افتح التطبيق، اختر الدورة، واطّلع على
          التفاصيل الكاملة هناك.
        </p>

        <div className="mt-8 w-full">
          <OpenInBrowserButton
            appUrl={PACKS_APP_HREF}
            label="ابدأ دورتك"
          />
        </div>

        <ul className="mt-8 w-full space-y-3 text-right" dir="rtl">
          {PACKS.map((pack) => (
            <li
              key={pack.englishName}
              className="rounded-[10px] bg-white/10 px-4 py-4 text-off-white"
            >
              <p className="text-base font-bold sm:text-lg">{pack.name}</p>
              <p className="mt-0.5 text-xs font-medium text-off-white/70">
                {pack.englishName}
              </p>
              <p className="mt-2 text-sm font-medium leading-relaxed text-off-white/90 sm:text-base">
                {pack.blurb}
              </p>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-sm font-medium sm:text-base">
                <span className="text-off-white/85">{pack.sessions}</span>
                <span className="font-bold text-classic-blue-green">
                  {pack.price}
                </span>
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-6 max-w-sm text-sm font-medium leading-relaxed text-off-white/75 sm:text-base">
          مدة كل حصة 60 دقيقة. التفاصيل الكاملة لكل دورة داخل التطبيق.
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
