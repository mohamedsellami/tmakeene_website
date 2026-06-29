import type { Metadata } from "next";
import FreelanceEnglishHero from "@/components/freelance-english/FreelanceEnglishHero";
import FreelanceEnglishRegistrationForm from "@/components/freelance-english/FreelanceEnglishRegistrationForm";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "تفكيرة — Handle Your English-Speaking Clients Confidently",
  description:
    "مسار إنجليزي للفريلancers: 8 حصص مباشرة، تطبيق للتدرب، وخبرة أستاذ في الفريلانس. احجز مكانك الآن.",
};

const whatsappUrl = getWhatsAppUrl();

export default function FreelanceEnglishPage() {
  return (
    <>
      <section className="bg-off-white px-4 pb-8 pt-12 sm:px-6 sm:pt-16">
        <div className="mx-auto max-w-3xl">
          <FreelanceEnglishHero />

          <div id="register" className="scroll-mt-24">
            <h2 className="text-center text-2xl font-bold text-midnight-blue sm:text-3xl">
              احجز مكانك الآن!
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-base text-grey sm:text-lg">
              لاتفوت الفرصة، الأماكن محدودة.
            </p>
            <div className="mt-8">
              <FreelanceEnglishRegistrationForm />
            </div>
          </div>
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
