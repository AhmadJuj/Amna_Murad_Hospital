"use client";

import { Search } from "lucide-react";
import { useState } from "react";
import type { Doctor } from "@/data/doctors";
import { DoctorsDirectory } from "./doctors-directory";

export function DoctorsPageContent({ doctors }: { doctors: Doctor[] }) {
  const [query, setQuery] = useState("");

  return (
    <>
      <section className="border-b border-[#e5e8f1] bg-white">
        <div className="hero-copy mx-auto max-w-[920px] px-5 py-12 text-center md:px-8 md:py-16">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#1b5b9c]">
            Trusted medical experts
          </p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-[-0.035em] text-[#12203a] sm:text-4xl">
            Find the Best Doctors in Gujranwala
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#768196]">
            Book appointments with qualified specialists at Amna Murad Hospital
            — gynecologist, dermatologist, pediatrician, neuro physician,
            clinical dietitian, dental surgeon, physiotherapist, and general
            surgeon, all in one place.
          </p>
          <label className="mx-auto mt-7 flex max-w-[660px] items-center rounded-xl border border-[#d9e2ed] bg-white p-1.5 shadow-[0_10px_30px_rgba(27,58,91,0.08)] focus-within:border-[#0b438c]">
            <Search size={18} className="ml-3 shrink-0 text-[#8290a4]" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              type="search"
              placeholder="Search by doctor, department or expertise..."
              className="h-11 min-w-0 flex-1 bg-transparent px-3 text-sm text-[#213049] outline-none placeholder:text-[#9da8b6]"
            />
            <a
              href="#directory"
              className="hidden rounded-lg bg-[#083a76] px-5 py-3 text-xs font-bold text-white sm:inline-flex"
            >
              Search
            </a>
          </label>
        </div>
      </section>
      <div id="directory">
        <DoctorsDirectory
          doctors={doctors}
          query={query}
          onQueryChange={setQuery}
        />
      </div>
    </>
  );
}
