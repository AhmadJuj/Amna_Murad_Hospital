import Image from "next/image";
import Link from "next/link";
import {
  Award,
  HeartHandshake,
  Lightbulb,
  ShieldCheck,
  Stethoscope,
  UsersRound,
} from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HospitalFooter, HospitalHeader } from "@/app/ui/home-sections";
import {
  FacilityTile,
  LeadershipCard,
  PageHero,
  StatCard,
} from "@/app/ui/page-components";
import { JsonLd } from "@/app/ui/json-ld";
import { Reveal } from "@/app/ui/reveal";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/structured-data";

export const metadata = buildMetadata({
  title: "About Amna Murad Hospital | Best Hospital in Gujranwala",
  absoluteTitle: true,
  description:
    "Amna Murad Hospital is a trusted private hospital in Satellite Town, Gujranwala led by Dr. Javed Iqbal (MBBS, MD). 24/7 emergency, expert consultants & labs.",
  path: "/about",
  keywords: [
    "about Amna Murad Hospital",
    "trusted hospital Gujranwala",
    "hospital Satellite Town Gujranwala",
    "hospital facilities Gujranwala",
    "qualified doctors Gujranwala",
  ],
});

const leaders = [
  {
    name: "Dr. Javed Iqbal",
    role: "Chief Executive Officer",
    image: "/leader.png",
    description:
      "MBBS (KE), MD (USA) — Dermatologist with 30 years of experience and owner of Amna Murad Hospital.",
  },
  {
    name: "Dr. Amna Murad",
    role: "Medical Director",
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=700&q=68",
    description:
      "Overseeing clinical protocols and ensuring the highest standards of patient safety.",
  },
  {
    name: "Mr. Faisal Shah",
    role: "Head of Operations",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=700&q=68",
    description:
      "Managing day-to-day excellence in hospital logistics and patient support services.",
  },
];

const values = [
  { icon: HeartHandshake, label: "Compassion" },
  { icon: ShieldCheck, label: "Integrity" },
  { icon: Lightbulb, label: "Innovation" },
  { icon: UsersRound, label: "Teamwork" },
];

