import { readFile } from "fs/promises";
import path from "path";
import { createClient } from "@supabase/supabase-js";

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secret = process.env.SUPABASE_SECRET_KEY;

  if (!url || !secret || url.includes("YOUR_PROJECT_REF")) {
    throw new Error(
      "Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SECRET_KEY before seeding.",
    );
  }

  const filePath = path.join(process.cwd(), "data", "doctors.json");
  const doctors = JSON.parse(await readFile(filePath, "utf8"));

  const supabase = createClient(url, secret, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const rows = doctors.map((doctor) => ({
    id: doctor.id,
    slug: doctor.slug,
    name: doctor.name,
    designation: doctor.designation,
    degrees: doctor.degrees,
    department: doctor.department,
    experience: doctor.experience,
    visiting_days: doctor.visitingDays,
    timings: doctor.timings,
    expertise: doctor.expertise,
    biography: doctor.biography,
    image: doctor.image,
    updated_at: new Date().toISOString(),
  }));

  const { error } = await supabase.from("doctors").upsert(rows, {
    onConflict: "id",
  });

  if (error) {
    throw new Error(error.message);
  }

  const maxId = Math.max(...doctors.map((doctor) => doctor.id));
  console.log(`Seeded ${doctors.length} doctors into Supabase.`);
  console.log(
    `Run this in Supabase SQL Editor to keep new IDs in sync:\nselect setval(pg_get_serial_sequence('public.doctors', 'id'), ${maxId});`,
  );
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
