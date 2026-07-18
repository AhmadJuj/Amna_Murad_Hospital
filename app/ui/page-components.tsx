import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type PageHeroProps = {
  eyebrow?: string;
  title: ReactNode;
  description: string;
  children?: ReactNode;
  media?: ReactNode;
  centered?: boolean;
  className?: string;
};

export function PageHero({
  eyebrow,
  title,
  description,
  children,
  media,
  centered = false,
  className = "",
}: PageHeroProps) {
  return (
    <section
      className={`relative overflow-hidden border-b border-[#e3e8f0] bg-[#f7f8ff] ${className}`}
    >
      <div
        className={`relative mx-auto max-w-[1180px] px-5 py-14 md:px-8 md:py-20 ${
          media
            ? "grid items-start gap-10 lg:grid-cols-[0.98fr_1.02fr]"
            : centered
              ? "text-center"
              : ""
        }`}
      >
        <div
          className={`hero-copy ${
            centered ? "mx-auto max-w-[800px]" : "max-w-[650px]"
          }`}
        >
          {eyebrow && (
            <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#55708d]">
              {eyebrow}
            </p>
          )}
          <h1 className="mt-4 text-4xl font-extrabold leading-[1.02] tracking-[-0.04em] text-[#0d1830] sm:text-5xl">
            {title}
          </h1>
          <p
            className={`mt-5 text-sm leading-7 text-[#667388] ${
              centered ? "mx-auto max-w-2xl" : "max-w-[620px]"
            }`}
          >
            {description}
          </p>
          {children}
        </div>
        {media && <div className="hero-visual">{media}</div>}
      </div>
    </section>
  );
}

export function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-[#e2e7f0] bg-white p-4">
      <p className="text-xl font-extrabold text-[#12284a]">{value}</p>
      <p className="mt-1 text-[9px] leading-4 text-[#78859a]">{label}</p>
    </div>
  );
}

type LeadershipCardProps = {
  name: string;
  role: string;
  image: string;
  description: string;
};

export function LeadershipCard({
  name,
  role,
  image,
  description,
}: LeadershipCardProps) {
  return (
    <article>
      <div className="relative min-h-[360px] overflow-hidden rounded-xl bg-[#dce7ee]">
        <Image
          src={image}
          alt={name}
          fill
          unoptimized
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover object-top"
        />
        <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-[#08172e]/80 to-transparent px-5 pb-5 pt-20">
          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-white">
            {role}
          </p>
        </div>
      </div>
      <h3 className="mt-5 text-lg font-extrabold">{name}</h3>
      <p className="mt-2 text-xs leading-5 text-[#758196]">{description}</p>
    </article>
  );
}

export function FacilityTile({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className: string;
}) {
  return (
    <div
      className={`relative overflow-hidden bg-[#152236] ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        unoptimized
        loading="lazy"
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover object-center"
      />
    </div>
  );
}

export function ContactInfoItem({
  icon: Icon,
  label,
  value,
  extra,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  extra?: string;
}) {
  return (
    <div className="flex gap-4">
      <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-[#c8d7f1] text-[#123e70]">
        <Icon size={18} />
      </span>
      <div>
        <p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-[#59677c]">
          {label}
        </p>
        <p className="mt-1 text-sm font-semibold leading-5 text-[#263750]">
          {value}
        </p>
        {extra && (
          <p className="mt-2 text-[11px] font-semibold text-[#53637b]">
            {extra}
          </p>
        )}
      </div>
    </div>
  );
}

export function FormField({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <label className="text-[11px] font-bold text-[#435169]">
      {label}
      <input
        type={type}
        placeholder={placeholder}
        className="mt-2 h-12 w-full rounded-lg border border-[#d3dce8] bg-[#fbfcfe] px-3 text-sm font-normal outline-none placeholder:text-[#9ca7b5] focus:border-[#0b438c]"
      />
    </label>
  );
}

type ServiceCatalogCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  testCount: string;
  examples: string[];
};

export function ServiceCatalogCard({
  icon: Icon,
  title,
  description,
  testCount,
  examples,
}: ServiceCatalogCardProps) {
  return (
    <Card className="h-full rounded-xl transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-[#b9cadc]">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <span className="grid size-11 place-items-center rounded-xl bg-[#eaf3fc] text-[#0d4b88]">
            <Icon size={21} />
          </span>
          <span className="rounded-full bg-[#f0f4f9] px-3 py-1 text-[9px] font-extrabold uppercase tracking-widest text-[#53647a]">
            {testCount}
          </span>
        </div>
        <CardTitle className="mt-4 text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="mt-5 border-t border-[#edf1f5] pb-6 pt-5">
        <p className="text-[9px] font-extrabold uppercase tracking-[0.12em] text-[#8a96a8]">
          Common tests
        </p>
        <ul className="mt-3 space-y-2">
          {examples.map((example) => (
            <li
              key={example}
              className="flex items-center gap-2 text-xs font-semibold text-[#526177]"
            >
              <span className="size-1.5 shrink-0 rounded-full bg-[#0b438c]" />
              {example}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
