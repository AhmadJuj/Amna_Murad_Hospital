"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { Doctor } from "@/data/doctors";

type DoctorFormState = Omit<Doctor, "id"> & { id?: number };

const emptyDoctor: DoctorFormState = {
  slug: "",
  name: "",
  designation: "",
  degrees: [],
  department: "",
  experience: "",
  visitingDays: [],
  timings: "",
  expertise: [],
  biography: "",
  image: "",
};

const inputClass =
  "mt-1 w-full rounded-lg border border-[#d6deeb] bg-white px-3 py-2 text-sm text-[#13203a] outline-none focus:border-[#0b438c]";

const textareaClass = `${inputClass} min-h-24 resize-y`;

function joinLines(values: string[]) {
  return values.join("\n");
}

function splitLines(value: string) {
  return value
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function AdminClient({
  initialDoctors,
  isLoggedIn,
}: {
  initialDoctors: Doctor[];
  isLoggedIn: boolean;
}) {
  const [loggedIn, setLoggedIn] = useState(isLoggedIn);
  const [doctors, setDoctors] = useState(initialDoctors);
  const [selectedDoctor, setSelectedDoctor] =
    useState<DoctorFormState>(emptyDoctor);
  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const sortedDoctors = useMemo(
    () => [...doctors].sort((first, second) => first.id - second.id),
    [doctors],
  );

  async function loadDoctors() {
    const response = await fetch("/api/admin/doctors", { cache: "no-store" });
    if (!response.ok) {
      setMessage("Could not load doctors.");
      return;
    }

    const data = (await response.json()) as { doctors: Doctor[] };
    setDoctors(data.doctors);
  }

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setMessage("Signing in...");

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });

    if (!response.ok) {
      setMessage("Invalid email or password.");
      return;
    }

    setLoggedIn(true);
    setMessage("Logged in.");
    await loadDoctors();
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setLoggedIn(false);
    setDoctors([]);
    setSelectedDoctor(emptyDoctor);
  }

  function updateField<K extends keyof DoctorFormState>(
    key: K,
    value: DoctorFormState[K],
  ) {
    setSelectedDoctor((current) => ({ ...current, [key]: value }));
  }

  function editDoctor(doctor: Doctor) {
    setSelectedDoctor({ ...doctor });
    setMessage("");
  }

  function resetForm() {
    setSelectedDoctor(emptyDoctor);
    setMessage("");
  }

  async function handleImageUpload(file?: File) {
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    setMessage("Uploading image...");

    const response = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData,
    });

    const data = (await response.json()) as { url?: string; message?: string };
    if (!response.ok || !data.url) {
      setMessage(data.message ?? "Image upload failed.");
      return;
    }

    updateField("image", data.url);
    setMessage("Image uploaded.");
  }

  async function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setMessage("Saving doctor...");

    const payload = {
      ...selectedDoctor,
      degrees: selectedDoctor.degrees,
      visitingDays: selectedDoctor.visitingDays,
      expertise: selectedDoctor.expertise,
    };

    const url = selectedDoctor.id
      ? `/api/admin/doctors/${selectedDoctor.id}`
      : "/api/admin/doctors";
    const method = selectedDoctor.id ? "PUT" : "POST";

    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = (await response.json()) as {
      doctor?: Doctor;
      message?: string;
    };

    setIsSaving(false);

    if (!response.ok || !data.doctor) {
      setMessage(data.message ?? "Could not save doctor.");
      return;
    }

    await loadDoctors();
    setSelectedDoctor({ ...data.doctor });
    setMessage("Doctor saved. Public doctors page now uses the updated JSON.");
  }

  async function handleDelete(doctor: Doctor) {
    const confirmed = window.confirm(`Delete ${doctor.name}?`);
    if (!confirmed) {
      return;
    }

    const response = await fetch(`/api/admin/doctors/${doctor.id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      setMessage("Could not delete doctor.");
      return;
    }

    await loadDoctors();
    if (selectedDoctor.id === doctor.id) {
      resetForm();
    }
    setMessage("Doctor deleted.");
  }

  if (!loggedIn) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#f3f6fb] px-4 py-12 text-[#0b1730]">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md rounded-2xl border border-[#dbe4f0] bg-white p-6 shadow-[0_22px_70px_rgba(20,49,77,0.12)]"
        >
          <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#0b438c]">
            Amna Murad Hospital
          </p>
          <h1 className="mt-3 text-2xl font-extrabold">Admin Login</h1>
          <p className="mt-2 text-sm leading-6 text-[#66738a]">
            Sign in to manage doctors shown on the public doctors page.
          </p>

          <label className="mt-6 block text-xs font-bold text-[#33425b]">
            Email
            <input name="email" type="email" required className={inputClass} />
          </label>
          <label className="mt-4 block text-xs font-bold text-[#33425b]">
            Password
            <input
              name="password"
              type="password"
              required
              className={inputClass}
            />
          </label>
          <button
            type="submit"
            className="mt-6 w-full rounded-lg bg-[#062a61] px-5 py-3 text-sm font-extrabold text-white"
          >
            Login
          </button>
          {message && <p className="mt-4 text-sm text-[#be123c]">{message}</p>}
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f3f6fb] px-4 py-8 text-[#0b1730] md:px-8">
      <div className="mx-auto max-w-[1280px]">
        <div className="flex flex-col gap-4 rounded-2xl bg-[#062a61] p-5 text-white shadow-[0_18px_50px_rgba(6,42,97,0.18)] sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-white/70">
              Admin dashboard
            </p>
            <h1 className="mt-1 text-2xl font-extrabold">
              Manage Doctors
            </h1>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-lg bg-white px-5 py-2.5 text-sm font-extrabold text-[#062a61]"
          >
            Logout
          </button>
        </div>

        {message && (
          <p className="mt-5 rounded-lg border border-[#dbe4f0] bg-white px-4 py-3 text-sm font-semibold text-[#24405f]">
            {message}
          </p>
        )}

        <div className="mt-6 grid gap-6 lg:grid-cols-[360px_1fr]">
          <aside className="rounded-2xl border border-[#dbe4f0] bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-extrabold">Doctors ({doctors.length})</h2>
              <button
                type="button"
                onClick={resetForm}
                className="rounded-lg bg-[#e9f2fb] px-3 py-2 text-xs font-extrabold text-[#0b438c]"
              >
                Add New
              </button>
            </div>
            <div className="mt-4 space-y-3">
              {sortedDoctors.map((doctor) => (
                <article
                  key={doctor.id}
                  className="rounded-xl border border-[#edf1f5] p-3"
                >
                  <div className="flex gap-3">
                    <div className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-[#dce8ef]">
                      {doctor.image && (
                        <Image
                          src={doctor.image}
                          alt={doctor.name}
                          fill
                          unoptimized
                          sizes="56px"
                          className="object-cover object-top"
                        />
                      )}
                    </div>
                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-extrabold">
                        {doctor.name}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-xs text-[#66738a]">
                        {doctor.designation}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button
                      type="button"
                      onClick={() => editDoctor(doctor)}
                      className="flex-1 rounded-lg border border-[#cbd9e8] py-2 text-xs font-bold text-[#173f70]"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(doctor)}
                      className="flex-1 rounded-lg bg-[#fee2e2] py-2 text-xs font-bold text-[#991b1b]"
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </aside>

          <form
            onSubmit={handleSave}
            className="rounded-2xl border border-[#dbe4f0] bg-white p-5 shadow-sm"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#0b438c]">
                  {selectedDoctor.id ? "Edit doctor" : "Add doctor"}
                </p>
                <h2 className="mt-1 text-xl font-extrabold">
                  Doctor Information
                </h2>
              </div>
              <button
                type="submit"
                disabled={isSaving}
                className="rounded-lg bg-[#062a61] px-6 py-3 text-sm font-extrabold text-white disabled:opacity-60"
              >
                {isSaving ? "Saving..." : "Save Doctor"}
              </button>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <TextField
                label="Name"
                value={selectedDoctor.name}
                onChange={(value) => updateField("name", value)}
                required
              />
              <TextField
                label="Designation"
                value={selectedDoctor.designation}
                onChange={(value) => updateField("designation", value)}
                required
              />
              <TextField
                label="Department"
                value={selectedDoctor.department}
                onChange={(value) => updateField("department", value)}
                required
              />
              <TextField
                label="Experience"
                value={selectedDoctor.experience}
                onChange={(value) => updateField("experience", value)}
              />
              <TextField
                label="Timings"
                value={selectedDoctor.timings}
                onChange={(value) => updateField("timings", value)}
              />
              <TextField
                label="Slug (optional)"
                value={selectedDoctor.slug}
                onChange={(value) => updateField("slug", value)}
              />
              <TextAreaField
                label="Degrees (one per line)"
                value={joinLines(selectedDoctor.degrees)}
                onChange={(value) => updateField("degrees", splitLines(value))}
              />
              <TextAreaField
                label="Visiting days (one per line)"
                value={joinLines(selectedDoctor.visitingDays)}
                onChange={(value) =>
                  updateField("visitingDays", splitLines(value))
                }
              />
              <TextAreaField
                label="Expertise (one per line)"
                value={joinLines(selectedDoctor.expertise)}
                onChange={(value) => updateField("expertise", splitLines(value))}
              />
              <TextAreaField
                label="Biography"
                value={selectedDoctor.biography}
                onChange={(value) => updateField("biography", value)}
              />
            </div>

            <div className="mt-5 rounded-xl border border-[#edf1f5] bg-[#f8fbff] p-4">
              <label className="block text-xs font-bold text-[#33425b]">
                Image URL
                <input
                  value={selectedDoctor.image}
                  onChange={(event) => updateField("image", event.target.value)}
                  className={inputClass}
                  placeholder="/doctor-images/example.jpg or https://..."
                />
              </label>
              <label className="mt-4 block text-xs font-bold text-[#33425b]">
                Upload image
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={(event) => handleImageUpload(event.target.files?.[0])}
                  className="mt-2 block w-full text-sm"
                />
              </label>
              {selectedDoctor.image && (
                <div className="relative mt-4 h-48 max-w-xs overflow-hidden rounded-xl bg-[#dce8ef]">
                  <Image
                    src={selectedDoctor.image}
                    alt="Doctor preview"
                    fill
                    unoptimized
                    sizes="320px"
                    className="object-cover object-top"
                  />
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

function TextField({
  label,
  value,
  onChange,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}) {
  return (
    <label className="block text-xs font-bold text-[#33425b]">
      {label}
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        className={inputClass}
      />
    </label>
  );
}

function TextAreaField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block text-xs font-bold text-[#33425b]">
      {label}
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={textareaClass}
      />
    </label>
  );
}
