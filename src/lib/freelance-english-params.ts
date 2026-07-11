export type SessionDuration = 30 | 60;

export type FreelanceEnglishParams = {
  userId: string;
  contentId: string;
  sessionTitle: string;
  teacherName: string;
  basePrice: number | null;
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
  return {
    userId: searchParams.get("user_id")?.trim() || "",
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
  };
}

export function getSessionPrice(
  basePrice: number | null,
  duration: SessionDuration,
): number | null {
  if (basePrice === null) return null;
  return duration === 60 ? basePrice * 2 : basePrice;
}

export function formatPrice(price: number | null): string {
  if (price === null) return "— دج";
  return `${price.toLocaleString("fr-DZ")} دج`;
}
