export type SessionDuration = 30 | 60 | 90 | 120;

export type MinDuration = 30 | 60;

export type FreelanceEnglishParams = {
  learnerId: string;
  tutorId: string;
  contentId: string;
  sessionTitle: string;
  teacherName: string;
  basePrice: number | null;
  minDuration: MinDuration;
};

function parsePrice(value: string | null): number | null {
  if (!value) return null;
  const digits = value.replace(/[^\d]/g, "");
  if (!digits) return null;
  const parsed = Number(digits);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
}

export function parseFreelanceEnglishParams(
  searchParams: URLSearchParams,
): FreelanceEnglishParams {
  const minDurationParam = Number(searchParams.get("min_duration"));
  const minDuration: MinDuration =
    minDurationParam === 60 ? 60 : minDurationParam === 30 ? 30 : 30;

  return {
    learnerId: searchParams.get("user_id")?.trim() || "",
    tutorId: searchParams.get("tutor_id")?.trim() || "",
    contentId: searchParams.get("content_id")?.trim() || "",
    sessionTitle:
      searchParams.get("session_title")?.trim() ||
      searchParams.get("title")?.trim() ||
      "Handle Your English-Speaking Clients Confidently",
    teacherName:
      searchParams.get("teacher_name")?.trim() ||
      searchParams.get("tutor_name")?.trim() ||
      "",
    basePrice: parsePrice(searchParams.get("price")),
    minDuration,
  };
}

export function getSessionPrice(
  basePrice: number | null,
  duration: SessionDuration,
): number | null {
  if (basePrice === null) return null;
  // Assumes `basePrice` is the price for a 30-minute session.
  // Then 60=2x, 90=3x, 120=4x.
  return (duration / 30) * basePrice;
}

export function formatPrice(price: number | null): string {
  if (price === null) return "— دج";
  return `${price.toLocaleString("fr-DZ")} دج`;
}
