import { useInView } from "@/hooks/useInView"
import { cn } from "@/lib/utils"

// The attention font: Instrument Serif italic, used for one or two key words in a heading.
export function Em({ children, className }) {
  return (
    <em className={cn("font-serif text-[1.08em] leading-none font-normal tracking-[-0.01em] text-highlight italic", className)}>
      {children}
    </em>
  )
}

// A marigold marker swipe that draws behind a key phrase once it scrolls into view.
export function Mark({ children }) {
  const [ref, inView] = useInView({ rootMargin: "0px 0px -15% 0px" })
  return (
    <mark ref={ref} className={cn("marker", inView && "is-in")}>
      {children}
    </mark>
  )
}
