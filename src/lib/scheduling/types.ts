export type SessionDuration = 30 | 60 | 90 | 120;

export type TutorAvailabilityRow = {
  id: string;
  tutor_id: string;
  content_id: string | null;
  day_of_week: number;
  start_time: string;
  end_time: string;
  timezone: string;
  is_active: boolean;
};

export type BookingRow = {
  id: string;
  tutor_id: string;
  learner_id?: string | null;
  content_id: string | null;
  starts_at: string;
  ends_at: string;
  duration_minutes: SessionDuration;
  status: "pending" | "confirmed" | "cancelled";
};

export type SlotsByDate = Record<string, string[]>;
