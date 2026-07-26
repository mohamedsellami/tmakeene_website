import { NextResponse } from "next/server";
import {
  AMA_SESSION_MAX_SIGNUPS,
  AMA_SESSION_TITLE,
  type AmaSessionStatus,
} from "@/lib/ama-session";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/server";

export async function GET(request: Request) {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { error: "إعدادات قاعدة البيانات غير مكتملة على الخادم." },
        { status: 500 },
      );
    }

    const { searchParams } = new URL(request.url);
    const amaSessionId = searchParams.get("ama_session_id")?.trim() || "";
    const tutorId = searchParams.get("tutor_id")?.trim() || "";

    if (!amaSessionId || !tutorId) {
      return NextResponse.json(
        { error: "معرّف الجلسة أو الأستاذ غير موجود." },
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
        { error: "تعذر تحميل بيانات الجلسة." },
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

    const { data: tutor, error: tutorError } = await supabase
      .from("tutors")
      .select("display_name")
      .eq("id", tutorId)
      .maybeSingle();

    if (tutorError) {
      console.error("tutors fetch error:", tutorError);
      return NextResponse.json(
        { error: "تعذر تحميل بيانات الأستاذ." },
        { status: 500 },
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

    const signupCount = count ?? 0;
    const status = session.status as AmaSessionStatus;

    return NextResponse.json({
      title: AMA_SESSION_TITLE,
      tutorName: tutor?.display_name?.trim() || "—",
      scheduledAt: session.scheduled_at,
      scheduleLabel: session.schedule_label || "",
      status,
      signupCount,
      maxSignups: AMA_SESSION_MAX_SIGNUPS,
      isFull: signupCount >= AMA_SESSION_MAX_SIGNUPS,
    });
  } catch (error) {
    console.error("GET /api/ama-sessions error:", error);
    return NextResponse.json(
      { error: "حدث خطأ غير متوقع." },
      { status: 500 },
    );
  }
}
