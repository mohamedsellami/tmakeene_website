"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { AmaSessionDetails } from "@/lib/ama-session";
import { AMA_SESSION_TITLE } from "@/lib/ama-session";
import { parseAmaSessionParams } from "@/lib/ama-session-params";
import AmaSessionHero from "./AmaSessionHero";
import AmaSessionSignupForm from "./AmaSessionSignupForm";

type LoadState = "loading" | "ready" | "error";

export default function AmaSessionPageContent() {
  const searchParams = useSearchParams();
  const params = parseAmaSessionParams(searchParams);

  const [loadState, setLoadState] = useState<LoadState>("loading");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [session, setSession] = useState<AmaSessionDetails | null>(null);

  useEffect(() => {
    if (!params.amaSessionId || !params.tutorId) {
      setLoadState("error");
      setErrorMessage("رابط الجلسة غير صالح. تأكد من معرّف الجلسة والأستاذ.");
      return;
    }

    let cancelled = false;

    async function load() {
      setLoadState("loading");
      setErrorMessage(null);

      try {
        const query = new URLSearchParams({
          ama_session_id: params.amaSessionId,
          tutor_id: params.tutorId,
        });
        const res = await fetch(`/api/ama-sessions?${query.toString()}`);
        const data = (await res.json().catch(() => null)) as
          | (AmaSessionDetails & { error?: string })
          | { error?: string }
          | null;

        if (!res.ok) {
          throw new Error(
            (data && "error" in data && data.error) ||
              "تعذر تحميل بيانات الجلسة.",
          );
        }

        if (cancelled) return;
        setSession(data as AmaSessionDetails);
        setLoadState("ready");
      } catch (err) {
        if (cancelled) return;
        setLoadState("error");
        setErrorMessage(
          err instanceof Error
            ? err.message
            : "تعذر تحميل بيانات الجلسة. حاول مرة أخرى.",
        );
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [params.amaSessionId, params.tutorId]);

  if (loadState === "loading") {
    return (
      <p className="text-center text-base text-grey sm:text-lg" role="status">
        جاري تحميل الجلسة...
      </p>
    );
  }

  if (loadState === "error" || !session) {
    return (
      <div
        className="rounded-[10px] border border-cardinal/30 bg-cardinal/10 px-4 py-6 text-center sm:px-6"
        role="alert"
      >
        <p className="text-base font-medium text-cardinal sm:text-lg">
          {errorMessage || "تعذر تحميل بيانات الجلسة."}
        </p>
      </div>
    );
  }

  const registrationOpen =
    session.status === "coming" && !session.isFull;
  const closedMessage = session.isFull
    ? "عذراً، اكتملت الأماكن في هذه الجلسة."
    : "عذراً، التسجيل في هذه الجلسة مغلق.";

  return (
    <>
      <div id="register" className="mb-10 scroll-mt-24 sm:mb-12">
        <h2 className="text-center text-2xl font-bold text-midnight-blue sm:text-3xl">
          سجّل في الجلسة
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-base text-grey sm:text-lg">
          لاتفوت الفرصة، الأماكن محدودة.
        </p>
        <div className="mt-8">
          <AmaSessionSignupForm
            userId={params.userId}
            tutorId={params.tutorId}
            amaSessionId={params.amaSessionId}
            registrationOpen={registrationOpen && Boolean(params.userId)}
            closedMessage={
              !params.userId
                ? "رابط التسجيل غير صالح. معرّف المستخدم مطلوب."
                : closedMessage
            }
          />
        </div>
      </div>

      <AmaSessionHero
        sessionTitle={session.title || AMA_SESSION_TITLE}
        teacherName={session.tutorName}
        scheduleLabel={session.scheduleLabel}
        scheduledAt={session.scheduledAt}
      />
    </>
  );
}
