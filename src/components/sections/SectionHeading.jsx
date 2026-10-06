import Reveal from "@/components/common/Reveal"
import { cn } from "@/lib/utils"

export function Eyebrow({ children, inverted = false, className }) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-3 text-xs font-medium tracking-[0.2em] uppercase",
        inverted ? "text-white/60" : "text-muted-foreground",
        className
      )}
    >
      <span aria-hidden className="h-px w-6 bg-marigold" />
      {children}
    </p>
  )
}

export default function SectionHeading({ eyebrow, title, intro, className, inverted = false }) {
  return (
    <Reveal className={cn("mx-auto max-w-2xl text-center", className)}>
      {eyebrow && <Eyebrow inverted={inverted}>{eyebrow}</Eyebrow>}
      <h2 className={cn("mt-3 text-3xl sm:text-5xl", inverted ? "text-white" : "text-ink")}>{title}</h2>
      {intro && (
        <p className={cn("mt-4 text-pretty", inverted ? "text-white/70" : "text-muted-foreground")}>
          {intro}
        </p>
      )}
    </Reveal>
  )
}
