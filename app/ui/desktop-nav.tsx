"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Departments", href: "/departments" },
  { label: "Doctors", href: "/doctors" },
  { label: "Lab Reports", href: "/lab-reports" },
  { label: "Contact", href: "/contact" },
];

export function DesktopNav() {
  const pathname = usePathname();

  return (
    <nav className="hidden items-center gap-7 text-[12px] font-semibold text-[#536076] lg:flex">
      {navigation.map((item) => {
        const isActive =
          item.href === "/"
            ? pathname === "/"
            : pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <Link
            key={item.label}
            href={item.href}
            className={`relative py-2 transition hover:text-[#0b438c] ${
              isActive
                ? "text-[#0b438c] after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:bg-[#0b438c]"
                : ""
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
