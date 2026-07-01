import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables"
  );
}

// ⚠️ Server-only — full database access. NEVER import this in a
// "use client" component. Only use inside API routes (route.ts files).
export const supabaseAdmin: SupabaseClient = createClient(
  supabaseUrl,
  supabaseKey,
  {
    auth: { autoRefreshToken: false, persistSession: false },
  }
);