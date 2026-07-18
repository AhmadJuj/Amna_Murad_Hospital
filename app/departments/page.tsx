import { Departments } from "@/app/ui/home-sections";
import { InnerPage } from "@/app/ui/inner-page";
import { JsonLd } from "@/app/ui/json-ld";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/structured-data";

export const metadata = buildMetadata({
  title: "Hospital Departments in Gujranwala | Amna Murad Hospital",
  absoluteTitle: true,
  description:
    "Explore departments at Amna Murad Hospital Gujranwala: gynecology, pediatrics, neuro physician, dietitian, psychology, surgery, dental & physiotherapy.",
  path: "/departments",
  keywords: [
    "gynecologist in Gujranwala",
    "dermatologist in Gujranwala",
    "general surgeon in Gujranwala",
    "dentist in Gujranwala",
    "physiotherapist in Gujranwala",
    "chiropractor in Gujranwala",
    "skin specialist Gujranwala",
    "lady doctor Gujranwala",
    "medical specialist Gujranwala",
    "clinical psychologist Gujranwala",
    "pediatrician in Gujranwala",
    "neuro physician Gujranwala",
    "nutritionist in Gujranwala",
    "dietitian in Gujranwala",
  ],
});

export default function DepartmentsPage() {
  return (
    <InnerPage
      eyebrow="Centers of excellence"
      title="Specialized Medical Departments"
      description="Coordinated care across major medical disciplines, supported by modern diagnostics and experienced consultants."
    >
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Departments", path: "/departments" },
        ])}
      />
      <section className="mx-auto max-w-[1180px] px-5 py-14 md:px-8 md:py-20">
        <Departments />
      </section>
    </InnerPage>
  );
}
