import Image from "next/image";
import BemFollowUpFAQ from "@/components/bem-follow-up/BemFollowUpFAQ";
import BemFollowUpForm from "@/components/bem-follow-up/BemFollowUpForm";

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.mohamed_s.Tamkeene";

const REPORT_PARTS = [
  {
    label: "ماذا راجع",
    text: "محور الأعداد والقواسم: تعريف القاسم، والقاسم المشترك الأكبر.",
    accent: "border-light-grey bg-off-white",
  },
  {
    label: "ما أتقنه",
    text: "تحديد الأعداد الأولية، وفهم القواسم المشتركة.",
    accent: "border-classic-blue-green bg-classic-blue-green/10",
  },
  {
    label: "ما يحتاج إلى مزيد من التدريب",
    text: "التمييز بين القاسم المشترك الأكبر والعدد الأولي.",
    accent: "border-warm-amber bg-warm-amber/15",
  },
  {
    label: "كيف يمكنك المساعدة؟",
    text: "ما تحتاجيش تديري حاجة زيادة. خليّه يكمّل المراجعة في تطبيق تفكيرة.",
    accent: "border-primary-blue bg-primary-blue/10",
  },
] as const;

const REPORTS = [
  {
    when: "بعد 48 ساعة",
    body: "لقطة أولية على النشاط اللي داره. إذا كمل الاختبار فقط، ما نقدّموش تقييم كامل.",
  },
  {
    when: "بعد أسبوع",
    body: "المهارات اللي تمرّن عليها، وواش مازال يحتاج يتمرّن عليه.",
  },
  {
    when: "بعد أسبوعين",
    body: "ملخّص الفترة، والخطوة اللي تقدري تعاونيه فيها.",
  },
] as const;

const QUOTES = [
  "شكرا استاذ ربي يجازيك و يفتحل كل طرق الخير خليتني نحب الرياضيات. وعد مني نقول لصحباتي على التطبيق لينتشر 💞",
  "تطبيق رااااائع صراحة تطبيق يحفز و يعطيك طاقة إيجابية في البداية قبل البدأ في الدروس بارك الله فيكم",
  "استاذ اقسم لك بالله افضل تطبيق يعلمك جربوه و ردولي الخبر و الله لاغاية 🎉🎉",
] as const;

const ctaClassName =
  "inline-flex w-full justify-center rounded-[10px] bg-primary-blue px-6 py-3.5 text-center text-base font-bold text-off-white shadow-sm transition hover:opacity-95 lg:w-auto";

function StepCard({
  index,
  title,
  children,
  image,
  imageAlt,
  width,
  height,
}: {
  index: number;
  title: string;
  children: React.ReactNode;
  image: string;
  imageAlt: string;
  width: number;
  height: number;
}) {
  return (
    <li className="grid items-center gap-4 rounded-2xl bg-off-white p-4 lg:grid-cols-[minmax(0,1fr)_280px]">
      <div>
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-classic-blue-green text-sm font-bold text-off-white">
            {index}
          </span>
          <h3 className="font-bold text-midnight-blue">{title}</h3>
        </div>
        <div className="mt-2 text-sm leading-relaxed text-primary-text">
          {children}
        </div>
      </div>
      <Image
        src={image}
        alt={imageAlt}
        width={width}
        height={height}
        sizes="(min-width: 1024px) 280px, 100vw"
        className="mx-auto h-auto w-full max-w-sm rounded-2xl lg:max-w-none"
      />
    </li>
  );
}

