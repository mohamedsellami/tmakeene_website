export const AMA_SESSION_TITLE = "Ask Me Anything about IELTS";
export const AMA_SESSION_MAX_SIGNUPS = 20;

export const AMA_SESSION_FEATURES = [
  "نصائح مباشرة من أستاذة متخصصة في IELTS",
  "إجابات على أسئلتك عن التحضير للامتحان",
  "تعرف على أسلوب التحضير مع الأستاذة",
] as const;

export type AmaSessionStatus = "coming" | "closed";

export type AmaSessionDetails = {
  title: string;
  tutorName: string;
  scheduledAt: string;
  scheduleLabel: string;
  status: AmaSessionStatus;
  signupCount: number;
  maxSignups: number;
  isFull: boolean;
};
