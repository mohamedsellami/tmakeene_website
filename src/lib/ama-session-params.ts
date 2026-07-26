export type AmaSessionParams = {
  userId: string;
  tutorId: string;
  amaSessionId: string;
};

export function parseAmaSessionParams(
  searchParams: URLSearchParams,
): AmaSessionParams {
  return {
    userId: searchParams.get("user_id")?.trim() || "",
    tutorId: searchParams.get("tutor_id")?.trim() || "",
    amaSessionId: searchParams.get("ama_session_id")?.trim() || "",
  };
}
