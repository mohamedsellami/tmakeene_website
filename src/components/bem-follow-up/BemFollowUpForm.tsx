"use client";

import { sendGAEvent } from "@next/third-parties/google";
import Link from "next/link";
import { FormEvent, useState } from "react";

type SubmitState = "idle" | "loading" | "success" | "error";

const PAGE_PATH = "/bem-follow-up";

function trackSubmitClick() {
  sendGAEvent("event", "bem_follow_up_submit_click", {
    page_path: PAGE_PATH,
  });
}

function trackSubmitSuccess() {
  sendGAEvent("event", "bem_follow_up_submit_success", {
    page_path: PAGE_PATH,
  });
}

function trackSubmitFailure(errorMessage?: string) {
  sendGAEvent("event", "bem_follow_up_submit_failure", {
    page_path: PAGE_PATH,
    ...(errorMessage ? { error_message: errorMessage } : {}),
  });
}

export default function BemFollowUpForm() {
  const [accepted, setAccepted] = useState(false);
  const [state, setState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;

    if (!accepted) {
      const message =
        "الموافقة على استخدام بيانات التقدّم مطلوبة لإكمال التسجيل.";
      setState("error");
      setErrorMessage(message);
      return;
    }

    const formData = new FormData(form);
    const motherName = String(formData.get("motherName") || "").trim();
    const childId = String(formData.get("childId") || "").trim();
    const phone = String(formData.get("phone") || "")
      .trim()
      .replace(/[\s-]/g, "");

    if (motherName.length < 2 || motherName.length > 80) {
      const message = "أدخلي اسم الأم.";
      setState("error");
      setErrorMessage(message);
      return;
    }

    if (childId.length < 3 || childId.length > 80 || /\s/.test(childId)) {
      const message = "تأكدي من معرّف المستخدم تاع إبنك كما يظهر في التطبيق.";
      setState("error");
      setErrorMessage(message);
      return;
    }

    if (!/^\+?[0-9]{8,15}$/.test(phone)) {
      const message = "أدخلي رقم واتساب صالحاً مع مفتاح الدولة.";
      setState("error");
      setErrorMessage(message);
      return;
    }

    setState("loading");
    setErrorMessage(null);

    try {
      const res = await fetch("/api/bem-follow-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ motherName, childId, phone, consent: true }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(data?.error || "فشل إرسال التسجيل.");
      }

      trackSubmitSuccess();
      setState("success");
      form.reset();
      setAccepted(false);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "تعذر إرسال التسجيل حالياً. حاول مرة أخرى.";
      trackSubmitFailure(message);
      setState("error");
      setErrorMessage(message);
    }
  }

  if (state === "success") {
    return (
      <div
        className="rounded-[10px] border border-classic-blue-green/40 bg-classic-blue-green/10 px-4 py-6 text-center sm:px-6"
        role="status"
        aria-live="polite"
      >
        <p className="text-base font-medium leading-relaxed text-midnight-blue sm:text-lg">
          شكراً على ثقتك في تفكيرة! راح نراجعوا معلومات التسجيل، وإذا احتجنا أي
          توضيح نتواصلوا معاك عبر واتساب. ابدئي بمساعدة إبنك على إكمال الاختبار
          ومراجعة الرياضيات داخل التطبيق.
        </p>
      </div>
    );
  }

  return (
    <form
      className="mx-auto flex w-full max-w-lg flex-col gap-4"
      onSubmit={handleSubmit}
      noValidate
    >
      <div>
        <label
          htmlFor="bem-mother-name"
          className="mb-1 block text-sm font-semibold text-midnight-blue"
        >
          اسم الأم
        </label>
        <p className="mb-1.5 text-xs leading-relaxed text-grey">
          باش نعرفو مع من نتواصلوا.
        </p>
        <input
          id="bem-mother-name"
          name="motherName"
          type="text"
          required
          autoComplete="name"
          placeholder="الاسم"
          className="w-full rounded-[10px] border border-light-grey bg-white px-4 py-3 text-base text-primary-text placeholder:text-cool-grey focus:border-primary-blue focus:outline-none focus:ring-2 focus:ring-primary-blue/20"
        />
      </div>
      <div>
        <label
          htmlFor="bem-child-id"
          className="mb-1 block text-sm font-semibold text-midnight-blue"
        >
          معرّف المستخدم تاع إبنك
        </label>
        <p className="mb-1.5 text-xs leading-relaxed text-grey">
          باش نربطو التقرير بإبنك في التطبيق.
        </p>
        <input
          id="bem-child-id"
          name="childId"
          type="text"
          required
          dir="auto"
          autoComplete="off"
          placeholder="أدخلي المعرّف كما يظهر في التطبيق"
          className="w-full rounded-[10px] border border-light-grey bg-white px-4 py-3 text-base text-primary-text placeholder:text-cool-grey focus:border-primary-blue focus:outline-none focus:ring-2 focus:ring-primary-blue/20"
        />
      </div>
      <div>
        <label
          htmlFor="bem-whatsapp"
          className="mb-1 block text-sm font-semibold text-midnight-blue"
        >
          رقم واتساب لاستقبال التقارير
        </label>
        <p className="mb-1.5 text-xs leading-relaxed text-grey">
          باش نرسلولك التقارير.
        </p>
        <input
          id="bem-whatsapp"
          name="phone"
          type="tel"
          required
          inputMode="tel"
          dir="ltr"
          autoComplete="tel"
          placeholder="+213XXXXXXXXX"
          className="w-full rounded-[10px] border border-light-grey bg-white px-4 py-3 text-left text-base text-primary-text placeholder:text-cool-grey focus:border-primary-blue focus:outline-none focus:ring-2 focus:ring-primary-blue/20"
        />
      </div>
      <fieldset className="space-y-2">
        <legend className="text-sm font-semibold text-midnight-blue">
          الموافقة على متابعة تقدّم طفلي
        </legend>
        <label className="flex cursor-pointer items-start gap-3 text-sm text-primary-text">
          <input
            type="checkbox"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
            className="mt-1 h-4 w-4 shrink-0 rounded border-light-grey text-primary-blue focus:ring-primary-blue"
          />
          <span className="leading-relaxed">
            أوافق على استخدام معرّف طفلي وبيانات أنشطته ونتائج تمارينه في تفكيرة
            لإعداد تقارير عن تقدّمه التعليمي وإرسالها إلى رقم واتساب الذي قدّمته.
            أفهم أن فريق تفكيرة سيطّلع على هذه البيانات لإعداد التقارير، ويمكنني
            سحب موافقتي أو طلب حذف البيانات عبر وسائل التواصل الموضّحة في{" "}
            <Link
              href="/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary-blue underline-offset-2 hover:underline"
            >
              سياسة الخصوصية
            </Link>
            .
          </span>
        </label>
        <p className="text-xs leading-relaxed text-grey">
          المتابعة مجانية واختيارية. نحتفظ ببيانات الربط الخاصة بالمتابعة لمدة لا
          تتجاوز 30 يومًا بعد انتهائها، وفقًا لـ{" "}
          <Link
            href="/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-primary-blue underline-offset-2 hover:underline"
          >
            سياسة الخصوصية
          </Link>
          .
        </p>
      </fieldset>

      {state === "error" && errorMessage ? (
        <p
          className="rounded-[10px] border border-cardinal/30 bg-cardinal/10 px-3 py-2 text-sm font-medium text-cardinal"
          role="alert"
        >
          {errorMessage}
        </p>
      ) : null}

      <button
        type="submit"
        onClick={trackSubmitClick}
        disabled={state === "loading"}
        className="w-full rounded-[10px] bg-primary-blue py-3.5 text-base font-bold text-off-white shadow-sm transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {state === "loading"
          ? "جاري الإرسال..."
          : "تأكيد التسجيل في المتابعة المجانية"}
      </button>
    </form>
  );
}
