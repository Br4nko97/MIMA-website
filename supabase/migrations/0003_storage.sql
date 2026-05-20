-- =============================================================
-- MIMA · 0003_storage.sql
-- Storage buckets: public-read, write only via service role.
-- =============================================================

-- Buckets (idempotent)
insert into storage.buckets (id, name, public)
values
  ('members', 'members', true),
  ('events', 'events', true),
  ('stories', 'stories', true),
  ('media', 'media', true),
  ('audio', 'audio', true)
on conflict (id) do nothing;

-- Public read policies for object access
do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage' and tablename = 'objects' and policyname = 'mima_public_read'
  ) then
    create policy "mima_public_read"
      on storage.objects for select
      using (bucket_id in ('members','events','stories','media','audio'));
  end if;
end$$;

-- No insert/update/delete policies needed — uploads go through Server-side
-- routes that use the service-role key.
