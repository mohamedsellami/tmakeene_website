import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let supabase: SupabaseClient | null = null;

function getJwtRole(key: string): string | null {
  try {
    const payload = key.split(".")[1];
    if (!payload) return null;
    const decoded = JSON.parse(Buffer.from(payload, "base64url").toString());
    return typeof decoded.role === "string" ? decoded.role : null;
  } catch {
    return null;
  }
}

export function getSupabaseAdmin(): SupabaseClient {
  if (supabase) return supabase;

  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error("Supabase env vars are not configured.");
  }

  const role = getJwtRole(serviceRoleKey);
  if (role && role !== "service_role") {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY must be the service role key, not the anon key.",
    );
  }

  supabase = createClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  return supabase;
}

export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY,
  );
}
