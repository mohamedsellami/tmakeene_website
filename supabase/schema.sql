-- Tamkeene session booking schema
-- Run in Supabase SQL Editor after creating your project.

-- Recurring weekly availability windows per tutor
create table if not exists tutor_availability (
  id uuid primary key default gen_random_uuid(),
  tutor_id text not null,
  content_id text,
  day_of_week smallint not null check (day_of_week between 0 and 6),
  start_time time not null,
  end_time time not null,
  timezone text not null default 'Africa/Algiers',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  check (end_time > start_time)
);

create index if not exists idx_tutor_availability_tutor
  on tutor_availability (tutor_id)
  where is_active = true;

-- Session booking requests. New requests remain pending until manually confirmed.
create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  tutor_id text not null,
  learner_id text,
  content_id text,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  duration_minutes smallint not null check (duration_minutes in (30, 60, 90, 120)),
  learner_name text not null,
  learner_phone text not null,
  learner_email text not null,
  teacher_name text,
  session_title text,
  price_per_session numeric,
  total_price numeric,
  status text not null default 'pending',
  created_at timestamptz not null default now(),
  check (ends_at > starts_at)
);

-- These ALTER statements also update databases created with an older version
-- of this schema where bookings defaulted directly to confirmed.
alter table bookings
  alter column status set default 'pending';

alter table bookings
  drop constraint if exists bookings_status_check;

alter table bookings
  add constraint bookings_status_check
  check (status in ('pending', 'confirmed', 'cancelled'));

-- Relax/align duration constraint to support 30/60/90/120 minutes
do $$
declare
  r record;
begin
  for r in
    select conname
    from pg_constraint
    where conrelid = 'public.bookings'::regclass
      and contype = 'c'
      and pg_get_constraintdef(oid) like '%duration_minutes%'
  loop
    execute format('alter table bookings drop constraint %I', r.conname);
  end loop;
end $$;

alter table bookings
  add constraint bookings_duration_check
  check (duration_minutes in (30, 60, 90, 120));

drop index if exists idx_bookings_tutor_starts;
create index idx_bookings_tutor_starts
  on bookings (tutor_id, starts_at)
  where status in ('pending', 'confirmed');

-- Pending requests reserve a slot; cancelling one releases it.
drop index if exists idx_bookings_unique_slot;
create unique index idx_bookings_unique_slot
  on bookings (tutor_id, starts_at)
  where status in ('pending', 'confirmed');

-- RLS: enabled, no public policies — access via service role in API routes only
alter table tutor_availability enable row level security;
alter table bookings enable row level security;

-- Example seed (replace tutor_id with the real tutor_id from the booking URL)
-- insert into tutor_availability (tutor_id, day_of_week, start_time, end_time)
-- values
--   ('TUTOR123', 0, '16:00', '20:00'),  -- Sunday
--   ('TUTOR123', 2, '18:00', '21:00');  -- Tuesday
