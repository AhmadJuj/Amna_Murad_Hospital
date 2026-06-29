import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Activity,
  Ambulance,
  ArrowUpRight,
  Bone,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  HeartPulse,
  MapPin,
  Phone,
  Quote,
  Scissors,
  Smile,
  Sparkles,
  Stethoscope,
  TestTubeDiagonal,
} from "lucide-react";
import { MobileNav } from "./mobile-nav";
import { DesktopNav } from "./desktop-nav";
import { Reveal } from "./reveal";
import {
  doctorPortraits,
  doctors as doctorDirectory,
  type Doctor,
} from "@/data/doctors";
import {
  emergencyPhoneDisplay,
  emergencyPhoneHref,
  hospitalPhoneDisplay,
  hospitalPhoneHref,
  whatsappHref,
} from "@/lib/contact";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  centered?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
}: SectionHeadingProps) {
  return (
    <div className={centered ? "mx-auto max-w-2xl text-center" : ""}>
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#2463a5]">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-[1.75rem] font-extrabold tracking-[-0.03em] text-[#111c31] sm:text-3xl md:text-4xl">
        {title}
      </h2>
      <p className="mt-3 text-sm text-[#7a8598]">{description}</p>
    </div>
  );
}

export function HospitalHeader() {
  return (
    <div className="sticky top-0 z-50">
      <div className="bg-[#062a61] text-white">
        <div className="mx-auto flex min-h-9 max-w-[1180px] items-center justify-center gap-4 px-5 py-1.5 text-[9px] min-[420px]:justify-between min-[420px]:text-[10px] md:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 min-[420px]:justify-start">
            <a
              href={hospitalPhoneHref}
              className="flex items-center gap-1.5 transition hover:text-[#b9dcff]"
            >
              <Phone size={11} />
              {hospitalPhoneDisplay}
            </a>
            <a
              href={emergencyPhoneHref}
              className="flex items-center gap-1.5 transition hover:text-[#b9dcff]"
            >
              <Ambulance size={12} />
              Emergency: {emergencyPhoneDisplay}
            </a>
          </div>
          <div className="hidden items-center gap-4 sm:flex">
            <span>Gujranwala, Pakistan</span>
            <span className="font-bold">f</span>
            <span className="font-bold">◎</span>
            <span className="font-bold">in</span>
          </div>
        </div>
      </div>
      <header className="border-b border-[#e8edf4] bg-white">
        <div className="relative mx-auto flex min-h-[72px] max-w-[1180px] items-center justify-between gap-3 px-4 sm:min-h-20 sm:gap-6 sm:px-5 md:px-8">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.jpeg"
              alt="Amna Murad Hospital logo"
              width={54}
              height={54}
              className="size-[52px] rounded-full object-cover"
              priority
            />
            <div>
              <p className="text-[13px] font-extrabold tracking-[0.04em] text-[#0a2e67] sm:text-[15px]">
                AMNA MURAD
              </p>
              <p className="text-[10px] font-semibold tracking-[0.2em] text-[#617089]">
                HOSPITAL
              </p>
            </div>
          </Link>
          <DesktopNav />
          <a
            href={whatsappHref()}
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-md bg-[#082c69] px-5 py-3 text-xs font-bold text-white shadow-sm sm:inline-flex"
          >
            Book Appointment
          </a>
          <MobileNav />
        </div>
      </header>
    </div>
  );
}

const actions = [
  {
    icon: CalendarDays,
    title: "Find Doctors",
    description: "Book a visit with experts",
    className: "bg-[#0b1730]",
    href: "/doctors",
  },
  {
    icon: TestTubeDiagonal,
    title: "Diagnostic Services",
    description: "Explore tests and reports",
    className: "bg-[#2f4059]",
    href: "/lab-reports",
  },
  {
    icon: MapPin,
    title: "Our Locations",
    description: "Find your nearest center",
    className: "bg-[#101f39]",
    href: "/contact",
  },
  {
    icon: Ambulance,
    title: "Emergency 24/7",
    description: "Immediate care available",
    className: "bg-[#eb164e]",
    href: hospitalPhoneHref,
  },
];

export function ActionStrip() {
  return (
    <section className="relative z-10 mx-auto -mt-1 max-w-[1180px] px-5 md:px-8">
      <div className="grid grid-cols-2 overflow-hidden rounded-xl shadow-[0_18px_44px_rgba(15,38,68,0.18)] lg:grid-cols-4">
        {actions.map(({ icon: Icon, title, description, className, href }, index) => (
          <Reveal key={title} delay={index * 90} className="h-full">
            {href.startsWith("/") ? (
              <Link
                href={href}
                className={`${className} group flex h-full min-h-28 flex-col items-start justify-center gap-2 border-white/10 px-4 text-white transition duration-300 hover:-translate-y-1 min-[480px]:flex-row min-[480px]:items-center min-[480px]:gap-4 min-[480px]:px-6 lg:border-r`}
              >
                <Icon size={24} className="transition-transform duration-300 group-hover:scale-110" />
                <div>
                  <p className="text-sm font-bold">{title}</p>
                  <p className="mt-1 text-[10px] text-white/68">{description}</p>
                </div>
              </Link>
            ) : (
              <a
                href={href}
                className={`${className} group flex h-full min-h-28 flex-col items-start justify-center gap-2 border-white/10 px-4 text-white transition duration-300 hover:-translate-y-1 min-[480px]:flex-row min-[480px]:items-center min-[480px]:gap-4 min-[480px]:px-6 lg:border-r`}
              >
                <Icon size={24} className="transition-transform duration-300 group-hover:scale-110" />
                <div>
                  <p className="text-sm font-bold">{title}</p>
                  <p className="mt-1 text-[10px] text-white/68">{description}</p>
                </div>
              </a>
            )}
          </Reveal>
        ))}
      </div>
    </section>
  );
}

const departments = [
  {
    slug: "dermatology",
    icon: Sparkles,
    title: "Dermatology",
    description:
      "Specialist diagnosis and treatment for skin, hair, nail, and cosmetic concerns.",
    color: "text-[#8a286f]",
    bg: "bg-[#f9eaf5]",
    accent: "bg-[#b2378d]",
    services: ["Clinical dermatology", "Skin and hair care"],
  },
  {
    slug: "gynecology",
    icon: HeartPulse,
    title: "Gynecology",
    description:
      "Compassionate women’s healthcare, pregnancy care, and reproductive medicine.",
    color: "text-[#b12f62]",
    bg: "bg-[#fcecf3]",
    accent: "bg-[#d4477d]",
    services: ["Women’s health", "Pregnancy and fertility"],
  },
  {
    slug: "medical-specialist",
    icon: Stethoscope,
    title: "Medical Specialist",
    description:
      "Comprehensive assessment and management of adult medical conditions.",
    color: "text-[#175c87]",
    bg: "bg-[#e9f4fa]",
    accent: "bg-[#2479a8]",
    services: ["Medical consultation", "Chronic disease care"],
  },
  {
    slug: "general-surgery",
    icon: Scissors,
    title: "General Surgery",
    description:
      "Experienced surgical care for general, breast, and emergency conditions.",
    color: "text-[#875126]",
    bg: "bg-[#faf1e8]",
    accent: "bg-[#ae6b32]",
    services: ["General procedures", "Breast and emergency surgery"],
  },
  {
    slug: "physiotherapy",
    icon: Activity,
    title: "Physiotherapy",
    description:
      "Evidence-based rehabilitation for mobility, pain, and sports-related injuries.",
    color: "text-[#176c63]",
    bg: "bg-[#e9f6f3]",
    accent: "bg-[#238c80]",
    services: ["Physical rehabilitation", "Pain management"],
  },
  {
    slug: "chiropractor-physiotherapist",
    icon: Bone,
    title: "Chiropractor / Physiotherapist",
    description:
      "Focused treatment for spinal disorders, posture, joints, and musculoskeletal pain.",
    color: "text-[#314f88]",
    bg: "bg-[#edf1fa]",
    accent: "bg-[#4568a6]",
    services: ["Spinal care", "Orthopedic rehabilitation"],
  },
  {
    slug: "dental-care",
    icon: Smile,
    title: "Dental Care",
    description:
      "Preventive, restorative, pediatric, and aesthetic dental care for every age.",
    color: "text-[#0b4b8a]",
    bg: "bg-[#e9f2fb]",
    accent: "bg-[#0b4b8a]",
    services: ["Preventive dentistry", "Adult and pediatric care"],
  },
];

export function Departments() {
  return (
    <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {departments.map(
        (
          {
            slug,
            icon: Icon,
            title,
            description,
            color,
            bg,
            accent,
            services,
          },
          index,
        ) => (
        <Reveal key={title} delay={index * 100} className="h-full">
          <Card
            id={slug}
            className="group relative h-full min-h-[360px] scroll-mt-28 overflow-hidden rounded-[18px] transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-[#b9c9dc]"
          >
            <div className={`relative h-28 overflow-hidden ${bg}`}>
              <span className={`absolute inset-x-0 top-0 h-1 ${accent}`} />
              <span className="absolute -right-10 -top-12 size-32 rounded-full border border-current opacity-[0.08]" />
              <span className="absolute -bottom-16 left-8 size-28 rounded-full border border-current opacity-[0.06]" />
              <span className={`absolute left-5 top-5 text-[9px] font-extrabold uppercase tracking-[0.18em] ${color}`}>
                0{index + 1}
              </span>
              <div
                className={`absolute bottom-4 right-5 grid size-14 place-items-center rounded-full border border-white/80 bg-white shadow-sm transition-transform duration-300 group-hover:-translate-y-1 ${color}`}
              >
                <Icon size={25} strokeWidth={1.7} />
              </div>
            </div>

            <CardHeader className="relative pt-6">
              <CardTitle>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>

            <CardContent className="relative mt-6 space-y-2.5 border-t border-[#edf1f5] pt-5">
              {services.map((service) => (
                <div
                  key={service}
                  className="flex items-center gap-2.5 text-[11px] font-semibold text-[#4d5b70]"
                >
                  <span
                    className={`grid size-5 place-items-center rounded-full ${bg} ${color}`}
                  >
                    <Check size={11} strokeWidth={3} />
                  </span>
                  {service}
                </div>
              ))}
            </CardContent>

            <CardFooter className="relative pt-7">
              <Link
                href="/departments"
                className="flex w-full items-center justify-between text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#173e70]"
              >
                Explore department
                <span className="grid size-8 place-items-center rounded-full border border-[#dce5ef] transition duration-300 group-hover:border-[#173e70] group-hover:bg-[#173e70] group-hover:text-white">
                  <ArrowUpRight size={14} />
                </span>
              </Link>
            </CardFooter>
          </Card>
        </Reveal>
        ),
      )}
    </div>
  );
}

const featuredDoctors = doctorDirectory.slice(0, 3);

function formatVisitingDays(doctor: Doctor) {
  const firstDay = doctor.visitingDays.at(0);
  const lastDay = doctor.visitingDays.at(-1);

  if (!firstDay || !lastDay) {
    return "By appointment";
  }

  if (firstDay === lastDay) {
    return firstDay.slice(0, 3);
  }

  return `${firstDay.slice(0, 3)} - ${lastDay.slice(0, 3)}`;
}

function doctorAppointmentLink(doctor: Doctor) {
  const message = `Hello Amna Murad Hospital, I would like to book an appointment with ${doctor.name} (${doctor.department}).`;
  return whatsappHref(message);
}

export function Consultants() {
  return (
    <>
      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {featuredDoctors.map((doctor, index) => (
          <Reveal key={doctor.name} delay={index * 120}>
            <article className="group text-center">
              <Link
                href={`/doctors/${doctor.id}`}
                className="image-frame relative mx-auto block aspect-[1.05] w-full max-w-[290px] overflow-hidden rounded-xl bg-[#0d263c] shadow-[0_18px_40px_rgba(19,44,68,0.13)]"
              >
                <Image
                  src={doctorPortraits[doctor.id]}
                  alt={doctor.name}
                  fill
                  loading="lazy"
                  unoptimized
                  sizes="(max-width: 768px) 290px, 30vw"
                  className="image-soft object-cover object-top"
                />
              </Link>
              <Link
                href={`/doctors/${doctor.id}`}
                className="mt-5 block text-[15px] font-extrabold text-[#182139] transition hover:text-[#0b438c]"
              >
                {doctor.name}
              </Link>
              <p className="mt-1 min-h-8 text-xs font-semibold leading-4 text-[#49749c]">
                {doctor.designation}
              </p>
              <div className="mx-auto mt-5 grid max-w-[320px] grid-cols-2 border-y border-[#e7ebf0] py-3 text-[10px] text-[#7a8798]">
                <span className="flex items-center justify-center gap-1.5">
                  <CalendarDays size={12} /> {formatVisitingDays(doctor)}
                </span>
                <span className="flex items-center justify-center gap-1.5">
                  <Clock3 size={12} /> {doctor.timings}
                </span>
              </div>
              <div className="mx-auto mt-4 grid w-full max-w-[320px] grid-cols-2 gap-2">
                <Link
                  href={`/doctors/${doctor.id}`}
                  className="inline-flex items-center justify-center rounded border border-[#dfe5ed] py-2.5 text-[10px] font-bold text-[#183a65] transition hover:border-[#0b3977]"
                >
                  View Profile
                </Link>
                <a
                  href={doctorAppointmentLink(doctor)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded bg-[#1fa855] py-2.5 text-[10px] font-bold text-white transition hover:bg-[#168946]"
                >
                  Make Appointment
                </a>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
      <div className="mt-10 text-center">
        <Link
          href="/doctors"
          className="inline-flex items-center gap-2 rounded-md border border-[#cbd9e8] px-5 py-3 text-xs font-extrabold uppercase tracking-[0.1em] text-[#173e70] transition hover:border-[#173e70] hover:bg-[#173e70] hover:text-white"
        >
          View all doctors <ArrowUpRight size={15} />
        </Link>
      </div>
    </>
  );
}

export function EmergencyBanner() {
  return (
    <section className="lazy-section relative overflow-hidden bg-[#5d687a]">
      <Image
        src="https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=1600&q=70"
        alt=""
        fill
        loading="lazy"
        unoptimized
        sizes="100vw"
        className="object-cover object-center opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#364458]/85 via-[#284158]/80 to-[#0a334c]/80" />
      <div className="relative mx-auto flex min-h-[380px] max-w-[1180px] items-center px-4 py-12 sm:min-h-[420px] sm:px-5 sm:py-14 md:px-8">
        <Reveal direction="left" className="max-w-[540px] rounded-2xl border border-white/16 bg-[#17415a]/80 p-6 text-white shadow-2xl backdrop-blur-sm sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9ccce7]">
            Rapid response team
          </p>
          <h2 className="mt-3 text-[1.75rem] font-extrabold sm:text-3xl">In Case of Emergency</h2>
          <p className="mt-4 text-sm leading-6 text-white/80">
            Our trauma and emergency center is open 24 hours a day, 7 days a
            week, providing immediate critical care for all medical situations.
          </p>
          <a
            href={hospitalPhoneHref}
            className="mt-7 flex items-center gap-4 rounded-xl transition hover:bg-white/5"
          >
            <span className="grid size-12 place-items-center rounded-xl bg-[#ec2558]">
              <Phone size={22} />
            </span>
            <div>
              <p className="text-[10px] font-semibold uppercase text-white/60">
                Emergency hotline
              </p>
              <p className="text-xl font-extrabold">{hospitalPhoneDisplay}</p>
            </div>
          </a>
        </Reveal>
      </div>
    </section>
  );
}

const news = [
  {
    date: "March 2026",
    title: "New MRI Facility Inaugurated",
    text: "Enhanced diagnostics capabilities are now available for better imaging results.",
  },
  {
    date: "February 2026",
    title: "Free Health Screening Camp",
    text: "Annual community health awareness program successfully completed.",
  },
  {
    date: "January 2026",
    title: "Advanced Laparoscopic Training",
    text: "Our surgical team attends international symposium on modern access.",
  },
];

export function NewsAndTestimonials() {
  return (
    <section
      id="news"
      className="lazy-section scroll-mt-28 bg-[#f7f9fc] py-14 sm:py-20"
    >
      <div className="mx-auto grid max-w-[1120px] gap-10 px-4 sm:px-5 md:px-8 lg:grid-cols-[1fr_0.86fr]">
        <Reveal direction="left">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#235e9c]">
            Latest hospital news
          </p>
          <div className="mt-6 space-y-4">
            {news.map((item) => (
              <article
                key={item.title}
                className="grid gap-4 rounded-xl bg-white p-4 shadow-[0_10px_30px_rgba(31,54,81,0.06)] min-[480px]:grid-cols-[100px_1fr] min-[480px]:gap-5"
              >
                <div className="grid min-h-20 place-items-center rounded-lg bg-[#f0f5fb] text-[#a8b4c3]">
                  <CalendarDays size={28} />
                </div>
                <div className="self-center">
                  <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#9aa6b6]">
                    {item.date}
                  </p>
                  <h3 className="mt-1 text-sm font-extrabold text-[#1a2437]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[11px] leading-5 text-[#8a94a4]">
                    {item.text}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </Reveal>

        <Reveal direction="right" delay={120} className="relative overflow-hidden rounded-[22px] bg-[#06367a] p-6 text-white shadow-[0_22px_55px_rgba(12,49,94,0.16)] sm:rounded-[28px] sm:p-8 md:p-10">
          <Quote className="absolute right-8 top-7 text-white/12" size={68} />
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#8bc0ff]">
            What our patients say
          </p>
          <blockquote className="relative mt-7 text-[13px] italic leading-6 text-white/86">
            “The medical staff at Amna Murad Hospital were incredibly
            professional and caring during my stay. The facilities are
            top-notch and the attention to detail is remarkable.”
          </blockquote>
          <p className="mt-4 text-xs font-bold">— Mrs. Farzana Shah</p>
          <div className="my-7 h-px bg-white/14" />
          <blockquote className="text-[13px] italic leading-6 text-white/86">
            “Best surgical experience I have had. The laparoscopic procedure
            was smooth and the recovery was much faster than I expected.”
          </blockquote>
          <p className="mt-4 text-xs font-bold">— Mr. Ahmed Ali</p>
          <div className="mt-8 flex gap-2">
            <button
              type="button"
              aria-label="Previous testimonial"
              className="grid size-8 place-items-center rounded-full border border-white/20"
            >
              <ChevronLeft size={15} />
            </button>
            <button
              type="button"
              aria-label="Next testimonial"
              className="grid size-8 place-items-center rounded-full bg-white text-[#0a3b7b]"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function HospitalFooter() {
  return (
    <footer id="contact" className="bg-[#09152d] text-[#aebbd0]">
      <div className="mx-auto grid max-w-[1180px] grid-cols-2 gap-x-6 gap-y-10 px-5 py-12 md:grid-cols-[1.4fr_0.8fr_0.8fr_1fr] md:px-8 md:py-14">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.jpeg"
              alt="Amna Murad Hospital"
              width={48}
              height={48}
              className="size-12 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-extrabold tracking-[0.04em] text-white">
                AMNA MURAD
              </p>
              <p className="text-[9px] font-semibold tracking-[0.2em]">
                HOSPITAL
              </p>
            </div>
          </div>
          <p className="mt-5 max-w-[310px] text-xs leading-5">
            Amna Murad Hospital is a state-of-the-art medical facility in
            Gujranwala, providing high-quality healthcare services to our
            community.
          </p>
          <div className="mt-5 flex gap-3">
            {["f", "◎", "in"].map((label) => (
              <span
                key={label}
                className="grid size-8 place-items-center rounded-full bg-white/8 text-[11px] font-bold text-white"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
        <FooterColumn
          title="Departments"
          links={[
            { label: "Dermatology", href: "/departments#dermatology" },
            { label: "Gynecology", href: "/departments#gynecology" },
            {
              label: "Medical Specialist",
              href: "/departments#medical-specialist",
            },
            { label: "General Surgery", href: "/departments#general-surgery" },
            { label: "Physiotherapy", href: "/departments#physiotherapy" },
            {
              label: "Chiropractor / Physiotherapist",
              href: "/departments#chiropractor-physiotherapist",
            },
            { label: "Dental Care", href: "/departments#dental-care" },
          ]}
        />
        <FooterColumn
          title="Quick Links"
          links={[
            { label: "About Us", href: "/about" },
            { label: "Our Doctors", href: "/doctors" },
            { label: "Latest News", href: "/#news" },
            { label: "Diagnostic Services", href: "/lab-reports" },
            { label: "Contact Support", href: "/contact" },
          ]}
        />
        <div className="col-span-2 sm:col-span-1">
          <h3 className="text-xs font-bold uppercase tracking-[0.12em] text-white">
            Opening Hours
          </h3>
          <div className="mt-5 space-y-3 text-xs">
            <p className="flex justify-between gap-4">
              <span>Mon - Fri</span>
              <strong className="text-white">7:00 AM - 8:00 PM</strong>
            </p>
            <p className="flex justify-between gap-4">
              <span>Saturday</span>
              <strong className="text-white">9:00 AM - 6:00 PM</strong>
            </p>
            <p className="flex justify-between gap-4">
              <span>Sunday</span>
              <strong className="text-[#ff5c70]">Closed</strong>
            </p>
          </div>
          <a
            href={hospitalPhoneHref}
            className="mt-6 flex items-center gap-3 rounded-lg bg-white/6 p-3 transition hover:bg-white/10"
          >
            <Clock3 size={18} className="text-[#4b9fff]" />
            <span className="text-xs">
              Emergency: <strong className="text-white">24/7 Service</strong>
            </span>
          </a>
        </div>
      </div>
      <div className="border-t border-white/8">
        <div className="mx-auto flex max-w-[1180px] flex-col gap-3 px-5 py-5 text-center text-[10px] sm:flex-row sm:items-center sm:justify-between sm:text-left md:px-8">
          <p>© 2026 Amna Murad Hospital. All Rights Reserved.</p>
          <div className="flex gap-5">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="text-xs font-bold uppercase tracking-[0.12em] text-white">
        {title}
      </h3>
      <ul className="mt-5 space-y-3 text-xs">
        {links.map((link) => (
          <li key={link.label}>
            <Link href={link.href} className="transition hover:text-white">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
