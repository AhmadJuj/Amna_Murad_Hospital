import Image from "next/image";
import Link from "next/link";
import {
  BadgeCheck,
  Check,
  HeartPulse,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import { Reveal } from "./ui/reveal";
import {
  ActionStrip,
  Consultants,
  Departments,
  EmergencyBanner,
  HomeFaq,
  homeFaqItems,
  HospitalFooter,
  HospitalHeader,
  NewsAndTestimonials,
  SectionHeading,
} from "./ui/home-sections";
import { JsonLd } from "./ui/json-ld";
import {
  hospitalPhoneDisplay,
  hospitalPhoneHref,
  whatsappHref,
} from "@/lib/contact";
import { getDoctors } from "@/lib/doctors-store";
import { faqSchema } from "@/lib/structured-data";

const heroRoom =
  "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=78";
const executivePortrait = "/leader.png";

export const dynamic = "force-dynamic";

export default async function Home() {
  const doctors = await getDoctors();

  return (
    <main className="min-h-screen bg-white text-[#0b1730]">
      <JsonLd data={faqSchema(homeFaqItems)} />
      <HospitalHeader />

      <section className="bg-[#f7faff]">
        <div className="mx-auto grid max-w-[1180px] items-center gap-10 px-5 py-10 sm:py-14 md:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:py-20">
          <div className="hero-copy">
            <span className="mb-5 inline-flex rounded-full bg-[#e7f0fb] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#184c82]">
              Personalized health solutions
            </span>
            <h1 className="max-w-[610px] text-[2.45rem] font-extrabold leading-[0.98] tracking-[-0.04em] text-[#07152f] min-[420px]:text-4xl sm:text-5xl lg:text-[66px]">
              Advanced Care with
              <span className="block text-[#0c3881]">a Human Touch</span>
            </h1>
            <p className="mt-6 max-w-[560px] text-[15px] leading-7 text-[#66738a]">
              Amna Murad Hospital is a trusted private hospital in Satellite
              Town, Gujranwala — combining world-class medical expertise, 24/7
              emergency care, and personalized attention to make your journey
              to recovery smooth and comfortable.
            </p>
            <div className="mt-8 grid gap-3 min-[420px]:flex min-[420px]:flex-wrap">
              <Link
                href="/departments"
                className="rounded-md bg-[#062c6f] px-6 py-3 text-sm font-bold text-white shadow-[0_9px_24px_rgba(6,44,111,0.2)] transition hover:-translate-y-0.5 hover:bg-[#0b3a88]"
              >
                Explore Services
              </Link>
              <Link
                href="/about"
                className="rounded-md border border-[#d9e0ea] bg-white px-6 py-3 text-sm font-semibold text-[#1e2b40] transition hover:border-[#0d3b78]"
              >
                Virtual Tour
              </Link>
            </div>
          </div>

          <div className="hero-visual relative">
            <div className="image-frame group relative min-h-[280px] overflow-hidden rounded-[22px] bg-[#dce8ed] shadow-[0_24px_60px_rgba(20,49,77,0.2)] min-[420px]:min-h-[340px] sm:min-h-[455px] sm:rounded-[28px]">
              <Image
                src={heroRoom}
                alt="Modern private patient room at Amna Murad Hospital Gujranwala"
                fill
                priority
                unoptimized
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="image-soft object-cover object-center"
              />
            </div>
            <div className="absolute -bottom-5 left-3 flex max-w-[calc(100%-1.5rem)] items-center gap-3 rounded-xl bg-white px-3 py-3 shadow-[0_18px_45px_rgba(19,52,86,0.18)] min-[420px]:left-5 min-[420px]:px-5 min-[420px]:py-4 sm:-bottom-6 sm:left-10 sm:rounded-2xl">
              <div className="grid size-11 place-items-center rounded-full bg-[#e4f8ee] text-[#129b62]">
                <ShieldCheck size={22} />
              </div>
              <div>
                <p className="text-sm font-bold text-[#18243a]">ISO Certified</p>
                <p className="text-[11px] text-[#8a95a6]">
                  Quality Management System
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ActionStrip />

      <section id="about" className="lazy-section bg-white py-14 sm:py-20">
        <Reveal className="mx-auto grid max-w-[1120px] items-center gap-12 px-5 md:px-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="image-frame group relative min-h-[360px] overflow-hidden rounded-2xl bg-[#dbe8f0] shadow-[0_22px_60px_rgba(10,34,61,0.15)] sm:min-h-[500px]">
            <Image
              src={executivePortrait}
              alt="Dr. Javed Iqbal, CEO and senior consultant at Amna Murad Hospital Gujranwala"
              fill
              loading="lazy"
              unoptimized
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="image-soft object-cover object-center"
            />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#1f5d9d]">
              Leadership in care
            </p>
            <h2 className="mt-3 text-[1.75rem] font-extrabold leading-tight tracking-[-0.03em] text-[#111b2e] sm:text-3xl md:text-4xl">
              The Future of Executive Healthcare in Gujranwala
            </h2>
            <p className="mt-6 text-[15px] leading-7 text-[#6e798d]">
              Amna Murad Hospital was established with a premier intention
              dedicated to medical excellence and patient-centric care. Our
              state-of-the-art facility is equipped with the latest diagnostic
              and therapeutic technologies.
            </p>
            <p className="mt-4 text-[15px] leading-7 text-[#6e798d]">
              We pride ourselves on our team of highly qualified consultants
              who are experts in their respective fields, ensuring every
              patient receives the highest standard of treatment.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                "Advanced Surgical Units",
                "Qualified Nursing Staff",
                "Modern Diagnostic Lab",
                "Emergency Life Support",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-sm font-semibold text-[#3b4658]"
                >
                  <span className="grid size-7 place-items-center rounded bg-[#eaf3ff] text-[#1d5ba0]">
                    <Check size={15} strokeWidth={3} />
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <section id="departments" className="lazy-section bg-[#f6f9fd] py-14 sm:py-20">
        <Reveal className="mx-auto max-w-[1180px] px-5 md:px-8">
          <SectionHeading
            eyebrow="Centers of excellence"
            title="Our Specialized Departments"
            description="Comprehensive care across all major medical disciplines."
          />
          <Departments />
        </Reveal>
      </section>

      <section id="consultants" className="lazy-section bg-white py-14 sm:py-20">
        <Reveal className="mx-auto max-w-[1120px] px-5 md:px-8">
          <SectionHeading
            centered
            eyebrow="Meet the experts"
            title="Expert Consultants"
            description="Meet our team of nationally recognized medical professionals committed to your health."
          />
          <Consultants doctors={doctors} />
        </Reveal>
      </section>

      <EmergencyBanner />
      <NewsAndTestimonials />
      <HomeFaq />

      <section className="lazy-section bg-[#f8fafc] px-4 py-12 sm:px-5 sm:py-16 md:px-8">
        <Reveal className="mx-auto grid max-w-[1120px] items-center gap-8 overflow-hidden rounded-[22px] bg-[#0b1730] px-5 py-8 text-white shadow-[0_24px_70px_rgba(8,24,51,0.16)] sm:rounded-[28px] sm:px-7 sm:py-10 md:grid-cols-[1fr_310px] md:px-14 md:py-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#72b4ff]">
              Your health, our priority
            </p>
            <h2 className="mt-3 max-w-[560px] text-[1.75rem] font-extrabold leading-tight tracking-[-0.03em] sm:text-3xl md:text-4xl">
              Ready to prioritize your health?
            </h2>
            <p className="mt-4 max-w-[560px] text-sm leading-6 text-[#c2cce0]">
              Schedule your consultation today and take the first step towards
              a healthier lifestyle with our executive medical services.
            </p>
            <div className="mt-7 grid gap-5 min-[420px]:flex min-[420px]:flex-wrap min-[420px]:items-center">
              <div>
                <p className="text-[10px] font-semibold uppercase text-[#8fa1be]">
                  Call us now
                </p>
                <a
                  href={hospitalPhoneHref}
                  className="mt-1 block font-bold transition hover:text-[#72b4ff]"
                >
                  {hospitalPhoneDisplay}
                </a>
              </div>
              <a
                href={whatsappHref()}
                target="_blank"
                rel="noreferrer"
                className="rounded-md bg-[#0b4a9f] px-6 py-3 text-sm font-bold transition hover:bg-[#1461c5]"
              >
                Book Online Now
              </a>
            </div>
          </div>
          <div className="relative mx-auto grid size-48 place-items-center rounded-3xl bg-gradient-to-br from-[#18b3ac] to-[#6fe2d6] sm:size-60">
            <div className="grid size-28 place-items-center rounded-full bg-white text-[#0d376f] shadow-xl sm:size-32">
              <Stethoscope size={62} strokeWidth={1.35} />
            </div>
            <BadgeCheck className="absolute right-7 top-7 text-white/70" />
            <HeartPulse className="absolute bottom-8 left-8 text-white/70" />
          </div>
        </Reveal>
      </section>

      <HospitalFooter />
    </main>
  );
}
