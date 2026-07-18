import { DoctorsPageContent } from "@/app/ui/doctors-page-content";
import { HospitalFooter, HospitalHeader } from "@/app/ui/home-sections";
import { JsonLd } from "@/app/ui/json-ld";
import { getDoctors } from "@/lib/doctors-store";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/structured-data";

export const metadata = buildMetadata({
  title: "Best Doctors in Gujranwala | Book Appointment Online",
  absoluteTitle: true,
  description:
    "Find doctors in Gujranwala at Amna Murad Hospital: gynecologist, dermatologist, surgeon, pediatrician, neuro physician, dietitian, dentist & physiotherapist.",
  path: "/doctors",
  keywords: [
    "best doctors in Gujranwala",
    "find a doctor Gujranwala",
    "book doctor appointment online",
    "specialist doctor near me",
    "gynecologist Gujranwala",
    "dermatologist Gujranwala",
    "dental surgeon Gujranwala",
    "physiotherapist Gujranwala",
    "general surgeon Gujranwala",
    "laparoscopic surgeon Gujranwala",
    "clinical dietitian Gujranwala",
    "pediatrician Gujranwala",
    "neuro physician Gujranwala",
    "clinical psychologist Gujranwala",
    "FCPS specialist Gujranwala",
  ],
});

export const dynamic = "force-dynamic";

export default async function DoctorsPage() {
  const doctors = await getDoctors();

  return (
    <main className="min-h-screen bg-[#f6f7ff] text-[#0b1730]">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Doctors", path: "/doctors" },
        ])}
      />
      <HospitalHeader />
      <DoctorsPageContent doctors={doctors} />
      <HospitalFooter />
    </main>
  );
}
