import { NextResponse } from "next/server";
import { Resend } from "resend";

type Payload = {
  motherName?: string;
  childId?: string;
  phone?: string;
  consent?: boolean;
};

const resendApiKey = process.env.RESEND_API_KEY;
const toEmail = process.env.REGISTRATION_TO_EMAIL;
const fromEmail =
  process.env.REGISTRATION_FROM_EMAIL || "Tamkeene <onboarding@resend.dev>";

function normalizePhone(value: string) {
  return value.trim().replace(/[\s-]/g, "");
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Payload;
    const motherName = (body.motherName || "").trim();
    const childId = (body.childId || "").trim();
    const phone = normalizePhone(body.phone || "");
    const consent = body.consent === true;

    if (motherName.length < 2 || motherName.length > 80) {
      return NextResponse.json(
        { error: "أدخلي اسم الأم." },
        { status: 400 },
      );
    }

    if (
      !childId ||
      childId.length < 3 ||
      childId.length > 80 ||
      /\s/.test(childId)
    ) {
      return NextResponse.json(
        { error: "تأكدي من معرّف المستخدم تاع إبنك كما يظهر في التطبيق." },
        { status: 400 },
      );
    }

    if (!/^\+?[0-9]{8,15}$/.test(phone)) {
      return NextResponse.json(
        { error: "أدخلي رقم واتساب صالحاً مع مفتاح الدولة." },
        { status: 400 },
      );
    }

    if (!consent) {
      return NextResponse.json(
        {
          error:
            "الموافقة على استخدام بيانات التقدّم مطلوبة لإكمال التسجيل.",
        },
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
      subject: "تسجيل جديد — متابعة مجانية لتقدّم شهادة التعليم المتوسط",
      text: [
        "تم استلام تسجيل جديد في المتابعة المجانية لتقدّم شهادة التعليم المتوسط:",
        `اسم الأم: ${motherName}`,
        `معرّف المستخدم: ${childId}`,
        `رقم واتساب: ${phone}`,
        "الموافقة على استخدام بيانات التقدّم التعليمية وإرسال التقارير عبر واتساب: نعم",
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
