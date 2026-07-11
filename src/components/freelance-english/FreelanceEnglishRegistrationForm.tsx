"use client";

import { sendGAEvent } from "@next/third-parties/google";
import { FormEvent, useState } from "react";
import {
  formatPrice,
  type SessionDuration,
} from "@/lib/freelance-english-params";

type SubmitState = "idle" | "loading" | "success" | "error";

const PAGE_PATH = "/ielts-preparation";

type FreelanceEnglishRegistrationFormProps = {
  userId: string;
  contentId: string;
  teacherName: string;
  sessionTitle: string;
  duration: SessionDuration;
  onDurationChange: (duration: SessionDuration) => void;
  pricePerSession: number | null;
};

function trackSubmitClick() {
  sendGAEvent("event", "guardian_registration_submit_click", {
    page_path: PAGE_PATH,
  });
}

function trackSubmitSuccess() {
  sendGAEvent("event", "guardian_registration_submit_success", {
    page_path: PAGE_PATH,
  });
}

function trackSubmitFailure(errorMessage?: string) {
  sendGAEvent("event", "guardian_registration_submit_failure", {
    page_path: PAGE_PATH,
    ...(errorMessage ? { error_message: errorMessage } : {}),
  });
}

export default function FreelanceEnglishRegistrationForm({
  userId,
  contentId,
  teacherName,
  sessionTitle,
  duration,
  onDurationChange,
  pricePerSession,
}: FreelanceEnglishRegistrationFormProps) {
  const [state, setState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;

    setState("loading");
    setErrorMessage(null);

    const formData = new FormData(form);
    const sessionCount = Number(formData.get("session_count") || 0);

    const payload = {
      name: String(formData.get("name") || ""),
      phone: String(formData.get("phone") || ""),
      email: String(formData.get("email") || ""),
      course: "ielts-preparation",
      session_count: sessionCount,
      duration_minutes: duration,
      session_title: sessionTitle,
      ...(teacherName ? { teacher_name: teacherName } : {}),
      ...(userId ? { user_id: userId } : {}),
      ...(contentId ? { content_id: contentId } : {}),
      ...(pricePerSession !== null
        ? {
            price_per_session: pricePerSession,
            total_price: pricePerSession * sessionCount,
          }
        : {}),
    };

    try {
      const res = await fetch("/api/guardian-registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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
          شكرا! لقد تم التسجيل بنجاح ، سيتم التواصل معك عبر الواتساب أو رقم
          الهاتف في أقرب وقت.
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
        <label htmlFor="freelance-name" className="sr-only">
          الإسم
        </label>
        <input
          id="freelance-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder="الإسم"
          className="w-full rounded-[10px] border border-light-grey bg-white px-4 py-3 text-base text-primary-text placeholder:text-cool-grey focus:border-primary-blue focus:outline-none focus:ring-2 focus:ring-primary-blue/20"
        />
      </div>
      <div>
        <label htmlFor="freelance-phone" className="sr-only">
          رقم الهاتف
        </label>
        <input
          id="freelance-phone"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          placeholder="رقم الهاتف"
          className="w-full rounded-[10px] border border-light-grey bg-white px-4 py-3 text-base text-primary-text placeholder:text-cool-grey focus:border-primary-blue focus:outline-none focus:ring-2 focus:ring-primary-blue/20"
        />
      </div>
      <div>
        <label htmlFor="freelance-email" className="sr-only">
          البريد الإلكتروني
        </label>
        <input
          id="freelance-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="البريد الإلكتروني"
          className="w-full rounded-[10px] border border-light-grey bg-white px-4 py-3 text-base text-primary-text placeholder:text-cool-grey focus:border-primary-blue focus:outline-none focus:ring-2 focus:ring-primary-blue/20"
        />
      </div>

      <div>
        <label
          htmlFor="freelance-session-count"
          className="mb-2 block text-sm font-semibold text-midnight-blue"
        >
          عدد الحصص
        </label>
        <input
          id="freelance-session-count"
          name="session_count"
          type="number"
          min={1}
          step={1}
          required
          defaultValue={1}
          placeholder="عدد الحصص"
          className="w-full rounded-[10px] border border-light-grey bg-white px-4 py-3 text-base text-primary-text placeholder:text-cool-grey focus:border-primary-blue focus:outline-none focus:ring-2 focus:ring-primary-blue/20"
        />
      </div>

      <fieldset>
        <legend className="mb-2 block text-sm font-semibold text-midnight-blue">
          مدة الحصة
        </legend>
        <div className="grid grid-cols-2 gap-3">
          <label
            className={`flex cursor-pointer items-center justify-center rounded-[10px] border px-4 py-3 text-sm font-semibold transition ${
              duration === 30
                ? "border-primary-blue bg-primary-blue/10 text-primary-blue"
                : "border-light-grey bg-white text-primary-text"
            }`}
          >
            <input
              type="radio"
              name="duration_minutes"
              value="30"
              checked={duration === 30}
              onChange={() => onDurationChange(30)}
              className="sr-only"
            />
            30 دقيقة
          </label>
          <label
            className={`flex cursor-pointer items-center justify-center rounded-[10px] border px-4 py-3 text-sm font-semibold transition ${
              duration === 60
                ? "border-primary-blue bg-primary-blue/10 text-primary-blue"
                : "border-light-grey bg-white text-primary-text"
            }`}
          >
            <input
              type="radio"
              name="duration_minutes"
              value="60"
              checked={duration === 60}
              onChange={() => onDurationChange(60)}
              className="sr-only"
            />
            60 دقيقة
          </label>
        </div>
        {pricePerSession !== null ? (
          <p className="mt-2 text-center text-sm text-grey">
            سعر الحصة: {formatPrice(pricePerSession)}
          </p>
        ) : null}
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
        {state === "loading" ? "جاري الإرسال..." : "التسجيل"}
      </button>
    </form>
  );
}
