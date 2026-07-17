"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import {
  getSessionPrice,
  parseFreelanceEnglishParams,
  type SessionDuration,
} from "@/lib/freelance-english-params";
import FreelanceEnglishHero from "./FreelanceEnglishHero";
import FreelanceEnglishRegistrationForm from "./FreelanceEnglishRegistrationForm";

export default function FreelanceEnglishPageContent() {
  const searchParams = useSearchParams();
  const params = parseFreelanceEnglishParams(searchParams);
  const [duration, setDuration] = useState<SessionDuration>(params.minDuration);

  const pricePerSession = getSessionPrice(params.basePrice, duration);

  return (
    <>
      <FreelanceEnglishHero
        sessionTitle={params.sessionTitle}
        teacherName={params.teacherName}
        basePrice={params.basePrice}
        duration={duration}
        minDuration={params.minDuration}
        onDurationChange={setDuration}
      />

      <div id="register" className="scroll-mt-24">
        <h2 className="text-center text-2xl font-bold text-midnight-blue sm:text-3xl">
          إحجز حصتك الآن
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-base text-grey sm:text-lg">
          لاتفوت الفرصة، الأماكن محدودة.
        </p>
        <div className="mt-8">
          <FreelanceEnglishRegistrationForm
            learnerId={params.learnerId}
            tutorId={params.tutorId}
            contentId={params.contentId}
            teacherName={params.teacherName}
            sessionTitle={params.sessionTitle}
            duration={duration}
            onDurationChange={setDuration}
            minDuration={params.minDuration}
            pricePerSession={pricePerSession}
          />
        </div>
      </div>
    </>
  );
}
