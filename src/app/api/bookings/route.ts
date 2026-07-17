import { NextResponse } from "next/server";
import { sendBookingConfirmationEmail } from "@/lib/booking-email";
import { isSlotAvailable } from "@/lib/scheduling/slots";
import type { SessionDuration } from "@/lib/scheduling/types";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/server";

type BookingPayload = {
  name?: string;
  phone?: string;
  email?: string;
  user_id?: string;
  tutor_id?: string;
  content_id?: string;
  teacher_name?: string;
  session_title?: string;
  starts_at?: string;
  duration_minutes?: number;
  price_per_session?: number;
  total_price?: number;
};

function parseDuration(value: unknown): SessionDuration | null {
  if (value === 30 || value === 60 || value === 90 || value === 120)
    return value;
  return null;
}

export async function POST(request: Request) {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { error: "إعدادات قاعدة البيانات غير مكتملة على الخادم." },
        { status: 500 },
      );
    }

    const body = (await request.json()) as BookingPayload;
    const learnerName = (body.name || "").trim();
    const learnerPhone = (body.phone || "").trim();
    const learnerEmail = (body.email || "").trim();
    const learnerId = (body.user_id || "").trim() || null;
    const tutorId = (body.tutor_id || "").trim();
    const contentId = (body.content_id || "").trim() || null;
    const teacherName = (body.teacher_name || "").trim() || null;
    const sessionTitle = (body.session_title || "").trim() || null;
    const startsAtRaw = (body.starts_at || "").trim();
    const durationMinutes = parseDuration(body.duration_minutes);
    const pricePerSession = body.price_per_session;
    const totalPrice = body.total_price ?? body.price_per_session;

    if (!learnerName || !learnerPhone || !learnerEmail || !tutorId || !startsAtRaw) {
      return NextResponse.json(
        { error: "يرجى ملء جميع الحقول المطلوبة." },
        { status: 400 },
      );
    }

    if (!durationMinutes) {
      return NextResponse.json(
        { error: "مدة الحصة غير صالحة." },
        { status: 400 },
      );
    }

    const startsAt = new Date(startsAtRaw);
    if (Number.isNaN(startsAt.getTime())) {
      return NextResponse.json(
        { error: "موعد الحصة غير صالح." },
        { status: 400 },
      );
    }

    const slotStillFree = await isSlotAvailable({
      tutorId,
      startsAt: startsAt.toISOString(),
      durationMinutes,
    });

    if (!slotStillFree) {
      return NextResponse.json(
        { error: "هذا الموعد لم يعد متاحاً. يرجى اختيار موعد آخر." },
        { status: 409 },
      );
    }

    const endsAt = new Date(startsAt.getTime() + durationMinutes * 60 * 1000);
    const supabase = getSupabaseAdmin();

    const { error: insertError } = await supabase.from("bookings").insert({
      tutor_id: tutorId,
      learner_id: learnerId,
      content_id: contentId,
      starts_at: startsAt.toISOString(),
      ends_at: endsAt.toISOString(),
      duration_minutes: durationMinutes,
      learner_name: learnerName,
      learner_phone: learnerPhone,
      learner_email: learnerEmail,
      teacher_name: teacherName,
      session_title: sessionTitle,
      price_per_session: pricePerSession ?? null,
      total_price: totalPrice ?? null,
      status: "pending",
    });

    if (insertError) {
      if (insertError.code === "23505") {
        return NextResponse.json(
          { error: "هذا الموعد لم يعد متاحاً. يرجى اختيار موعد آخر." },
          { status: 409 },
        );
      }
      throw insertError;
    }

    try {
      await sendBookingConfirmationEmail({
        learnerName,
        learnerPhone,
        learnerEmail,
        teacherName: teacherName ?? undefined,
        sessionTitle: sessionTitle ?? undefined,
        tutorId,
        contentId: contentId ?? undefined,
        startsAt: startsAt.toISOString(),
        durationMinutes,
        pricePerSession,
        totalPrice,
      });
    } catch {
      // Booking is saved even if email fails.
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "تعذر إتمام الحجز حالياً. حاول مرة أخرى." },
      { status: 500 },
    );
  }
}
