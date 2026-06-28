import {
  Activity,
  Dna,
  Droplets,
  FlaskConical,
  HeartPulse,
  Microscope,
  ScanLine,
  ShieldCheck,
} from "lucide-react";
import { InnerPage } from "@/app/ui/inner-page";
import {
  ServiceCatalogCard,
  StatCard,
} from "@/app/ui/page-components";
import { Reveal } from "@/app/ui/reveal";

export const metadata = {
  title: "Diagnostic Reports | Amna Murad Hospital",
  description:
    "Explore laboratory and diagnostic report types available at Amna Murad Hospital.",
};

const reportCategories = [
  {
    icon: Droplets,
    title: "Hematology",
    description:
      "Blood cell evaluation for infection, anemia, inflammation, and general health screening.",
    testCount: "8+ tests",
    examples: ["Complete Blood Count", "Hemoglobin", "ESR"],
  },
  {
    icon: FlaskConical,
    title: "Clinical Biochemistry",
    description:
      "Organ function, blood chemistry, metabolism, and routine wellness testing.",
    testCount: "15+ tests",
    examples: ["Liver Function Tests", "Kidney Function Tests", "Lipid Profile"],
  },
  {
    icon: Activity,
    title: "Diabetes Screening",
    description:
      "Blood glucose monitoring and long-term diabetes assessment for adults and children.",
    testCount: "5+ tests",
    examples: ["Fasting Blood Sugar", "Random Blood Sugar", "HbA1c"],
  },
  {
    icon: Dna,
    title: "Hormones & Endocrinology",
    description:
      "Hormonal investigations supporting thyroid, fertility, and metabolic care.",
    testCount: "10+ tests",
    examples: ["Thyroid Profile", "Vitamin D", "Reproductive Hormones"],
  },
  {
    icon: Microscope,
    title: "Microbiology",
    description:
      "Identification of bacterial and fungal infections with treatment guidance.",
    testCount: "6+ tests",
    examples: ["Blood Culture", "Urine Culture", "Culture & Sensitivity"],
  },
  {
    icon: ShieldCheck,
    title: "Serology & Immunology",
    description:
      "Screening for infectious diseases, immunity, and inflammatory conditions.",
    testCount: "10+ tests",
    examples: ["Hepatitis Screening", "Dengue Test", "CRP"],
  },
  {
    icon: HeartPulse,
    title: "Cardiac Diagnostics",
    description:
      "Urgent and routine investigations supporting heart disease diagnosis and monitoring.",
    testCount: "5+ reports",
    examples: ["Troponin", "CK-MB", "ECG Report"],
  },
  {
    icon: ScanLine,
    title: "Radiology & Imaging",
    description:
      "Imaging reports interpreted by qualified radiology professionals.",
    testCount: "6+ reports",
    examples: ["Digital X-Ray", "Ultrasound", "CT Scan"],
  },
];

export default function LabReportsPage() {
  return (
    <InnerPage
      eyebrow="Diagnostics at AMH"
      title="Laboratory & Diagnostic Reports"
      description="Explore the different categories of tests and diagnostic reports available at Amna Murad Hospital. Availability may vary by consultant request and clinical need."
    >
      <section className="mx-auto max-w-[1180px] px-5 py-14 md:px-8 md:py-20">
        <Reveal className="grid gap-3 sm:grid-cols-3">
          <StatCard value="8" label="Diagnostic Categories" />
          <StatCard value="65+" label="Available Tests & Reports" />
          <StatCard value="24/7" label="Emergency Laboratory Support" />
        </Reveal>

        <Reveal className="mt-10 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#1b5b9c]">
              Available services
            </p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-[-0.03em] text-[#17243a]">
              Report and Test Categories
            </h2>
          </div>
          <p className="max-w-md text-xs leading-5 text-[#7a8698]">
            Contact the laboratory for preparation requirements, sample timing,
            and report delivery estimates.
          </p>
        </Reveal>

        <Reveal className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {reportCategories.map((category) => (
            <ServiceCatalogCard key={category.title} {...category} />
          ))}
        </Reveal>

        <Reveal className="mt-10 rounded-2xl bg-[#0b3d78] px-6 py-8 text-white sm:flex sm:items-center sm:justify-between sm:gap-8 sm:px-9">
          <div>
            <h2 className="text-xl font-extrabold">
              Need a specific diagnostic test?
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/70">
              Call our laboratory desk to confirm availability, fasting
              requirements, sample collection hours, and expected turnaround.
            </p>
          </div>
          <a
            href="tel:+923006409917"
            className="mt-5 inline-flex shrink-0 rounded-lg bg-white px-6 py-3 text-sm font-extrabold text-[#0b3d78] sm:mt-0"
          >
            Call 03006409917
          </a>
        </Reveal>
      </section>
    </InnerPage>
  );
}
