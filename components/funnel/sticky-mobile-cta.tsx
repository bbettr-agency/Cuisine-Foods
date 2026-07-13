import { Phone } from "lucide-react";
import { telUrl, whatsappUrl, whatsappPrefill } from "@/config/conversion";

/** Sticky mobile CTA bar (Call + WhatsApp) — always-in-reach conversion on phones. */
export function StickyMobileCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 backdrop-blur-md lg:hidden">
      <div className="grid grid-cols-2 gap-2 p-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))]">
        <a
          href={telUrl}
          className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-ink/20 font-semibold text-ink"
        >
          <Phone className="h-4 w-4" /> Call
        </a>
        <a
          href={whatsappUrl(whatsappPrefill.general)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-gold-500 font-semibold text-ink"
        >
          WhatsApp
        </a>
      </div>
    </div>
  );
}
