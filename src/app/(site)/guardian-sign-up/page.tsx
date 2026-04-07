import type { Metadata } from "next";
import Image from "next/image";
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
      <section className="bg-midnight-blue px-4 pb-12 pt-8 text-off-white sm:px-6 sm:pb-16 sm:pt-10">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <h1 className="text-2xl font-bold leading-snug sm:text-3xl md:text-4xl">
            مراجعة تفاعلية لإبنك في مادة الرياضيات{" "}
            <span className="text-classic-blue-green">ترسخ الفهم</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base font-medium leading-relaxed text-off-white/95 sm:text-lg">
            تمارين و تبسيط المفاهيم مدعوم بشرح أساتذة بخبرة كبيرة في التعليم
          </p>

          <div className="relative mt-8 aspect-[4/3] w-full max-w-lg">
            <Image
              src="/assets/illustrations/tamkeene_preview_1.png"
              alt="معاينة تطبيق تمكين"
              fill
              className="object-contain object-center"
              sizes="(max-width: 768px) 100vw, 32rem"
              priority
            />
          </div>

          <p className="mt-10 text-xl font-bold sm:text-2xl">السعر:</p>
          <div className="mt-3 inline-flex rounded-[10px] bg-classic-blue-green px-6 py-4 text-center">
            <span className="text-2xl font-bold text-off-white sm:text-3xl">
              1500 دج
            </span>
          </div>
          <p className="mt-4 max-w-xl text-sm font-normal leading-relaxed text-off-white/95 sm:text-base">
            الدفع مرة واحدة فقط، إبنك يحصل على تمارين و دروس منظمة و تفاعلية مع
            تحديد نقاط الضعف و الدروس التي يحتاج مراجعتهم.
          </p>

          <div className="mt-6 w-full max-w-md rounded-[10px] bg-cardinal px-4 py-4 text-center sm:px-6">
            <p className="text-sm font-normal leading-relaxed text-off-white sm:text-base">
              دروس الدعم تكلف 500 - 1000 دج أو أكثر للساعة الواحدة بدون تطبيق و
              متابعة مما يؤدي لفهم المعلومة و نسيانها بعد كل الحصة.
            </p>
          </div>

          <div className="mt-10 flex w-full max-w-md flex-col gap-4">
            <a
              href="#register"
              className="block w-full rounded-[10px] bg-primary-blue py-3.5 text-center text-base font-bold text-off-white shadow-[0_4px_0_0_#F6F7F9] transition hover:opacity-95 active:translate-y-0.5 active:shadow-[0_2px_0_0_#F6F7F9]"
            >
              اشترِ المسار الآن
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full rounded-[10px] bg-midnight-blue py-3.5 text-center text-base font-bold text-off-white ring-2 ring-off-white/30 transition hover:opacity-95"
            >
              تواصل معنا مباشرة للمزيد من المعلومات
            </a>
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

          <div id="register" className="mt-16 scroll-mt-24">
            <h2 className="text-center text-2xl font-bold text-midnight-blue sm:text-3xl">
              سجّل ابنك وابدأ التعلّم بثقة
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-center text-base text-grey">
              خطوة بسيطة لتبدأ رحلة تعلّم أفضل لابنك
            </p>
            <div className="mt-8">
              <GuardianRegistrationForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
