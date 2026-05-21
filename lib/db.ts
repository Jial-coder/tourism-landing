import 'server-only';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import * as schema from '@/drizzle/schema';

let _db: ReturnType<typeof drizzle<typeof schema>> | null = null;
let _admin: SupabaseClient | null = null;

export function getDb() {
  if (_db) return _db;
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error('DATABASE_URL is not set');
  const queryClient = postgres(url, { prepare: false });
  _db = drizzle(queryClient, { schema });
  return _db;
}

export function getSupabaseAdmin(): SupabaseClient {
  if (_admin) return _admin;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url) throw new Error('NEXT_PUBLIC_SUPABASE_URL is not set');
  if (!key) throw new Error('SUPABASE_SECRET_KEY is not set');
  _admin = createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  return _admin;
}

export { schema };
