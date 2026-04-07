import type { Metadata } from "next";
import Image from "next/image";

const envApk = process.env.NEXT_PUBLIC_APK_URL;
const APK_HREF =
  envApk && envApk.length > 0
    ? envApk.replace(/\/$/, "")
    : "/downloads/tamkeen.apk";
const APK_FILENAME = "tamkeen.apk";

export const metadata: Metadata = {
  title: "تمكين — مراجعة الرياضيات للشهادة المتوسطة",
  description:
    "تمكين يساعدك على مراجعة الرياضيات بطريقة تفاعلية ترسخ الفهم. حمّل التطبيق.",
};

export default function HomeLandingPage() {
  return (
    <div className="flex min-h-dvh flex-col px-4 pb-8 pt-6 sm:px-6 sm:pt-8">
      <header className="flex justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/logo_white_arabic_horizontal.svg"
          alt="تمكين"
          className="h-auto max-h-14 w-auto max-w-[min(100%,280px)] object-contain"
          width={280}
          height={56}
          decoding="async"
        />
      </header>

      <div className="mt-8 flex flex-col items-center text-center sm:mt-10">
        <h1 className="max-w-xl text-xl font-bold leading-snug text-off-white sm:text-2xl md:text-3xl">
          تمكين يساعدك على مراجعة الرياضيات بطريقة تفاعلية ترسخ الفهم
        </h1>

        <a
          href={APK_HREF}
          download={APK_FILENAME}
          className="mt-6 inline-flex max-w-full flex-row items-center justify-center gap-3 rounded-[10px] bg-off-white px-4 py-3.5 text-midnight-blue shadow-sm transition hover:opacity-95 active:opacity-90"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/icons/android.svg"
            alt=""
            width={28}
            height={28}
            className="h-7 w-7 shrink-0 object-contain"
          />
          <span className="text-base font-bold sm:text-lg">
            تحميل تطبيق تمكين!
          </span>
        </a>

        <p className="mt-4 max-w-md text-sm leading-relaxed text-off-white/95 sm:text-base">
          <span className="font-bold">📍ملاحظة:</span>{" "}
          <span className="font-medium">
            عند تحميل التطبيق، اسمح بتثبيت التطبيقات من مصادر غير معروفة إذا طلب
            منك الهاتف ذلك.
          </span>
        </p>
      </div>

      <div className="flex min-h-0 flex-1 flex-col items-center justify-center py-6 sm:py-8">
        <div className="relative aspect-[4/3] w-full max-w-lg">
          <Image
            src="/assets/illustrations/tamkeene_preview_1.png"
            alt="معاينة تطبيق تمكين"
            fill
            className="object-contain object-center"
            sizes="(max-width: 768px) 100vw, 32rem"
            priority
          />
        </div>
      </div>

      <footer className="flex justify-center pt-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/icons/app_icon.svg"
          alt=""
          className="h-11 w-11 object-contain sm:h-12 sm:w-12"
          width={48}
          height={48}
          decoding="async"
        />
      </footer>
    </div>
  );
}
