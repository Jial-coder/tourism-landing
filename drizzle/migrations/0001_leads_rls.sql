-- 0001_leads_rls — enable RLS, add service_role-only policy, revoke public access
alter table public.leads enable row level security;

drop policy if exists "service_role_full_access" on public.leads;
create policy "service_role_full_access"
  on public.leads
  for all
  to service_role
  using (true)
  with check (true);

revoke all on public.leads from anon, authenticated;
