import { cn } from "@/lib/utils"
import { mockupThemes } from "@/data/mockupThemes"
import Artwork from "./Artwork"

export default function PhoneMockup({ theme, brand, headline, className, fontClass = "font-serif" }) {
  const t = mockupThemes[theme]
  return (
    <div
      className={cn(
        "relative aspect-[9/18.5] w-full rounded-[1.75rem] bg-plum p-[5px] shadow-xl shadow-plum/20 dark:shadow-black/40 dark:ring-1 dark:ring-white/10",
        className
      )}
      aria-hidden
    >
      <div className="relative flex h-full flex-col overflow-hidden rounded-[1.45rem]" style={{ background: t.bg }}>
        <span className="absolute top-1.5 left-1/2 h-3 w-1/3 -translate-x-1/2 rounded-full bg-plum" />
        <div className="flex items-center justify-between px-3 pt-6">
          <span className="text-[10px] font-semibold" style={{ color: t.ink }}>
            {brand}
          </span>
          <span className="flex flex-col gap-0.5">
            <span className="h-0.5 w-3 rounded-full" style={{ background: t.ink }} />
            <span className="h-0.5 w-3 rounded-full" style={{ background: t.ink }} />
          </span>
        </div>
        <div className="flex flex-1 flex-col px-3 pt-2">
          <Artwork theme={theme} className="aspect-[4/3]" />
          <p className={cn("mt-2 text-center text-[13px] leading-tight", fontClass)} style={{ color: t.ink }}>
            {headline}
          </p>
          <span className="mt-2 rounded-full bg-whatsapp py-1 text-center text-[7px] font-medium text-white">
            Chat on WhatsApp
          </span>
          <div className="mt-2 grid grid-cols-2 gap-1.5">
            <span className="h-6 rounded-md" style={{ background: t.tile }} />
            <span className="h-6 rounded-md" style={{ background: t.tile }} />
          </div>
        </div>
      </div>
    </div>
  )
}
