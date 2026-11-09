-- Adds a code-checked RPC to delete all practice sessions and their notes.
create or replace function public.clear_practice_history(p_code text)
returns integer
language plpgsql
security definer
set search_path=public,private,extensions
as $$
declare
  stored_hash text;
  deleted_count integer;
begin
  select code_hash into stored_hash
  from private.group_access
  where id=true;

  if stored_hash is null or crypt(p_code,stored_hash)<>stored_hash then
    raise exception 'invalid access code';
  end if;

  update public.current_practice_slot
  set session_id=null
  where slot=true;

  delete from public.practice_sessions;
  get diagnostics deleted_count = row_count;
  return deleted_count;
end;
$$;

revoke all on function public.clear_practice_history(text) from public;
grant execute on function public.clear_practice_history(text) to anon,authenticated;
