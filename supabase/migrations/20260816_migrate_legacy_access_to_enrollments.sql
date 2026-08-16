-- Backfill historical learner access into durable enrollments.
-- Safe and additive: partner/admin access codes remain untouched.

insert into public.formation_enrollments (
  learner_user_id,
  course_id,
  order_id,
  status,
  access_source,
  activated_at,
  access_until
)
select
  p.id,
  fac.course_id,
  null,
  case
    when fac.status = 'active' and (fac.access_until is null or fac.access_until > now()) then 'active'
    else 'expired'
  end,
  'migration',
  coalesce(fac.activated_at, fac.created_at, now()),
  fac.access_until
from public.formation_access_codes fac
join public.profiles p on lower(p.email) = lower(fac.student_email)
where fac.student_email is not null
  and fac.course_id is not null
on conflict (learner_user_id, course_id) do nothing;
