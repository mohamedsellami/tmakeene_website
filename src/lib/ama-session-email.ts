import { Resend } from "resend";
import { formatBookingDateTimeArabic } from "@/lib/scheduling/datetime";

const resendApiKey = process.env.RESEND_API_KEY;
const toEmail = process.env.REGISTRATION_TO_EMAIL;
const fromEmail =
  process.env.REGISTRATION_FROM_EMAIL || "Tamkeene <onboarding@resend.dev>";

export type AmaSignupEmailPayload = {
  name: string;
  phone: string;
  userId: string;
  tutorId: string;
  tutorName?: string;
  amaSessionId: string;
  sessionTitle: string;
  scheduledAt?: string;
  scheduleLabel?: string;
  signupCount: number;
  maxSignups: number;
};

export async function sendAmaSignupNotificationEmail(
  payload: AmaSignupEmailPayload,
): Promise<void> {
  if (!resendApiKey || !toEmail) {
    throw new Error("Email env vars are not configured.");
  }

  const resend = new Resend(resendApiKey);

  const lines = [
    "تم تسجيل مشارك جديد في جلسة Ask Me Anything:",
    `الاسم: ${payload.name}`,
    `رقم الهاتف: ${payload.phone}`,
    `عنوان الجلسة: ${payload.sessionTitle}`,
  ];

  if (payload.tutorName) {
    lines.push(`اسم الأستاذة: ${payload.tutorName}`);
  }

  const scheduledLine =
    payload.scheduleLabel?.trim() ||
    (payload.scheduledAt
      ? formatBookingDateTimeArabic(new Date(payload.scheduledAt))
      : "");
  if (scheduledLine) {
    lines.push(`موعد الجلسة: ${scheduledLine}`);
  }

  lines.push(
    `عدد المسجّلين: ${payload.signupCount} من ${payload.maxSignups}`,
    `معرّف المستخدم: ${payload.userId}`,
    `معرّف الأستاذة: ${payload.tutorId}`,
    `معرّف الجلسة: ${payload.amaSessionId}`,
  );

  await resend.emails.send({
    from: fromEmail,
    to: toEmail,
    subject: "تسجيل جديد في جلسة Ask Me Anything — تفكيرة",
    text: lines.join("\n"),
  });
}
