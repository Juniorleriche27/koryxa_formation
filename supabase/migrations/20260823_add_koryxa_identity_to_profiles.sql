-- Link the local learner profile to the central KORYXA Identity account.
-- Authentication remains owned by KORYXA Identity; Supabase auth.users is only a local shadow identity for existing FK compatibility.

alter table public.profiles
  add column if not exists koryxa_identity_user_id text,
  add column if not exists auth_provider text not null default 'supabase';

create unique index if not exists profiles_koryxa_identity_user_uidx
  on public.profiles(koryxa_identity_user_id)
  where koryxa_identity_user_id is not null;

comment on column public.profiles.koryxa_identity_user_id is 'Trusted central KORYXA Identity / Clerk user id.';
comment on column public.profiles.auth_provider is 'Authentication authority for this local profile; koryxa_identity is the target for learners.';
