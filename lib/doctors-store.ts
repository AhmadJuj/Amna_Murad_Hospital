import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import type { Doctor } from "@/data/doctors";

const doctorsFilePath = path.join(process.cwd(), "data", "doctors.json");
export const doctorImagesDirectory = path.join(
  process.cwd(),
  "public",
  "doctor-images",
);

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

export async function getDoctors() {
  const file = await readFile(doctorsFilePath, "utf8");
  return JSON.parse(file) as Doctor[];
}

export async function saveDoctors(doctors: Doctor[]) {
  await writeFile(doctorsFilePath, `${JSON.stringify(doctors, null, 2)}\n`);
}

export async function ensureDoctorImagesDirectory() {
  await mkdir(doctorImagesDirectory, { recursive: true });
}

export async function createDoctor(input: unknown) {
  const doctors = await getDoctors();
  const nextId = Math.max(0, ...doctors.map((doctor) => doctor.id)) + 1;
  const doctor = normalizeDoctor(input, doctors, nextId);

  const updated = [...doctors, doctor];
  await saveDoctors(updated);

  return doctor;
}

export async function updateDoctor(id: number, input: unknown) {
  const doctors = await getDoctors();
  const existing = doctors.find((doctor) => doctor.id === id);

  if (!existing) {
    return null;
  }

  const doctor = normalizeDoctor(input, doctors, id, existing);
  const updated = doctors.map((item) => (item.id === id ? doctor : item));
  await saveDoctors(updated);

  return doctor;
}

export async function deleteDoctor(id: number) {
  const doctors = await getDoctors();
  const updated = doctors.filter((doctor) => doctor.id !== id);

  if (updated.length === doctors.length) {
    return false;
  }

  await saveDoctors(updated);
  return true;
}

function normalizeDoctor(
  input: unknown,
  doctors: Doctor[],
  id: number,
  fallback?: Doctor,
): Doctor {
  const data = (input ?? {}) as Partial<Doctor>;
  const name = String(data.name ?? fallback?.name ?? "").trim();
  const designation = String(data.designation ?? fallback?.designation ?? "").trim();
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
    experience: String(data.experience ?? fallback?.experience ?? "Not specified").trim(),
    visitingDays: asStringArray(data.visitingDays ?? fallback?.visitingDays),
    timings: String(data.timings ?? fallback?.timings ?? "By appointment").trim(),
    expertise: asStringArray(data.expertise ?? fallback?.expertise),
    biography: String(data.biography ?? fallback?.biography ?? "").trim(),
    image: String(data.image ?? fallback?.image ?? "/logo.jpeg").trim() || "/logo.jpeg",
  };
}
