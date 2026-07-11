import type { Metadata } from "next";
import { Suspense } from "react";
import FreelanceEnglishPageContent from "@/components/freelance-english/FreelanceEnglishPageContent";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "تفكيرة — احجز حصتك",
  description:
    "احجز حصة فردية مع أستاذ للتدرب على التحدث والتحضير للآيلتس.",
};

const whatsappUrl = getWhatsAppUrl();

export default function IeltsPreparationPage() {
  return (
    <>
      <section className="bg-off-white px-4 pb-8 pt-12 sm:px-6 sm:pt-16">
        <div className="mx-auto max-w-3xl">
          <Suspense fallback={null}>
            <FreelanceEnglishPageContent />
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
