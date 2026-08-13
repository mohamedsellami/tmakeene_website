import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "تفكيرة — قريباً",
  description: "الموقع غير متاح مؤقتاً. نعود قريباً.",
  robots: { index: false, follow: false },
};

export default function ComingSoonPage() {
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

      <main className="mx-auto flex w-full max-w-lg flex-1 flex-col items-center justify-center text-center">
        <p className="text-sm font-semibold tracking-wide text-classic-blue-green sm:text-base">
          Coming soon
        </p>
        <h1 className="mt-3 text-3xl font-bold leading-snug text-off-white sm:text-4xl">
          قريباً
        </h1>
        <p className="mt-4 max-w-md text-base font-medium leading-relaxed text-off-white/90 sm:text-lg">
          الموقع غير متاح مؤقتاً. نعمل على تحسين التجربة، ونعود قريباً.
        </p>
      </main>

      <footer className="flex justify-center pt-2">
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
