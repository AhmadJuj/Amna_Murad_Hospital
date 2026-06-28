import { Departments } from "@/app/ui/home-sections";
import { InnerPage } from "@/app/ui/inner-page";

export const metadata = {
  title: "Departments | Amna Murad Hospital",
  description:
    "Explore specialist medical departments and clinical services at Amna Murad Hospital.",
};

export default function DepartmentsPage() {
  return (
    <InnerPage
      eyebrow="Centers of excellence"
      title="Specialized Medical Departments"
      description="Coordinated care across major medical disciplines, supported by modern diagnostics and experienced consultants."
    >
      <section className="mx-auto max-w-[1180px] px-5 py-14 md:px-8 md:py-20">
        <Departments />
      </section>
    </InnerPage>
  );
}
