"use client";

import { useState } from "react";

const ITEMS = [
  {
    id: "free",
    question: "هل المتابعة مجانية؟",
    answer:
      "نعم، المشاركة في هذه الفترة التجريبية مجانية وتشمل ثلاثة تقارير خلال أسبوعين.",
  },
  {
    id: "must-use",
    question: "هل لازم إبني يستعمل تفكيرة خلال الأسبوعين؟",
    answer:
      "نعم، لأن التقارير تعتمد على الأنشطة والتمارين اللي ينجزها داخل التطبيق. إذا كان النشاط قليلاً، ممكن ما تكونش المعلومات كافية لتقديم ملاحظات مفصّلة.",
  },
  {
    id: "all-lessons",
    question: "هل لازم يكمل جميع الدروس؟",
    answer:
      "لا، المهم أنه يستعمل التطبيق ويتدرّب حسب وتيرته. ما نحبّوش نزيدوا عليه الضغط، بل نساعدوه يراجع ويتقدّم تدريجياً.",
  },
  {
    id: "no-use",
    question: "واش يصرا إذا ما استعملش التطبيق؟",
    answer:
      "إذا ما كانتش عندنا بيانات كافية، راح تكون قدرتنا على تقييم التقدّم محدودة. ما نقدّموش استنتاجات ما تدعمهاش النتائج المتوفرة.",
  },
  {
    id: "delivery",
    question: "كيفاش نستقبل التقارير؟",
    answer: "راح نرسلوها إلى رقم واتساب اللي تقدّميه عند التسجيل.",
  },
] as const;

export default function BemFollowUpFAQ() {
  const [openId, setOpenId] = useState<string | null>(ITEMS[0].id);

  return (
    <section className="w-full" aria-labelledby="bem-faq-heading">
      <h2
        id="bem-faq-heading"
        className="mb-6 text-center text-2xl font-bold text-midnight-blue sm:text-3xl"
      >
        الأسئلة الشائعة
      </h2>
      <div className="mx-auto flex max-w-2xl flex-col gap-2">
        {ITEMS.map(({ id, question, answer }) => {
          const open = openId === id;
          return (
            <div
              key={id}
              className="overflow-hidden rounded-[10px] border border-light-grey bg-white shadow-sm"
            >
              <button
                type="button"
                className="flex w-full items-center justify-between gap-3 px-4 py-4 text-start text-base font-semibold text-primary-text transition hover:bg-off-white"
                aria-expanded={open}
                aria-controls={`bem-faq-panel-${id}`}
                id={`bem-faq-trigger-${id}`}
                onClick={() => setOpenId((cur) => (cur === id ? null : id))}
              >
                <span>{question}</span>
                <span
                  className="shrink-0 text-midnight-blue transition-transform"
                  style={{ transform: open ? "rotate(180deg)" : undefined }}
                  aria-hidden
                >
                  ▼
                </span>
              </button>
              {open ? (
                <div
                  id={`bem-faq-panel-${id}`}
                  role="region"
                  aria-labelledby={`bem-faq-trigger-${id}`}
                  className="border-t border-light-grey px-4 py-3 text-sm font-medium leading-relaxed text-grey"
                >
                  {answer}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
