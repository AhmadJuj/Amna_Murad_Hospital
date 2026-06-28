import type { ReactNode } from "react";
import { HospitalFooter, HospitalHeader } from "./home-sections";
import { PageHero } from "./page-components";

type InnerPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
};

export function InnerPage({
  eyebrow,
  title,
  description,
  children,
}: InnerPageProps) {
  return (
    <main className="min-h-screen bg-[#f7f9fc] text-[#0b1730]">
      <HospitalHeader />
      <PageHero
        eyebrow={eyebrow}
        title={title}
        description={description}
        centered
        className="bg-white"
      />
      {children}
      <HospitalFooter />
    </main>
  );
}
