import { NextResponse } from "next/server";
import { AMA_SESSION_MAX_SIGNUPS, AMA_SESSION_TITLE } from "@/lib/ama-session";
import { sendAmaSignupNotificationEmail } from "@/lib/ama-session-email";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/server";

type SignupPayload = {
  name?: string;
  phone?: string;
  user_id?: string;
  tutor_id?: string;
  ama_session_id?: string;
};

export async function POST(request: Request) {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { error: "إعدادات قاعدة البيانات غير مكتملة على الخادم." },
        { status: 500 },
      );
    }

    const body = (await request.json()) as SignupPayload;
    const name = (body.name || "").trim();
    const phone = (body.phone || "").trim();
    const userId = (body.user_id || "").trim();
    const tutorId = (body.tutor_id || "").trim();
    const amaSessionId = (body.ama_session_id || "").trim();

    if (!name || !phone || !userId || !tutorId || !amaSessionId) {
      return NextResponse.json(
        { error: "يرجى ملء جميع الحقول المطلوبة." },
        { status: 400 },
      );
    }

    const supabase = getSupabaseAdmin();

    const { data: session, error: sessionError } = await supabase
      .from("ama_sessions")
      .select("id, tutor_id, status, scheduled_at, schedule_label")
      .eq("id", amaSessionId)
      .maybeSingle();

    if (sessionError) {
      console.error("ama_sessions fetch error:", sessionError);
      return NextResponse.json(
        { error: "تعذر التحقق من الجلسة." },
        { status: 500 },
      );
    }

    if (!session) {
      return NextResponse.json(
        { error: "الجلسة غير موجودة." },
        { status: 404 },
      );
    }

    if (String(session.tutor_id) !== tutorId) {
      return NextResponse.json(
        { error: "معرّف الأستاذ لا يطابق هذه الجلسة." },
        { status: 400 },
      );
    }

    if (session.status !== "coming") {
      return NextResponse.json(
        { error: "التسجيل في هذه الجلسة مغلق." },
        { status: 400 },
      );
    }

    const { count, error: countError } = await supabase
      .from("ama_session_signups")
      .select("id", { count: "exact", head: true })
      .eq("ama_session_id", amaSessionId);

    if (countError) {
      console.error("ama_session_signups count error:", countError);
      return NextResponse.json(
        { error: "تعذر التحقق من عدد المسجّلين." },
        { status: 500 },
      );
    }

    const previousSignupCount = count ?? 0;

    if (previousSignupCount >= AMA_SESSION_MAX_SIGNUPS) {
      return NextResponse.json(
        { error: "عذراً، اكتملت الأماكن في هذه الجلسة." },
        { status: 400 },
      );
    }

    const { error: insertError } = await supabase
      .from("ama_session_signups")
      .insert({
        ama_session_id: amaSessionId,
        user_id: userId,
        name,
        phone,
      });

    if (insertError) {
      if (insertError.code === "23505") {
        return NextResponse.json(
          { error: "أنت مسجّل مسبقاً في هذه الجلسة." },
          { status: 409 },
        );
      }
      console.error("ama_session_signups insert error:", insertError);
      return NextResponse.json(
        { error: "تعذر إتمام التسجيل. حاول مرة أخرى." },
        { status: 500 },
      );
    }

    try {
      const { data: tutor } = await supabase
        .from("tutors")
        .select("display_name")
        .eq("id", tutorId)
        .maybeSingle();

      await sendAmaSignupNotificationEmail({
        name,
        phone,
        userId,
        tutorId,
        tutorName: tutor?.display_name?.trim() || undefined,
        amaSessionId,
        sessionTitle: AMA_SESSION_TITLE,
        scheduledAt: session.scheduled_at ?? undefined,
        scheduleLabel: session.schedule_label ?? undefined,
        signupCount: previousSignupCount + 1,
        maxSignups: AMA_SESSION_MAX_SIGNUPS,
      });
    } catch (emailError) {
      // Signup is saved even if the notification email fails.
      console.error("ama signup email error:", emailError);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("POST /api/ama-sessions/signup error:", error);
    return NextResponse.json(
      { error: "حدث خطأ غير متوقع." },
      { status: 500 },
    );
  }
}
