import type { Metadata } from "next";
import { Suspense } from "react";
import AmaSessionPageContent from "@/components/ama-session/AmaSessionPageContent";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "تفكيرة — جلسة Ask Me Anything",
  description:
    "سجّل مجاناً في جلسة Ask Me Anything عن IELTS مع أستاذة متخصصة.",
};

const whatsappUrl = getWhatsAppUrl();

export default function AmaSessionPage() {
  return (
    <>
      <section className="bg-off-white px-4 pb-8 pt-12 sm:px-6 sm:pt-16">
        <div className="mx-auto max-w-3xl">
          <Suspense
            fallback={
              <p className="text-center text-base text-grey sm:text-lg">
                جاري تحميل الجلسة...
              </p>
            }
          >
            <AmaSessionPageContent />
          </Suspense>
        </div>
      </section>

      <section className="bg-off-white px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <p className="mx-auto max-w-xl text-center text-base font-medium text-midnight-blue sm:text-lg">
            في حال وجود أي استفسار، فريق تفكيرة جاهز لمساعدتكم.
          </p>
          <div className="mt-6 flex justify-center">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full max-w-md justify-center rounded-[10px] bg-midnight-blue px-6 py-3.5 text-center text-base font-bold text-off-white transition hover:opacity-95"
            >
              تواصل معنا
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
