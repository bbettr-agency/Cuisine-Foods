import { MessageCircle } from "lucide-react";
import { whatsappUrl, whatsappPrefill } from "@/config/conversion";

/** Desktop floating WhatsApp button (mobile uses the sticky CTA bar instead). */
export function FloatingWhatsApp() {
  return (
    <a
      href={whatsappUrl(whatsappPrefill.general)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Cuisine Foods on WhatsApp"
      className="fixed bottom-6 right-6 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-ink text-gold-400 shadow-lift ring-1 ring-gold-500/25 transition-transform duration-200 ease-out-expo hover:scale-105 lg:flex"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
