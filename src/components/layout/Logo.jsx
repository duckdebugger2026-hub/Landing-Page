import { cn } from "@/lib/utils"
import { site } from "@/data/site"

export default function Logo({ className, inverted = false, href = "#top" }) {
  return (
    <a
      href={href}
      className={cn("inline-flex items-center gap-2 font-serif text-lg leading-none sm:text-xl", className)}
      aria-label={`${site.name} home`}
    >
      <span className="grid size-7 place-items-center rounded-full bg-marigold font-sans text-sm font-bold text-plum">
        {site.initial}
      </span>
      <span className={inverted ? "text-white" : "text-ink"}>{site.name}</span>
    </a>
  )
}