export default function BemFollowUpPageContent() {
  return (
    <>
      <section className="bg-off-white px-4 pb-10 pt-8 sm:px-6 sm:pt-14">
        <div className="mx-auto grid max-w-6xl items-center gap-6 lg:grid-cols-2 lg:gap-12">
          <div>
            <p className="inline-flex rounded-full bg-classic-blue-green/15 px-3 py-1 text-sm font-bold text-classic-blue-green">
              متابعة مجانية · أسبوعين · 3 تقارير على واتساب
            </p>
            <h1 className="mt-4 text-3xl font-bold leading-snug text-midnight-blue sm:text-4xl">
              تابعي تقدّم إبنك في الرياضيات، بلا ضغط
            </h1>
            <p className="mt-3 text-base leading-relaxed text-grey sm:text-lg">
              تعرّفي واش راهو يراجع، واش مازال يحتاج يتمرّن عليه، وكيفاش تقدري
              تعاونيه في البيام.
            </p>
            <div className="mt-5">
              <a href="#steps" className={ctaClassName}>
                ابدئي المتابعة المجانية
              </a>
              <p className="mt-3 text-sm font-medium text-midnight-blue">
                3 تقارير خلال أسبوعين، توصلك عبر واتساب حسب نشاط إبنك في تفكيرة.
              </p>
            </div>
          </div>
          <Image
            src="/assets/illustrations/mother-son-BEM.jpg"
            alt="أم تجلس بجانب ابنها وتتابع معه تقرير تقدّمه في الرياضيات"
            width={6144}
            height={4096}
            priority
            sizes="(min-width: 1024px) 560px, 100vw"
            className="h-auto w-full rounded-3xl"
          />
        </div>
      </section>

      <section className="bg-white px-4 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold text-midnight-blue sm:text-center sm:text-3xl">
            هكذا يجيك التقرير
          </h2>
          <p className="mt-2 max-w-2xl text-base leading-relaxed text-grey sm:mx-auto sm:text-center">
            مثال توضيحي. التقرير الحقيقي يوصلك على واتساب، والتفاصيل تجي من
            نشاط إبنك في التطبيق.
          </p>
          <div className="mt-6 grid items-center gap-5 lg:grid-cols-2 lg:gap-10">
            <Image
              src="/assets/illustrations/mother-daughter-BEM.png"
              alt="أم تراجع الرياضيات مع ابنتها وبجانبهما تقرير التقدّم"
              width={5996}
              height={3404}
              sizes="(min-width: 1024px) 520px, 100vw"
              className="h-auto w-full lg:order-2"
            />
            <article className="rounded-3xl border border-light-grey bg-off-white p-4 shadow-sm lg:order-1 sm:p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-bold text-midnight-blue">
                    تقرير التقدّم
                  </p>
                  <p className="mt-1 text-xs text-grey">
                    رياضيات · الرابعة متوسط
                  </p>
                </div>
                <span className="rounded-full bg-warm-amber/25 px-2.5 py-1 text-xs font-bold text-midnight-blue">
                  مثال
                </span>
              </div>
              <ul className="mt-4 space-y-2">
                {REPORT_PARTS.map((part) => (
                  <li
                    key={part.label}
                    className={`rounded-2xl border-s-4 px-3 py-2.5 ${part.accent}`}
                  >
                    <p className="text-sm font-bold text-midnight-blue">
                      {part.label}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-primary-text">
                      {part.text}
                    </p>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-off-white px-4 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold text-midnight-blue sm:text-center sm:text-3xl">
            3 تقارير في أسبوعين
          </h2>
          <ol className="mt-5 grid gap-3 lg:grid-cols-3">
            {REPORTS.map((report) => (
              <li
                key={report.when}
                className="rounded-2xl border border-light-grey border-s-4 border-s-warm-amber bg-white p-4"
              >
                <h3 className="text-lg font-bold text-midnight-blue">
                  {report.when}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-grey">
                  {report.body}
                </p>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-sm leading-relaxed text-grey sm:text-center">
            إذا كان النشاط قليل، التقرير يبقى نظرة أولية. ما نقدّموش استنتاجات
            ما عندناش عليها دليل.
          </p>
        </div>
      </section>

      <section
        id="steps"
        className="scroll-mt-28 bg-white px-4 py-10 sm:px-6 sm:py-14"
      >
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-midnight-blue sm:text-center sm:text-3xl">
            كيفاش تشاركي؟
          </h2>
          <ol className="mt-5 space-y-4">
            <StepCard
              index={1}
              title="حمّلي تفكيرة"
              image="/assets/illustrations/tafkira_play_store.jpg"
              imageAlt="تطبيق Tafkira في متجر بلاي ستور"
              width={1080}
              height={1132}
            >
              <p>حمّلي تطبيق تفكيرة من بلاي ستور.</p>
              <p className="mt-1">في بلاي ستور، اسم التطبيق:</p>
              <p className="text-end font-semibold" dir="ltr">
                Tafkira
              </p>
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex"
              >
                <Image
                  src="/assets/icons/google-play-badge-ar.png"
                  alt="احصل عليه من Google Play"
                  width={646}
                  height={250}
                  className="h-16 w-auto"
                />
              </a>
            </StepCard>
            <StepCard
              index={2}
              title="اختبار المستوى"
              image="/assets/illustrations/step_two.png"
              imageAlt="اختبار المكتسبات القبلية داخل تطبيق تفكيرة"
              width={1200}
              height={630}
            >
              <p>
                خليه يكمل اختبار المكتسبات القبلية باش نفهموا من وين يبدأ.
              </p>
            </StepCard>
            <StepCard
              index={3}
              title="معرّف المستخدم تاع إبنك"
              image="/assets/illustrations/step_three.png"
              imageAlt="مكان معرّف المستخدم داخل إعدادات تفكيرة"
              width={1200}
              height={630}
            >
              <p>
                من الإعدادات، انسخي معرّف المستخدم تاع إبنك وحطّيه في النموذج
                اللي تحت.
              </p>
            </StepCard>
          </ol>
        </div>
      </section>

      <section
        id="register"
        className="scroll-mt-28 bg-off-white px-4 py-10 sm:px-6 sm:py-14"
      >
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-midnight-blue sm:text-center sm:text-3xl">
            كمّلي التسجيل باش نبدأوا المتابعة
          </h2>
          <p className="mt-2 text-base leading-relaxed text-grey sm:text-center">
            باش نربطو المعلومات بمتابعة إبنك، عمّري المعلومات التالية.
          </p>
          <div className="mt-6 rounded-2xl border border-light-grey bg-white p-4 sm:p-6">
            <BemFollowUpForm />
          </div>
        </div>
      </section>

      <section className="bg-white px-4 pb-10 sm:px-6 sm:pb-14">
        <div className="mx-auto max-w-3xl">
          <ol>
            <StepCard
              index={4}
              title="مراجعة بانتظام"
              image="/assets/illustrations/step_four.png"
              imageAlt="إبنك يراجع الرياضيات داخل تطبيق تفكيرة"
              width={1200}
              height={630}
            >
              <p>
                خلال الأسبوعين، خلي إبنك يراجع في تفكيرة. كل ما زاد النشاط،
                وضّح التقرير.
              </p>
            </StepCard>
          </ol>
        </div>
      </section>

      <section className="bg-off-white px-4 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-2xl font-bold text-midnight-blue sm:text-3xl">
            رأي التلاميذ في تطبيق تفكيرة
          </h2>
          <div className="mt-2 flex items-end justify-center gap-1">
            <Image
              src="/assets/illustrations/Cheerful Boy Looking Upward.png"
              alt=""
              width={1368}
              height={1150}
              sizes="120px"
              className="h-24 w-auto object-contain sm:h-32"
            />
            <Image
              src="/assets/illustrations/Cheerful Girl in Pink Hoodie.png"
              alt=""
              width={1368}
              height={1150}
              sizes="120px"
              className="h-24 w-auto object-contain sm:h-32"
            />
          </div>
          <ul className="mt-5 grid gap-3 lg:grid-cols-3">
            {QUOTES.map((quote) => (
              <li
                key={quote}
                className="rounded-2xl border border-light-grey bg-white p-4 text-base font-medium leading-relaxed text-midnight-blue"
              >
                {quote}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white px-4 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-3xl">
          <BemFollowUpFAQ />
        </div>
      </section>

      <section className="bg-midnight-blue px-4 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold leading-snug text-off-white sm:text-3xl">
            خطوة صغيرة اليوم تساعدك تفهمي تقدّم إبنك أكثر
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-off-white/90">
            ابدئي المتابعة المجانية لأسبوعين، وخلي تفكيرة تقولك واش راه يتعلّم
            وواش يحتاج يراجع.
          </p>
          <a
            href="#register"
            className="mt-6 inline-flex w-full justify-center rounded-[10px] bg-off-white px-6 py-3.5 text-center text-base font-bold text-midnight-blue transition hover:opacity-95 sm:w-auto"
          >
            ابدئي المتابعة المجانية
          </a>
        </div>
      </section>
    </>
  );
}
