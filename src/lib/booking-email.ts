import { Resend } from "resend";
import { formatBookingDateTimeArabic } from "@/lib/scheduling/datetime";

const resendApiKey = process.env.RESEND_API_KEY;
const toEmail = process.env.REGISTRATION_TO_EMAIL;
const fromEmail =
  process.env.REGISTRATION_FROM_EMAIL || "Tamkeene <onboarding@resend.dev>";

export type BookingEmailPayload = {
  learnerName: string;
  learnerPhone: string;
  learnerEmail: string;
  teacherName?: string;
  sessionTitle?: string;
  tutorId?: string;
  contentId?: string;
  startsAt: string;
  durationMinutes: number;
  pricePerSession?: number;
  totalPrice?: number;
};

export async function sendBookingConfirmationEmail(
  payload: BookingEmailPayload,
): Promise<void> {
  if (!resendApiKey || !toEmail) {
    throw new Error("Email env vars are not configured.");
  }

  const resend = new Resend(resendApiKey);
  const startsAt = new Date(payload.startsAt);
  const formattedDateTime = formatBookingDateTimeArabic(startsAt);

  const lines = [
    "تم استلام طلب حجز حصة جديد بانتظار التأكيد:",
    `الاسم: ${payload.learnerName}`,
    `رقم الهاتف: ${payload.learnerPhone}`,
    `البريد الإلكتروني: ${payload.learnerEmail}`,
    `موعد الحصة: ${formattedDateTime}`,
    `مدة الحصة: ${payload.durationMinutes} دقيقة`,
  ];

  if (payload.teacherName) {
    lines.push(`اسم الأستاذ: ${payload.teacherName}`);
  }
  if (payload.sessionTitle) {
    lines.push(`عنوان الحصة: ${payload.sessionTitle}`);
  }
  if (payload.tutorId) {
    lines.push(`معرّف الأستاذ: ${payload.tutorId}`);
  }
  if (payload.contentId) {
    lines.push(`معرّف المحتوى: ${payload.contentId}`);
  }
  if (payload.pricePerSession !== undefined) {
    lines.push(`سعر الحصة: ${payload.pricePerSession} دج`);
  }
  if (payload.totalPrice !== undefined) {
    lines.push(`السعر الإجمالي: ${payload.totalPrice} دج`);
  }

  await resend.emails.send({
    from: fromEmail,
    to: toEmail,
    subject: "طلب حجز بانتظار التأكيد — IELTS Preparation - تفكيرة",
    text: lines.join("\n"),
  });
}
