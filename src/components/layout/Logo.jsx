import { cn } from "@/lib/utils"
import { site } from "@/data/site"

export default function Logo({ className, inverted = false, href = "#top" }) {
  return (
    <a
      href={href}
      className={cn("inline-flex items-center gap-2 text-[17px] leading-none font-semibold tracking-[-0.02em] sm:text-lg", className)}
      aria-label={`${site.name} home`}
    >
      <span className="grid size-7 place-items-center rounded-full bg-marigold font-sans text-sm font-bold text-plum">
        {site.initial}
      </span>
      <span className={inverted ? "text-white" : "text-ink"}>{site.name}</span>
    </a>
  )
}
