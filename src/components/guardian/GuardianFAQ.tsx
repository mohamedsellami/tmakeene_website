"use client";

import { useState, type ReactNode } from "react";

type FaqItem = {
  id: string;
  question: string;
  answer: ReactNode;
};

const ITEMS: FaqItem[] = [
  {
    id: "1",
    question: "هل الدفع شهري؟",
    answer: "لا. الدفع لمرة واحدة فقط لكل مسار تعلّم، بدون اشتراك شهري.",
  },
  {
    id: "2",
    question: "هل يجب شراء كل مسار تعلّم بشكل منفصل؟",
    answer:
      "نعم. كل مسار تعلّم يُشترى بشكل مستقل، ويمكنكم اختيار المسار المناسب حسب المادة أو الأستاذ.",
  },
  {
    id: "3",
    question: "ما هو مسار التعلّم؟",
    answer: (
      <>
        <p className="mb-2">
          مسار التعلّم هو برنامج دراسي منظّم، يقدّمه أستاذ في مادة معيّنة، ويشمل:
        </p>
        <ul className="list-disc space-y-1 pe-5 text-start">
          <li>دروس مبسّطة خطوة بخطوة</li>
          <li>تمارين تفاعلية</li>
          <li>شروحات فيديو</li>
          <li>متابعة تقدّم التلميذ</li>
        </ul>
        <p className="mt-2">
          كل مسار يساعد الطفل على التعلّم بشكل واضح ومنهجي في موضوع محدّد.
        </p>
      </>
    ),
  },
  {
    id: "4",
    question: "كيف يتم الدفع؟",
    answer: (
      <>
        حاليًا يتم الدفع عبر:
        <br />
        CCP
        <br />
        بريدي موب (BaridiMob)
        <br />
        بعد الدفع، تحصلون على رمز دخول يُستخدم داخل التطبيق.
      </>
    ),
  },
  {
    id: "5",
    question: "هل توجد حصص مباشرة (Live)؟",
    answer:
      "لا، حاليًا لا توجد حصص مباشرة. التعلّم يتم عبر مسارات منظّمة، دروس تفاعلية، وشرح فيديو يمكن للطفل مشاهدته في أي وقت.",
  },
];

export default function GuardianFAQ() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section className="w-full" aria-labelledby="faq-heading">
      <h2
        id="faq-heading"
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
                aria-controls={`faq-panel-${id}`}
                id={`faq-trigger-${id}`}
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
                  id={`faq-panel-${id}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${id}`}
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
