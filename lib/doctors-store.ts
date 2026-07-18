import { readFile } from "fs/promises";
import path from "path";
import type { Doctor } from "@/data/doctors";
import { DOCTOR_IMAGES_BUCKET, getSupabaseAdmin } from "@/lib/supabase";

type DoctorRow = {
  id: number;
  slug: string;
  name: string;
  designation: string;
  degrees: string[] | null;
  department: string;
  experience: string | null;
  visiting_days: string[] | null;
  timings: string | null;
  expertise: string[] | null;
  biography: string | null;
  image: string | null;
};

const doctorsFilePath = path.join(process.cwd(), "data", "doctors.json");

function asStringArray(value: unknown) {
  if (Array.isArray(value)) {
    return value.map(String).map((item) => item.trim()).filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(/\r?\n|,/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90);
}

function uniqueSlug(base: string, doctors: Doctor[], currentId?: number) {
  const fallback = base || "doctor";
  let slug = fallback;
  let suffix = 2;

  while (
    doctors.some((doctor) => doctor.slug === slug && doctor.id !== currentId)
  ) {
    slug = `${fallback}-${suffix}`;
    suffix += 1;
  }

  return slug;
}

function rowToDoctor(row: DoctorRow): Doctor {
  return {
    id: Number(row.id),
    slug: row.slug,
    name: row.name,
    designation: row.designation,
    degrees: row.degrees ?? [],
    department: row.department,
    experience: row.experience ?? "Not specified",
    visitingDays: row.visiting_days ?? [],
    timings: row.timings ?? "By appointment",
    expertise: row.expertise ?? [],
    biography: row.biography ?? "",
    image: row.image || "/logo.jpeg",
  };
}

function doctorToRow(doctor: Doctor) {
  return {
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
  };
}

function isSupabaseConfigured() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return Boolean(
    url &&
      process.env.SUPABASE_SECRET_KEY &&
      !url.includes("YOUR_PROJECT_REF"),
  );
}

async function getDoctorsFromFile() {
  const file = await readFile(doctorsFilePath, "utf8");
  return JSON.parse(file) as Doctor[];
}

export async function getDoctors(): Promise<Doctor[]> {
  if (!isSupabaseConfigured()) {
    return getDoctorsFromFile();
  }

  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("doctors")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      throw new Error(error.message);
    }

    return (data as DoctorRow[]).map(rowToDoctor);
  } catch (error) {
    // Keep builds/local previews working if Supabase is unreachable.
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "Supabase doctors fetch failed, falling back to local JSON:",
        error instanceof Error ? error.message : error,
      );
      return getDoctorsFromFile();
    }

    throw new Error(
      `Failed to load doctors: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
    );
  }
}

function requireSupabaseForWrites() {
  if (!isSupabaseConfigured()) {
    throw new Error(
      "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SECRET_KEY, then run the SQL in supabase/schema.sql.",
    );
  }
}

export async function createDoctor(input: unknown) {
  requireSupabaseForWrites();
  const doctors = await getDoctors();
  const doctor = normalizeDoctor(input, doctors, 0);
  const row = doctorToRow({ ...doctor, id: 0 });
  const { id: _id, ...rowWithoutId } = row;
  void _id;

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("doctors")
    .insert(rowWithoutId)
    .select("*")
    .single();

  if (error) {
    throw new Error(`Failed to create doctor: ${error.message}`);
  }

  return rowToDoctor(data as DoctorRow);
}

export async function updateDoctor(id: number, input: unknown) {
  requireSupabaseForWrites();
  const doctors = await getDoctors();
  const existing = doctors.find((doctor) => doctor.id === id);

  if (!existing) {
    return null;
  }

  const doctor = normalizeDoctor(input, doctors, id, existing);
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("doctors")
    .update(doctorToRow(doctor))
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    throw new Error(`Failed to update doctor: ${error.message}`);
  }

  return rowToDoctor(data as DoctorRow);
}

export async function deleteDoctor(id: number) {
  requireSupabaseForWrites();
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("doctors")
    .delete()
    .eq("id", id)
    .select("id");

  if (error) {
    throw new Error(`Failed to delete doctor: ${error.message}`);
  }

  return (data?.length ?? 0) > 0;
}

export async function uploadDoctorImage(file: File) {
  requireSupabaseForWrites();

  const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
  const extensionByType: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
  };

  if (!allowedTypes.has(file.type)) {
    throw new Error("Only JPG, PNG, and WEBP images are allowed.");
  }

  const extension = extensionByType[file.type];
  const safeBaseName = slugify(file.name.replace(/\.[^.]+$/, "")) || "doctor";
  const fileName = `${Date.now()}-${safeBaseName}.${extension}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const supabase = getSupabaseAdmin();
  const { error } = await supabase.storage
    .from(DOCTOR_IMAGES_BUCKET)
    .upload(fileName, buffer, {
      contentType: file.type,
      upsert: false,
    });

  if (error) {
    throw new Error(`Failed to upload image: ${error.message}`);
  }

  const { data } = supabase.storage
    .from(DOCTOR_IMAGES_BUCKET)
    .getPublicUrl(fileName);

  return data.publicUrl;
}

function normalizeDoctor(
  input: unknown,
  doctors: Doctor[],
  id: number,
  fallback?: Doctor,
): Doctor {
  const data = (input ?? {}) as Partial<Doctor>;
  const name = String(data.name ?? fallback?.name ?? "").trim();
  const designation = String(
    data.designation ?? fallback?.designation ?? "",
  ).trim();
  const department = String(data.department ?? fallback?.department ?? "").trim();

  if (!name || !designation || !department) {
    throw new Error("Name, designation, and department are required.");
  }

  const requestedSlug = String(data.slug ?? fallback?.slug ?? "").trim();
  const baseSlug = slugify(requestedSlug || `${name}-${designation}`);

  return {
    id,
    slug: uniqueSlug(baseSlug, doctors, id),
    name,
    designation,
    degrees: asStringArray(data.degrees ?? fallback?.degrees),
    department,
    experience: String(
      data.experience ?? fallback?.experience ?? "Not specified",
    ).trim(),
    visitingDays: asStringArray(data.visitingDays ?? fallback?.visitingDays),
    timings: String(
      data.timings ?? fallback?.timings ?? "By appointment",
    ).trim(),
    expertise: asStringArray(data.expertise ?? fallback?.expertise),
    biography: String(data.biography ?? fallback?.biography ?? "").trim(),
    image:
      String(data.image ?? fallback?.image ?? "/logo.jpeg").trim() ||
      "/logo.jpeg",
  };
}
