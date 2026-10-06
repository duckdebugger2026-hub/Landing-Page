import { WhatsAppIcon } from "@/components/common/Icons"
import { whatsappLink } from "@/data/site"

export default function WhatsAppButton() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      style={{ "--d": "1600ms" }}
      className="fade-up fixed right-4 bottom-4 z-30 inline-flex size-14 items-center justify-center gap-2 rounded-full bg-whatsapp font-medium text-white shadow-lg shadow-whatsapp/30 transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-whatsapp/40 sm:right-6 sm:bottom-6 sm:h-12 sm:w-auto sm:px-5"
    >
      <WhatsAppIcon className="size-6 sm:size-5" />
      <span className="hidden sm:inline">Chat with us</span>
    </a>
  )
}
