import Reveal from "@/components/common/Reveal"
import { cn } from "@/lib/utils"

export function Eyebrow({ children, inverted = false, className }) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-3 font-mono text-[11px] font-medium tracking-[0.18em] uppercase",
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
      <h2 className={cn("mt-4 text-[2rem] leading-[1.08] text-balance sm:text-[2.9rem]", inverted ? "text-white" : "text-ink")}>{title}</h2>
      {intro && (
        <p className={cn("mt-4 text-pretty", inverted ? "text-white/70" : "text-muted-foreground")}>
          {intro}
        </p>
      )}
    </Reveal>
  )
}
