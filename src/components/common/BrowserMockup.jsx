import { cn } from "@/lib/utils"
import { mockupThemes } from "@/data/mockupThemes"
import Artwork from "./Artwork"

export default function BrowserMockup({ theme, brand, headline, className }) {
  const t = mockupThemes[theme]
  return (
    <div
      className={cn("overflow-hidden rounded-xl border border-black/5 shadow-sm", className)}
      style={{ background: t.bg }}
      aria-hidden
    >
      <div className="flex items-center gap-1.5 px-3 py-2" style={{ background: t.bar }}>
        <span className="size-1.5 rounded-full bg-black/15" />
        <span className="size-1.5 rounded-full bg-black/15" />
        <span className="size-1.5 rounded-full bg-black/15" />
        <span className="ml-3 h-2.5 w-2/5 rounded-full bg-white/70" />
      </div>
      <div className="p-4 sm:p-5">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold sm:text-xs" style={{ color: t.ink }}>
            {brand}
          </span>
          <span className="flex gap-2">
            {[0, 1, 2].map((i) => (
              <span key={i} className="h-1 w-5 rounded-full" style={{ background: t.ink, opacity: 0.15 }} />
            ))}
          </span>
        </div>
        <div className="mt-4 grid grid-cols-2 items-center gap-4">
          <div>
            <p className="font-serif text-lg leading-tight sm:text-xl" style={{ color: t.ink }}>
              {headline}
            </p>
            <span className="mt-2 block h-1 w-4/5 rounded-full" style={{ background: t.ink, opacity: 0.12 }} />
            <span className="mt-1.5 block h-1 w-3/5 rounded-full" style={{ background: t.ink, opacity: 0.12 }} />
            <span
              className="mt-3 inline-block rounded-full px-2.5 py-1 text-[9px] font-medium text-white"
              style={{ background: t.ink }}
            >
              Book now
            </span>
          </div>
          <Artwork theme={theme} className="aspect-[5/4]" />
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-5 rounded-md" style={{ background: t.tile }} />
          ))}
        </div>
      </div>
    </div>
  )
}
