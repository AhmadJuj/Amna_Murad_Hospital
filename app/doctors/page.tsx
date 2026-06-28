import { DoctorsPageContent } from "@/app/ui/doctors-page-content";
import { HospitalFooter, HospitalHeader } from "@/app/ui/home-sections";

export const metadata = {
  title: "Find a Doctor | Amna Murad Hospital",
  description:
    "Search Amna Murad Hospital specialists by department, expertise, and experience.",
};

export default function DoctorsPage() {
  return (
    <main className="min-h-screen bg-[#f6f7ff] text-[#0b1730]">
      <HospitalHeader />
      <DoctorsPageContent />
      <HospitalFooter />
    </main>
  );
}