const facilityImages = [
  {
    src: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1100&q=68",
    alt: "Modern diagnostic laboratory",
    className: "col-span-2 min-h-[300px] md:row-span-2 md:min-h-[430px]",
  },
  {
    src: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=900&q=68",
    alt: "Private patient room",
    className: "col-span-2 min-h-[230px] md:col-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=68",
    alt: "Advanced operating theatre",
    className: "min-h-[190px]",
  },
  {
    src: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=68",
    alt: "Hospital reception area",
    className: "min-h-[190px]",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-[#0b1730]">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About Us", path: "/about" },
        ])}
      />
      <HospitalHeader />

      <PageHero
        eyebrow="Our legacy of care"
        title={
          <>
            Dedicated to Healing,
            <span className="block">Committed to You.</span>
          </>
        }
        description="Since our inception, Amna Murad Hospital has been at the forefront of medical excellence in Gujranwala. We combine state-of-the-art technology with compassionate clinical care to provide a healing environment that prioritizes patient well-being above all."
        media={
          <div className="relative min-h-[560px] overflow-hidden rounded-2xl border border-[#d7e0ea] bg-[#dce8ef] shadow-[0_24px_55px_rgba(21,48,79,0.16)] sm:min-h-[760px] lg:min-h-[880px]">
            <Image
              src="/hospitalExt.png"
              alt="Amna Murad Hospital building"
              fill
              unoptimized
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
          </div>
        }
      >
        <div className="mt-8 grid max-w-[520px] grid-cols-3 gap-3">
          <StatCard value="25+" label="Specialized Departments" />
          <StatCard value="150+" label="Expert Physicians" />
          <StatCard value="24/7" label="Emergency Support" />
        </div>
        <div className="mt-6 max-w-[560px] rounded-2xl bg-[#062a61] p-6 text-white shadow-[0_18px_45px_rgba(6,42,97,0.18)]">
          <h2 className="text-lg font-extrabold">
            Complete Care in Gujranwala
          </h2>
          <p className="mt-3 text-sm leading-6 text-white/75">
            From emergency support and specialist consultations to laboratory,
            diagnostic, surgical, and rehabilitation services, our hospital is
            designed to keep essential care close to your family.
          </p>
          <div className="mt-5 grid gap-3 text-xs font-semibold text-white/85 sm:grid-cols-2">
            {[
              "24/7 emergency response",
              "Experienced consultants",
              "Modern diagnostics",
              "Patient-centered care",
            ].map((item) => (
              <span key={item} className="rounded-lg bg-white/10 px-3 py-2">
                {item}
              </span>
            ))}
          </div>
        </div>
      </PageHero>

      <section className="bg-[#f1f4ff] px-5 py-16 md:px-8 md:py-20">
        <Reveal className="mx-auto max-w-[1120px]">
          <div className="text-center">
            <h2 className="text-2xl font-extrabold tracking-[-0.03em]">
              Our Core Purpose
            </h2>
            <span className="mx-auto mt-4 block h-0.5 w-16 bg-[#15243a]" />
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <Card className="rounded-xl p-2">
              <CardHeader>
                <span className="grid size-9 place-items-center rounded-lg bg-[#edf2fb] text-[#1c4f84]">
                  <Stethoscope size={17} />
                </span>
                <CardTitle className="mt-3 text-base">Our Mission</CardTitle>
                <CardDescription className="leading-6">
                  To deliver world-class, accessible healthcare services through
                  continuous innovation, ethical practices, and a
                  patient-centric approach. We strive to improve the health and
                  well-being of the communities we serve.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="rounded-xl border-[#0b438c] bg-[#073b77] p-2 text-white">
              <CardHeader>
                <span className="grid size-9 place-items-center rounded-lg bg-white/10 text-white">
                  <Award size={17} />
                </span>
                <CardTitle className="mt-3 text-base text-white">
                  Our Vision
                </CardTitle>
                <CardDescription className="leading-6 text-white/75">
                  To be the premier regional center of medical excellence,
                  recognized for transforming healthcare delivery through
                  technology and empathy.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
            {values.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center justify-center gap-3 rounded-lg border border-[#e0e6f0] bg-white px-4 py-4 text-xs font-bold text-[#26354a]"
              >
                <Icon size={16} className="text-[#174f86]" />
                {label}
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-[1180px]">
          <Reveal>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#54708e]">
              Leadership
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.035em]">
              Guided by Experience
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#758196]">
              Our leadership team brings together decades of clinical and
              administrative expertise to ensure Amna Murad Hospital remains a
              leader in healthcare innovation.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {leaders.map((leader, index) => (
              <Reveal key={leader.name} delay={index * 80}>
                <LeadershipCard {...leader} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#243247] px-5 py-16 text-white md:px-8 md:py-20">
        <Reveal className="mx-auto max-w-[1180px]">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-[-0.035em]">
              World-Class Facilities
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-white/65">
              Explore our state-of-the-art medical infrastructure designed for
              precision, comfort, and rapid recovery.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 overflow-hidden rounded-xl md:grid-cols-4">
            {facilityImages.map((facility) => (
              <FacilityTile key={facility.alt} {...facility} />
            ))}
          </div>

          <div className="relative -mt-2 rounded-b-2xl rounded-t-xl bg-[#063a76] px-6 py-10 text-center sm:px-10">
            <h2 className="text-2xl font-extrabold">
              Ready to Experience Better Care?
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-white/70">
              Our team of specialists is ready to provide you with the
              personalized medical attention you deserve.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link
                href="/doctors"
                className="rounded-full bg-white px-6 py-3 text-xs font-extrabold text-[#0a315f]"
              >
                Book an Appointment
              </Link>
              <a
                href="tel:+923006409917"
                className="rounded-full border border-white px-6 py-3 text-xs font-extrabold text-white"
              >
                Emergency: 03006409917
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      <HospitalFooter />
    </main>
  );
}
