import { NextResponse } from "next/server";
import { Resend } from "resend";

type Payload = {
  name?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  course?: string;
  user_id?: string;
  content_id?: string;
  teacher_name?: string;
  session_title?: string;
  session_count?: number;
  duration_minutes?: number;
  price_per_session?: number;
  total_price?: number;
};

const resendApiKey = process.env.RESEND_API_KEY;
const toEmail = process.env.REGISTRATION_TO_EMAIL;
const fromEmail =
  process.env.REGISTRATION_FROM_EMAIL || "Tamkeene <onboarding@resend.dev>";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Payload;
    const name = (body.name || "").trim();
    const firstName = (body.firstName || "").trim();
    const lastName = (body.lastName || "").trim();
    const fullName = name || `${firstName} ${lastName}`.trim();
    const phone = (body.phone || "").trim();
    const email = (body.email || "").trim();
    const course = (body.course || "").trim();
    const userId = (body.user_id || "").trim();
    const contentId = (body.content_id || "").trim();
    const teacherName = (body.teacher_name || "").trim();
    const sessionTitle = (body.session_title || "").trim();
    const sessionCount = body.session_count;
    const durationMinutes = body.duration_minutes;
    const pricePerSession = body.price_per_session;
    const totalPrice = body.total_price;

    if (!fullName || !phone) {
      return NextResponse.json(
        { error: "يرجى ملء جميع الحقول المطلوبة." },
        { status: 400 },
      );
    }

    if (course === "ielts-preparation" && !email) {
      return NextResponse.json(
        { error: "يرجى ملء جميع الحقول المطلوبة." },
        { status: 400 },
      );
    }

    if (
      course === "ielts-preparation" &&
      (!sessionCount || sessionCount < 1 || !durationMinutes)
    ) {
      return NextResponse.json(
        { error: "يرجى ملء جميع الحقول المطلوبة." },
        { status: 400 },
      );
    }

    if (!resendApiKey || !toEmail) {
      return NextResponse.json(
        { error: "إعدادات البريد غير مكتملة على الخادم." },
        { status: 500 },
      );
    }

    const resend = new Resend(resendApiKey);

    const subject =
      course === "ielts-preparation"
        ? "تسجيل جديد — مسار IELTS Preparation - تفكيرة"
        : "تسجيل جديد من صفحة ولي الأمر - تفكيرة";

    const lines = [
      "تم استلام تسجيل جديد:",
      `الاسم: ${fullName}`,
      `رقم الهاتف: ${phone}`,
    ];
    if (email) {
      lines.push(`البريد الإلكتروني: ${email}`);
    }
    if (course) {
      lines.push(`المسار: ${course}`);
    }
    if (userId) {
      lines.push(`معرّف المستخدم: ${userId}`);
    }
    if (teacherName) {
      lines.push(`اسم الأستاذ: ${teacherName}`);
    }
    if (sessionTitle) {
      lines.push(`عنوان الحصة: ${sessionTitle}`);
    }
    if (contentId) {
      lines.push(`معرّف المحتوى: ${contentId}`);
    }
    if (sessionCount) {
      lines.push(`عدد الحصص: ${sessionCount}`);
    }
    if (durationMinutes) {
      lines.push(`مدة الحصة: ${durationMinutes} دقيقة`);
    }
    if (pricePerSession !== undefined) {
      lines.push(`سعر الحصة: ${pricePerSession} دج`);
    }
    if (totalPrice !== undefined) {
      lines.push(`السعر الإجمالي: ${totalPrice} دج`);
    }

    await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject,
      text: lines.join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "تعذر إرسال التسجيل حالياً. حاول مرة أخرى." },
      { status: 500 },
    );
  }
}
