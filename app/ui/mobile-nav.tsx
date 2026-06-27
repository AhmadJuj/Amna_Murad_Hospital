"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  { label: "Home", href: "#" },
  { label: "About Us", href: "#about" },
  { label: "Departments", href: "#departments" },
  { label: "Consultants", href: "#consultants" },
  { label: "Lab Reports", href: "#" },
  { label: "Contact", href: "#contact" },
];

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative lg:hidden">
      <button
        type="button"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
        className="grid size-10 place-items-center rounded-md border border-[#dfe5ed] text-[#123665] transition hover:border-[#123665] hover:bg-[#f3f7fc]"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <div
        className={`absolute right-0 top-12 z-50 w-[min(19rem,calc(100vw-2.5rem))] origin-top-right rounded-xl border border-[#e4eaf2] bg-white p-3 shadow-[0_20px_55px_rgba(10,35,70,0.18)] transition duration-200 ${
          isOpen
            ? "visible translate-y-0 scale-100 opacity-100"
            : "invisible -translate-y-2 scale-95 opacity-0"
        }`}
      >
        <nav className="grid gap-1">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="rounded-lg px-4 py-3 text-sm font-semibold text-[#42506a] transition hover:bg-[#edf4fc] hover:text-[#0b438c]"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#consultants"
            onClick={() => setIsOpen(false)}
            className="mt-2 rounded-lg bg-[#082c69] px-4 py-3 text-center text-sm font-bold text-white"
          >
            Book Appointment
          </a>
        </nav>
      </div>
    </div>
  );
}
