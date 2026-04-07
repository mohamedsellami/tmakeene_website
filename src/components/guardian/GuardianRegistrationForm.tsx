"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

type SubmitState = "idle" | "loading" | "success" | "error";

export default function GuardianRegistrationForm() {
  const [accepted, setAccepted] = useState(false);
  const [state, setState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!accepted) return;
    if (!form.reportValidity()) return;

    setState("loading");
    setErrorMessage(null);

    const formData = new FormData(form);
    const payload = {
      firstName: String(formData.get("firstName") || ""),
      lastName: String(formData.get("lastName") || ""),
      phone: String(formData.get("phone") || ""),
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

      setState("success");
      form.reset();
      setAccepted(false);
    } catch (err) {
      setState("error");
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "تعذر إرسال التسجيل حالياً. حاول مرة أخرى.",
      );
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
        <label htmlFor="guardian-first-name" className="sr-only">
          إسم ولي الأمر
        </label>
        <input
          id="guardian-first-name"
          name="firstName"
          type="text"
          required
          autoComplete="given-name"
          placeholder="إسم ولي الأمر"
          className="w-full rounded-[10px] border border-light-grey bg-white px-4 py-3 text-base text-primary-text placeholder:text-cool-grey focus:border-primary-blue focus:outline-none focus:ring-2 focus:ring-primary-blue/20"
        />
      </div>
      <div>
        <label htmlFor="guardian-last-name" className="sr-only">
          لقب ولي الأمر
        </label>
        <input
          id="guardian-last-name"
          name="lastName"
          type="text"
          required
          autoComplete="family-name"
          placeholder="لقب ولي الأمر"
          className="w-full rounded-[10px] border border-light-grey bg-white px-4 py-3 text-base text-primary-text placeholder:text-cool-grey focus:border-primary-blue focus:outline-none focus:ring-2 focus:ring-primary-blue/20"
        />
      </div>
      <div>
        <label htmlFor="guardian-phone" className="sr-only">
          رقم الهاتف
        </label>
        <input
          id="guardian-phone"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          placeholder="رقم الهاتف"
          className="w-full rounded-[10px] border border-light-grey bg-white px-4 py-3 text-base text-primary-text placeholder:text-cool-grey focus:border-primary-blue focus:outline-none focus:ring-2 focus:ring-primary-blue/20"
        />
      </div>
      <label className="flex cursor-pointer items-start gap-3 text-sm text-primary-text">
        <input
          type="checkbox"
          checked={accepted}
          onChange={(e) => setAccepted(e.target.checked)}
          className="mt-1 h-4 w-4 shrink-0 rounded border-light-grey text-primary-blue focus:ring-primary-blue"
        />
        <span className="leading-relaxed">
          أوافق على{" "}
          <Link
            href="/privacy-policy"
            className="font-semibold text-primary-blue underline-offset-2 hover:underline"
          >
            سياسة الخصوصية
          </Link>{" "}
          و{" "}
          <Link
            href="/terms-and-conditions"
            className="font-semibold text-primary-blue underline-offset-2 hover:underline"
          >
            الشروط والأحكام
          </Link>
          .
        </span>
      </label>

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
        disabled={!accepted || state === "loading"}
        className="w-full rounded-[10px] bg-primary-blue py-3.5 text-base font-bold text-off-white shadow-sm transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {state === "loading" ? "جاري الإرسال..." : "تسجيل"}
      </button>
    </form>
  );
}
