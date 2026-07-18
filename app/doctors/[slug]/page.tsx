import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  Clock3,
  GraduationCap,
  Stethoscope,
} from "lucide-react";
import { HospitalFooter, HospitalHeader } from "@/app/ui/home-sections";
import { JsonLd } from "@/app/ui/json-ld";
import { Reveal } from "@/app/ui/reveal";
import { doctorPath } from "@/data/doctors";
import { getDoctors } from "@/lib/doctors-store";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, physicianSchema } from "@/lib/structured-data";

export const dynamic = "force-dynamic";

function findDoctor(slug: string, doctors: Awaited<ReturnType<typeof getDoctors>>) {
  return doctors.find((item) => item.slug === slug);
}

export async function generateMetadata({
  params,
}: PageProps<"/doctors/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const doctors = await getDoctors();
  const doctor = findDoctor(slug, doctors);

  if (!doctor) {
    return { title: "Doctor Not Found" };
  }

  const specialty = doctor.department;
  return buildMetadata({
    title: `${doctor.name} - ${specialty} in Gujranwala`,
    absoluteTitle: true,
    description: `Book an appointment with ${doctor.name}, ${doctor.designation} (${doctor.degrees.join(", ")}) at Amna Murad Hospital Gujranwala. ${doctor.experience} experience. Call 0300-6409917.`,
    path: doctorPath(doctor),
    keywords: [
      `best ${specialty.toLowerCase()} in Gujranwala`,
      `${specialty.toLowerCase()} near me`,
      `${doctor.name} Gujranwala`,
      `book ${specialty.toLowerCase()} appointment online`,
      ...doctor.expertise.map((item) => item.toLowerCase()),
    ],
    ogType: "profile",
  });
}

export default async function DoctorProfilePage({
  params,
}: PageProps<"/doctors/[slug]">) {
  const { slug } = await params;
  const doctors = await getDoctors();
  const doctor = findDoctor(slug, doctors);

  if (!doctor) {
    // Preserve old numeric URLs (/doctors/3) with a permanent redirect.
    const legacyDoctor = doctors.find((item) => item.id === Number(slug));
    if (legacyDoctor) {
      permanentRedirect(doctorPath(legacyDoctor));
    }
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f7f9fc] text-[#0b1730]">
      <JsonLd
        data={[
          physicianSchema(doctor, doctor.slug),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Doctors", path: "/doctors" },
            { name: doctor.name, path: doctorPath(doctor) },
          ]),
        ]}
      />
      <HospitalHeader />
      <section className="mx-auto max-w-[1080px] px-5 py-10 md:px-8 md:py-16">
        <Link
          href="/doctors"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#174f88]"
        >
          <ArrowLeft size={14} /> Back to all doctors
        </Link>
        <Reveal className="mt-7 grid overflow-hidden rounded-2xl border border-[#dce5ef] bg-white shadow-[0_16px_45px_rgba(30,55,85,0.08)] lg:grid-cols-[340px_1fr]">
          <div className="relative min-h-[420px] bg-[#dce8ef]">
            <Image
              src={doctor.image}
              alt={`${doctor.name}, ${doctor.designation} at Amna Murad Hospital Gujranwala`}
              fill
              unoptimized
              priority
              sizes="(max-width: 1024px) 100vw, 340px"
              className="object-cover object-top"
            />
          </div>
          <div className="p-6 sm:p-9">
            <span className="inline-flex rounded-full bg-[#eaf3fc] px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#15508a]">
              {doctor.department}
            </span>
            <h1 className="mt-5 text-3xl font-extrabold tracking-[-0.035em] text-[#14223a]">
              {doctor.name}
            </h1>
            <p className="mt-2 text-sm font-semibold text-[#31618e]">
              {doctor.designation} in Gujranwala
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <Detail icon={GraduationCap} value={doctor.degrees.join(", ")} />
              <Detail icon={Stethoscope} value={doctor.experience} />
              <Detail icon={Clock3} value={doctor.timings} />
            </div>
            <div className="mt-8 border-t border-[#edf1f5] pt-7">
              <h2 className="font-extrabold text-[#1c2a40]">
                About {doctor.name}
              </h2>
              <p className="mt-3 text-sm leading-7 text-[#6d798c]">
                {doctor.biography}
              </p>
            </div>
            <div className="mt-7">
              <h2 className="font-extrabold text-[#1c2a40]">
                Areas of expertise
              </h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {doctor.expertise.map((item) => (
                  <p
                    key={item}
                    className="flex items-center gap-2 text-xs font-semibold text-[#526177]"
                  >
                    <span className="grid size-5 place-items-center rounded-full bg-[#eaf3fc] text-[#15508a]">
                      <Check size={11} strokeWidth={3} />
                    </span>
                    {item}
                  </p>
                ))}
              </div>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="/contact"
                className="rounded-lg bg-[#0b438c] px-6 py-3 text-sm font-bold text-white"
              >
                Book appointment
              </a>
              <span className="flex items-center gap-2 text-xs font-semibold text-[#657287]">
                <CalendarDays size={15} className="text-[#17518c]" />
                {doctor.visitingDays.join(", ")}
              </span>
            </div>
          </div>
        </Reveal>
      </section>
      <HospitalFooter />
    </main>
  );
}

function Detail({
  icon: Icon,
  value,
}: {
  icon: typeof Clock3;
  value: string;
}) {
  return (
    <div className="rounded-lg bg-[#f4f7fb] p-3">
      <Icon size={15} className="text-[#15518d]" />
      <p className="mt-2 text-[11px] font-bold leading-5 text-[#4c5b70]">
        {value}
      </p>
    </div>
  );
}
