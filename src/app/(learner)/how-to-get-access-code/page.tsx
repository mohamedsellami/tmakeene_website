import type { Metadata } from "next";
import Link from "next/link";
import SharePurchaseLinkButton from "@/components/how-to-get-access-code/SharePurchaseLinkButton";

export const metadata: Metadata = {
  title: "كيف تحصل على رمز الوصول؟ | تمكين",
  description:
    "شرح بسيط لكيفية الحصول على رمز الوصول عبر مشاركة رابط التسجيل مع ولي الأمر.",
};

export default function HowToGetAccessCodePage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-8 sm:px-6">
        <div className="flex w-full max-w-lg flex-col items-center text-center">
          <h1 className="text-2xl font-bold leading-tight text-midnight-blue sm:text-3xl md:text-4xl">
            كيف تحصل على رمز الوصول؟
          </h1>
          <p className="mt-4 text-base font-medium text-primary-text sm:text-lg">
            لإكمال التعلم، تحتاج إلى رمز الوصول 👇
          </p>
          <p className="mt-6 text-base leading-relaxed text-primary-text sm:text-lg">
            لمواصلة التعلم في تطبيق تمكين، سنقوم بإرسال رمز الوصول إلى ولي
            أمرك.{" "}
            <span className="font-bold">شارك رابط التسجيل</span> مع ولي أمرك و
            سنهتم بالباقي.
          </p>
          <div className="mt-8 w-full sm:mt-10">
            <SharePurchaseLinkButton />
          </div>
        </div>
      </div>
      <footer className="flex justify-center pb-8 pt-4">
        <Link
          href="/"
          className="inline-block transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-midnight-blue"
          aria-label="الصفحة الرئيسية — تمكين"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/logo_blue_arabic_horizontal.svg"
            alt="تمكين"
            className="h-auto max-h-14 w-auto max-w-[min(100%,320px)] object-contain object-center"
            width={320}
            height={64}
            decoding="async"
            fetchPriority="high"
          />
        </Link>
      </footer>
    </div>
  );
}
