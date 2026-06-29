import Link from "next/link";
import {
  Clock3,
  ExternalLink,
  Mail,
  MapPin,
  Phone,
  Send,
  Siren,
} from "lucide-react";
import { HospitalFooter, HospitalHeader } from "@/app/ui/home-sections";
import {
  ContactInfoItem,
  FormField,
  PageHero,
} from "@/app/ui/page-components";
import { Reveal } from "@/app/ui/reveal";

export const metadata = {
  title: "Contact Us | Amna Murad Hospital",
  description:
    "Contact Amna Murad Hospital in Gujranwala for appointments, directions, and emergency support.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#f7f8ff] text-[#0b1730]">
      <HospitalHeader />

      <PageHero
        eyebrow="Contact our team"
        title={
          <>
            Get in Touch with Our
            <span className="block text-[#0b315f]">Medical Experts</span>
          </>
        }
        description="We are here to assist you with appointments, medical inquiries, and support. Our facility in Gujranwala is open for your care."
        className="bg-white"
      />

      <section className="mx-auto grid max-w-[1180px] gap-6 px-5 py-12 md:px-8 lg:grid-cols-[330px_1fr] lg:py-16">
        <Reveal direction="left" className="h-fit rounded-xl border border-[#cbd9ef] bg-[#dfe9ff] p-6">
          <h2 className="text-xl font-extrabold">Contact Details</h2>
          <div className="mt-7 space-y-7">
            <ContactInfoItem
              icon={MapPin}
              label="Our location"
              value="3-D Satellite Town, Dastgir Road, Gujranwala, Pakistan"
            />
            <ContactInfoItem
              icon={Phone}
              label="Phone & support"
              value="03006409917"
              extra="WhatsApp Live Support"
            />
            <ContactInfoItem
              icon={Clock3}
              label="Hospital hours"
              value="Emergency — 24/7"
              extra="OPD & Labs: 08:00 AM - 10:00 PM"
            />
            <ContactInfoItem
              icon={Mail}
              label="Email"
              value="info@amnamuradhospital.com"
            />
          </div>
          <a
            href="tel:+923006409917"
            className="mt-8 flex items-center gap-3 rounded-lg bg-[#071f43] p-4 text-white"
          >
            <span className="grid size-9 place-items-center rounded-full border border-white/30">
              <Siren size={17} />
            </span>
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-white/60">
                Emergency hotlines
              </p>
              <p className="mt-0.5 text-lg font-extrabold">03006409917</p>
            </div>
          </a>
        </Reveal>

        <Reveal direction="right" delay={100}>
        <form className="rounded-xl border border-[#e0e6ee] bg-white p-6 shadow-[0_16px_45px_rgba(29,50,78,0.1)] sm:p-9">
          <h2 className="text-2xl font-extrabold">Send us an Inquiry</h2>
          <p className="mt-3 text-sm leading-6 text-[#748095]">
            Fill out the form below and our medical administration team will
            contact you within 24 hours.
          </p>
          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            <FormField label="Full Name" placeholder="John Doe" />
            <FormField
              label="Email Address"
              placeholder="john@example.com"
              type="email"
            />
          </div>
          <label className="mt-5 block text-[11px] font-bold text-[#435169]">
            Subject
            <select className="mt-2 h-12 w-full rounded-lg border border-[#d3dce8] bg-[#fbfcfe] px-3 text-sm font-normal text-[#536176] outline-none focus:border-[#0b438c]">
              <option>Appointment Inquiry</option>
              <option>Lab Reports</option>
              <option>Medical Services</option>
              <option>General Information</option>
            </select>
          </label>
          <label className="mt-5 block text-[11px] font-bold text-[#435169]">
            Your Message
            <textarea
              rows={6}
              placeholder="Please describe how we can assist you..."
              className="mt-2 w-full resize-none rounded-lg border border-[#d3dce8] bg-[#fbfcfe] p-3 text-sm font-normal outline-none placeholder:text-[#9ca7b5] focus:border-[#0b438c]"
            />
          </label>
          <button
            type="submit"
            className="mt-6 inline-flex items-center gap-3 rounded-lg bg-[#082c5f] px-7 py-3.5 text-sm font-extrabold text-white shadow-[0_8px_20px_rgba(8,44,95,0.18)]"
          >
            Send Inquiry <Send size={15} />
          </button>
        </form>
        </Reveal>
      </section>

      <section className="bg-white px-5 py-14 md:px-8 md:py-20">
        <Reveal className="mx-auto max-w-[1180px]">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl font-extrabold tracking-[-0.035em]">
                Find Our Hospital
              </h2>
              <p className="mt-2 text-sm text-[#758196]">
                Conveniently located in the heart of Gujranwala.
              </p>
            </div>
            <a
              href="https://www.google.com/maps/place/Amna+Murad+Hospital/@32.1685535,74.2000078,17z/data=!3m1!4b1!4m6!3m5!1s0x391f29b84928b69f:0x4730ffceada2420b!8m2!3d32.1685535!4d74.2000078!16s%2Fg%2F11rtl_dgpz"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-xs font-extrabold text-[#173f70]"
            >
              Open in Google Maps <ExternalLink size={14} />
            </a>
          </div>
          <div className="mt-7 overflow-hidden rounded-xl border border-[#cfd9e5] bg-[#dce8ef] shadow-[0_18px_45px_rgba(30,55,85,0.12)]">
            <iframe
              title="Amna Murad Hospital location map"
              src="https://www.google.com/maps?q=32.1685535,74.2000078&z=17&output=embed"
              loading="lazy"
              className="h-[420px] w-full border-0"
            />
          </div>
        </Reveal>
      </section>

      <section className="bg-[#dfe9ff] px-5 py-16 text-center md:px-8 md:py-20">
        <Reveal>
        <h2 className="text-3xl font-extrabold tracking-[-0.035em]">
          Ready to schedule your visit?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#607087]">
          Our doctors are available for consultations. Booking an appointment
          is fast, easy, and secure.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link
            href="/doctors"
            className="rounded-lg bg-[#082c5f] px-6 py-3 text-sm font-extrabold text-white shadow-sm"
          >
            Book Online Now
          </Link>
          <Link
            href="/doctors"
            className="rounded-lg border border-[#1b3454] bg-white/30 px-6 py-3 text-sm font-extrabold text-[#14253e]"
          >
            View Doctor List
          </Link>
        </div>
        </Reveal>
      </section>

      <HospitalFooter />
    </main>
  );
}
