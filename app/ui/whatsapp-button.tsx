import { FaWhatsapp } from "react-icons/fa";
import { whatsappHref } from "@/lib/contact";

export function WhatsAppButton() {
  return (
    <a
      href={whatsappHref("Hello Amna Murad Hospital, I need assistance.")}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Amna Murad Hospital on WhatsApp"
      className="group fixed bottom-5 right-5 z-[60] grid size-14 place-items-center rounded-full bg-[#20b95a] text-white shadow-[0_12px_30px_rgba(13,104,51,0.3)] transition-[transform,background-color] duration-300 hover:-translate-y-1 hover:bg-[#159b49] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#20b95a] sm:bottom-7 sm:right-7 sm:size-16"
    >
      <FaWhatsapp className="size-7 sm:size-8" />
      <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-lg bg-[#10233d] px-3 py-2 text-xs font-bold text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 sm:block">
        Chat on WhatsApp
      </span>
    </a>
  );
}
