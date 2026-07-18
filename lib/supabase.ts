import { createClient } from "@supabase/supabase-js";

function requiredEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `${name} is missing. Add your Supabase project URL and keys to .env.local / Vercel env vars.`,
    );
  }
  return value;
}

/** Server-side admin client (bypasses RLS). Use only in API routes / server components. */
export function getSupabaseAdmin() {
  return createClient(
    requiredEnv("NEXT_PUBLIC_SUPABASE_URL"),
    requiredEnv("SUPABASE_SECRET_KEY"),
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    },
  );
}

export const DOCTOR_IMAGES_BUCKET = "doctor-images";
