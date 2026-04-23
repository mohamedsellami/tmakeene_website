import { NextResponse } from "next/server";
import { Resend } from "resend";

type Payload = {
  name?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
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

    if (!fullName || !phone) {
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

    await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: "تسجيل جديد من صفحة ولي الأمر - تمكين",
      text: [
        "تم استلام تسجيل جديد:",
        `الاسم: ${fullName}`,
        `رقم الهاتف: ${phone}`,
      ].join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "تعذر إرسال التسجيل حالياً. حاول مرة أخرى." },
      { status: 500 },
    );
  }
}
