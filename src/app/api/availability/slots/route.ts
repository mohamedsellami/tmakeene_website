import { NextResponse } from "next/server";
import { getAvailableSlots, getDefaultSlotRange } from "@/lib/scheduling/slots";
import type { SessionDuration } from "@/lib/scheduling/types";
import { isSupabaseConfigured } from "@/lib/supabase/server";

function parseDuration(value: string | null): SessionDuration | null {
  if (
    value === "30" ||
    value === "60" ||
    value === "90" ||
    value === "120"
  ) {
    return Number(value) as SessionDuration;
  }
  return null;
}

export async function GET(request: Request) {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { error: "إعدادات قاعدة البيانات غير مكتملة على الخادم." },
        { status: 500 },
      );
    }

    const { searchParams } = new URL(request.url);
    const tutorId = searchParams.get("tutor_id")?.trim();
    const contentId = searchParams.get("content_id")?.trim() || undefined;
    const durationMinutes = parseDuration(searchParams.get("duration_minutes"));
    const defaults = getDefaultSlotRange();
    const from = searchParams.get("from")?.trim() || defaults.from;
    const to = searchParams.get("to")?.trim() || defaults.to;

    if (!tutorId) {
      return NextResponse.json(
        { error: "معرّف الأستاذ مطلوب." },
        { status: 400 },
      );
    }

    if (!durationMinutes) {
      return NextResponse.json(
        { error: "مدة الحصة غير صالحة." },
        { status: 400 },
      );
    }

    const slots = await getAvailableSlots({
      tutorId,
      contentId,
      durationMinutes,
      fromDate: from,
      toDate: to,
    });

    return NextResponse.json({ slots });
  } catch {
    return NextResponse.json(
      { error: "تعذر تحميل المواعيد المتاحة." },
      { status: 500 },
    );
  }
}
