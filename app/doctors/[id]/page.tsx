import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  Clock3,
  GraduationCap,
  Stethoscope,
} from "lucide-react";
import { HospitalFooter, HospitalHeader } from "@/app/ui/home-sections";
import { Reveal } from "@/app/ui/reveal";
import { doctorPortraits, doctors } from "@/data/doctors";

export function generateStaticParams() {
  return doctors.map((doctor) => ({ id: doctor.id.toString() }));
}

export default async function DoctorProfilePage({
  params,
}: PageProps<"/doctors/[id]">) {
  const { id } = await params;
  const doctor = doctors.find((item) => item.id === Number(id));

  if (!doctor) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f7f9fc] text-[#0b1730]">
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
              src={doctorPortraits[doctor.id]}
              alt={doctor.name}
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
              {doctor.designation}
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <Detail icon={GraduationCap} value={doctor.degrees.join(", ")} />
              <Detail icon={Stethoscope} value={doctor.experience} />
              <Detail icon={Clock3} value={doctor.timings} />
            </div>
            <div className="mt-8 border-t border-[#edf1f5] pt-7">
              <h2 className="font-extrabold text-[#1c2a40]">About</h2>
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
