"use client";

import { sendGAEvent } from "@next/third-parties/google";
import { FormEvent, useState } from "react";
import {
  formatPrice,
  type SessionDuration,
  type MinDuration,
} from "@/lib/freelance-english-params";
import SessionSlotPicker, {
  type SelectedSlot,
} from "./SessionSlotPicker";

type SubmitState = "idle" | "loading" | "success" | "error";

const PAGE_PATH = "/ielts-preparation";

type FreelanceEnglishRegistrationFormProps = {
  learnerId: string;
  tutorId: string;
  contentId: string;
  teacherName: string;
  sessionTitle: string;
  duration: SessionDuration;
  onDurationChange: (duration: SessionDuration) => void;
  minDuration: MinDuration;
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
  learnerId,
  tutorId,
  contentId,
  teacherName,
  sessionTitle,
  duration,
  onDurationChange,
  minDuration,
  pricePerSession,
}: FreelanceEnglishRegistrationFormProps) {
  const [state, setState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<SelectedSlot | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;

    if (!selectedSlot) {
      setErrorMessage("يرجى اختيار موعد للحصة.");
      return;
    }

    setState("loading");
    setErrorMessage(null);

    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") || ""),
      phone: String(formData.get("phone") || ""),
      email: String(formData.get("email") || ""),
      duration_minutes: duration,
      session_title: sessionTitle,
      starts_at: selectedSlot.startsAt,
      ...(teacherName ? { teacher_name: teacherName } : {}),
      ...(learnerId ? { user_id: learnerId } : {}),
      ...(tutorId ? { tutor_id: tutorId } : {}),
      ...(contentId ? { content_id: contentId } : {}),
      ...(pricePerSession !== null
        ? {
            price_per_session: pricePerSession,
            total_price: pricePerSession,
          }
        : {}),
    };

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(data?.error || "فشل إتمام الحجز.");
      }

      trackSubmitSuccess();
      setState("success");
      setSelectedSlot(null);
      form.reset();
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "تعذر إتمام الحجز حالياً. حاول مرة أخرى.";
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
          شكراً! تم إرسال طلب الحجز بنجاح. سيتم التواصل معك لتأكيد الموعد عبر
          الواتساب أو رقم الهاتف في أقرب وقت.
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

      <fieldset>
        <legend className="mb-2 block text-sm font-semibold text-midnight-blue">
          مدة الحصة
        </legend>
        <div className="grid grid-cols-2 gap-3">
          {minDuration === 30 ? (
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
          ) : null}
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
          <label
            className={`flex cursor-pointer items-center justify-center rounded-[10px] border px-4 py-3 text-sm font-semibold transition ${
              duration === 90
                ? "border-primary-blue bg-primary-blue/10 text-primary-blue"
                : "border-light-grey bg-white text-primary-text"
            }`}
          >
            <input
              type="radio"
              name="duration_minutes"
              value="90"
              checked={duration === 90}
              onChange={() => onDurationChange(90)}
              className="sr-only"
            />
            90 دقيقة
          </label>
          <label
            className={`flex cursor-pointer items-center justify-center rounded-[10px] border px-4 py-3 text-sm font-semibold transition ${
              duration === 120
                ? "border-primary-blue bg-primary-blue/10 text-primary-blue"
                : "border-light-grey bg-white text-primary-text"
            }`}
          >
            <input
              type="radio"
              name="duration_minutes"
              value="120"
              checked={duration === 120}
              onChange={() => onDurationChange(120)}
              className="sr-only"
            />
            120 دقيقة
          </label>
        </div>
        {pricePerSession !== null ? (
          <p className="mt-2 text-center text-sm text-grey">
            سعر الحصة: {formatPrice(pricePerSession)}
          </p>
        ) : null}
      </fieldset>

      <SessionSlotPicker
        tutorId={tutorId}
        contentId={contentId}
        durationMinutes={duration}
        selectedSlot={selectedSlot}
        onSlotChange={setSelectedSlot}
      />

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
        disabled={state === "loading" || !selectedSlot}
        className="w-full rounded-[10px] bg-primary-blue py-3.5 text-base font-bold text-off-white shadow-sm transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {state === "loading" ? "جاري الحجز..." : "احجز الحصة"}
      </button>
    </form>
  );
}
