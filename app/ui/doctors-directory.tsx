"use client";

import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  Search,
  SlidersHorizontal,
  Stethoscope,
} from "lucide-react";
import { useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { doctorPortraits, doctors } from "@/data/doctors";
import { Reveal } from "./reveal";

const departments = Array.from(
  new Set(doctors.map((doctor) => doctor.department)),
);

function experienceYears(value: string) {
  const years = Number.parseInt(value, 10);
  return Number.isNaN(years) ? 0 : years;
}

type DoctorsDirectoryProps = {
  query: string;
  onQueryChange: (value: string) => void;
};

export function DoctorsDirectory({
  query,
  onQueryChange,
}: DoctorsDirectoryProps) {
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [minimumExperience, setMinimumExperience] = useState("0");
  const [sortBy, setSortBy] = useState("recommended");

  const visibleDoctors = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const minimumYears = Number(minimumExperience);

    const filtered = doctors.filter((doctor) => {
      const matchesQuery =
        !normalizedQuery ||
        doctor.name.toLowerCase().includes(normalizedQuery) ||
        doctor.department.toLowerCase().includes(normalizedQuery) ||
        doctor.designation.toLowerCase().includes(normalizedQuery) ||
        doctor.expertise.some((item) =>
          item.toLowerCase().includes(normalizedQuery),
        );
      const matchesDepartment =
        selectedDepartments.length === 0 ||
        selectedDepartments.includes(doctor.department);
      const matchesExperience =
        experienceYears(doctor.experience) >= minimumYears;

      return matchesQuery && matchesDepartment && matchesExperience;
    });

    return [...filtered].sort((first, second) => {
      if (sortBy === "name") {
        return first.name.localeCompare(second.name);
      }
      if (sortBy === "experience") {
        return (
          experienceYears(second.experience) -
          experienceYears(first.experience)
        );
      }
      return first.id - second.id;
    });
  }, [minimumExperience, query, selectedDepartments, sortBy]);

  function toggleDepartment(department: string) {
    setSelectedDepartments((current) =>
      current.includes(department)
        ? current.filter((item) => item !== department)
        : [...current, department],
    );
  }

  function clearFilters() {
    onQueryChange("");
    setSelectedDepartments([]);
    setMinimumExperience("0");
    setSortBy("recommended");
  }

  return (
    <div className="mx-auto max-w-[1180px] px-4 py-10 sm:px-5 md:px-8 lg:py-14">
      <div className="grid gap-8 lg:grid-cols-[230px_1fr]">
        <Reveal direction="left" className="h-fit rounded-xl border border-[#dce5ef] bg-white p-5 shadow-[0_10px_28px_rgba(30,55,85,0.06)] lg:sticky lg:top-5">
          <div className="flex items-center gap-2 border-b border-[#edf1f5] pb-4">
            <SlidersHorizontal size={17} className="text-[#164b85]" />
            <h2 className="text-sm font-extrabold text-[#18243a]">Filters</h2>
          </div>

          <fieldset className="mt-5">
            <legend className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#526177]">
              Departments
            </legend>
            <div className="mt-4 space-y-3">
              {departments.map((department) => {
                const isSelected = selectedDepartments.includes(department);
                return (
                  <label
                    key={department}
                    className="flex cursor-pointer items-center gap-3 text-xs font-medium text-[#667388]"
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleDepartment(department)}
                      className="sr-only"
                    />
                    <span
                      className={`grid size-4 place-items-center rounded border ${
                        isSelected
                          ? "border-[#0b438c] bg-[#0b438c] text-white"
                          : "border-[#cbd6e3] bg-white"
                      }`}
                    >
                      {isSelected && <Check size={11} strokeWidth={3} />}
                    </span>
                    {department}
                  </label>
                );
              })}
            </div>
          </fieldset>

          <div className="my-5 h-px bg-[#edf1f5]" />

          <label className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#526177]">
            Experience
            <span className="relative mt-3 block">
              <select
                value={minimumExperience}
                onChange={(event) => setMinimumExperience(event.target.value)}
                className="h-10 w-full appearance-none rounded-lg border border-[#dce5ef] bg-white px-3 pr-8 text-xs font-semibold text-[#526177] outline-none focus:border-[#0b438c]"
              >
                <option value="0">Any experience</option>
                <option value="5">5+ years</option>
                <option value="8">8+ years</option>
                <option value="10">10+ years</option>
              </select>
              <ChevronDown
                size={14}
                className="pointer-events-none absolute right-3 top-3 text-[#738097]"
              />
            </span>
          </label>

          <button
            type="button"
            onClick={clearFilters}
            className="mt-5 w-full rounded-lg border border-[#dce5ef] py-2.5 text-xs font-bold text-[#1a4778] transition hover:bg-[#f1f6fb]"
          >
            Clear filters
          </button>
        </Reveal>

        <Reveal direction="right" delay={80}>
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#6f7d92]">
                {visibleDoctors.length} specialists found
              </p>
              <h2 className="mt-1 text-xl font-extrabold text-[#172238]">
                Available consultants
              </h2>
            </div>
            <label className="flex items-center gap-2 text-xs font-semibold text-[#647187]">
              Sort by
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                className="h-9 rounded-lg border border-[#dce5ef] bg-white px-3 text-xs font-semibold text-[#3d4d64] outline-none focus:border-[#0b438c]"
              >
                <option value="recommended">Recommended</option>
                <option value="experience">Most experienced</option>
                <option value="name">Name A–Z</option>
              </select>
            </label>
          </div>

          {visibleDoctors.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {visibleDoctors.map((doctor) => (
                <Card
                  key={doctor.id}
                  className="group overflow-hidden rounded-[16px] transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-[#b7c8dc]"
                >
                  <div className="relative h-52 overflow-hidden bg-[#dce8ef]">
                    <Image
                      src={doctorPortraits[doctor.id]}
                      alt={doctor.name}
                      fill
                      unoptimized
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.025]"
                    />
                    <span className="absolute left-4 top-4 rounded-full border border-white/60 bg-white/90 px-3 py-1 text-[9px] font-extrabold uppercase tracking-[0.12em] text-[#174d84]">
                      {doctor.department}
                    </span>
                  </div>
                  <CardHeader className="pt-5">
                    <CardTitle className="text-lg">{doctor.name}</CardTitle>
                    <CardDescription className="min-h-10 text-xs leading-5 text-[#35618b]">
                      {doctor.designation}
                    </CardDescription>
                    <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#8b97a8]">
                      {doctor.degrees.join(" · ")}
                    </p>
                  </CardHeader>
                  <CardContent className="mt-4 grid grid-cols-2 gap-3 border-y border-[#edf1f5] py-4 text-[10px] text-[#6f7d91]">
                    <div className="flex items-center gap-2">
                      <Stethoscope size={13} className="text-[#1c568e]" />
                      {doctor.experience}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock3 size={13} className="text-[#1c568e]" />
                      {doctor.timings}
                    </div>
                  </CardContent>
                  <CardFooter className="gap-2 pt-5">
                    <Link
                      href={`/doctors/${doctor.id}`}
                      className="flex-1 rounded-lg border border-[#cfd9e5] py-2.5 text-center text-[11px] font-extrabold text-[#173f70] transition hover:border-[#173f70] hover:bg-[#f1f6fb]"
                    >
                      View profile
                    </Link>
                  
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid min-h-72 place-items-center rounded-xl border border-dashed border-[#cbd7e4] bg-white text-center">
              <div>
                <Search className="mx-auto text-[#8ca0b5]" size={28} />
                <p className="mt-3 text-sm font-bold text-[#34445c]">
                  No specialists found
                </p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-3 text-xs font-bold text-[#0b438c]"
                >
                  Clear all filters
                </button>
              </div>
            </div>
          )}
        </Reveal>
      </div>
    </div>
  );
}
