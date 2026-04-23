import type { Metadata } from "next";
import GuardianFAQ from "@/components/guardian/GuardianFAQ";
import GuardianRegistrationForm from "@/components/guardian/GuardianRegistrationForm";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "تمكين — مسار الرياضيات لولي الأمر",
  description:
    "مراجعة تفاعلية في الرياضيات لابنك، تمارين ودروس منظمة. اشترِ المسار أو تواصل معنا.",
};

const whatsappUrl = getWhatsAppUrl();

export default function GuardianSignUpPage() {
  return (
    <>
      <section className="bg-off-white px-4 pb-8 pt-12 sm:px-6 sm:pt-16">
        <div className="mx-auto max-w-3xl">
          <div className="mx-auto mb-8 w-full max-w-sm overflow-hidden rounded-2xl bg-black shadow-sm sm:mb-10">
            <div className="aspect-[9/16] w-full">
              <video
                className="h-full w-full object-cover"
                src="/assets/videos/guardian-signup-intro.mp4"
                autoPlay
                muted
                loop
                playsInline
                controls
                preload="metadata"
              >
                متصفحك لا يدعم تشغيل الفيديو.
              </video>
            </div>
          </div>
          <div id="register" className="scroll-mt-24">
            <h2 className="text-center text-2xl font-bold text-midnight-blue sm:text-3xl">
              إختبار سريع لتحديد نقاط الضعف
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-base text-grey sm:text-lg">
              سجّل ابنك لإجراء اختبار سريع مجاني يحدد نقاط ضعفه في الجذور
              التربيعية والمعادلات، واحصل على الدروس التي يجب أن يركز عليها
              أكثر.
            </p>
            <div className="mt-8">
              <GuardianRegistrationForm />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-off-white px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <GuardianFAQ />

          <p className="mx-auto mt-10 max-w-xl text-center text-base font-medium text-midnight-blue sm:text-lg">
            في حال وجود أي استفسار، فريق تمكين جاهز لمساعدتكم.
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
