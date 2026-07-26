"use client";

import { sendGAEvent } from "@next/third-parties/google";
import { FormEvent, useState } from "react";

type SubmitState = "idle" | "loading" | "success" | "error";

const PAGE_PATH = "/ama-session";

type AmaSessionSignupFormProps = {
  userId: string;
  tutorId: string;
  amaSessionId: string;
  registrationOpen: boolean;
  closedMessage?: string;
};

function trackSubmitClick() {
  sendGAEvent("event", "ama_session_signup_click", {
    page_path: PAGE_PATH,
  });
}

function trackSubmitSuccess() {
  sendGAEvent("event", "ama_session_signup_success", {
    page_path: PAGE_PATH,
  });
}

function trackSubmitFailure(errorMessage?: string) {
  sendGAEvent("event", "ama_session_signup_failure", {
    page_path: PAGE_PATH,
    ...(errorMessage ? { error_message: errorMessage } : {}),
  });
}

export default function AmaSessionSignupForm({
  userId,
  tutorId,
  amaSessionId,
  registrationOpen,
  closedMessage = "عذراً، التسجيل في هذه الجلسة مغلق.",
}: AmaSessionSignupFormProps) {
  const [state, setState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!registrationOpen) return;

    const form = e.currentTarget;
    if (!form.reportValidity()) return;

    setState("loading");
    setErrorMessage(null);

    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") || ""),
      phone: String(formData.get("phone") || ""),
      user_id: userId,
      tutor_id: tutorId,
      ama_session_id: amaSessionId,
    };

    try {
      const res = await fetch("/api/ama-sessions/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(data?.error || "فشل إتمام التسجيل.");
      }

      trackSubmitSuccess();
      setState("success");
      form.reset();
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "تعذر إتمام التسجيل حالياً. حاول مرة أخرى.";
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
          شكراً! تم تسجيلك بنجاح. ستصلك رسالة تأكيد عبر الواتساب قريباً.
        </p>
      </div>
    );
  }

  if (!registrationOpen) {
    return (
      <div
        className="rounded-[10px] border border-warm-amber/40 bg-warm-amber/10 px-4 py-6 text-center sm:px-6"
        role="status"
      >
        <p className="text-base font-medium leading-relaxed text-midnight-blue sm:text-lg">
          {closedMessage}
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
        <label htmlFor="ama-name" className="sr-only">
          الإسم
        </label>
        <input
          id="ama-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder="الإسم"
          className="w-full rounded-[10px] border border-light-grey bg-white px-4 py-3 text-base text-primary-text placeholder:text-cool-grey focus:border-primary-blue focus:outline-none focus:ring-2 focus:ring-primary-blue/20"
        />
      </div>
      <div>
        <label htmlFor="ama-phone" className="sr-only">
          رقم الهاتف
        </label>
        <input
          id="ama-phone"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          placeholder="رقم الهاتف"
          className="w-full rounded-[10px] border border-light-grey bg-white px-4 py-3 text-base text-primary-text placeholder:text-cool-grey focus:border-primary-blue focus:outline-none focus:ring-2 focus:ring-primary-blue/20"
        />
      </div>

      <p className="text-center text-sm leading-relaxed text-grey sm:text-base">
        بعد التسجيل ستصلك رسالة تأكيد عبر الواتساب.
      </p>

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
        disabled={state === "loading" || !userId}
        className="w-full rounded-[10px] bg-primary-blue py-3.5 text-base font-bold text-off-white shadow-sm transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {state === "loading" ? "جاري التسجيل..." : "سجّل في الجلسة"}
      </button>
    </form>
  );
}
