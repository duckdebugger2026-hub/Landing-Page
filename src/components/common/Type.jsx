import { useInView } from "@/hooks/useInView"
import { cn } from "@/lib/utils"

// The attention font: Instrument Serif italic, used for one or two key words in a heading.
// `bright` is for dark backgrounds such as the pricing section and the footer.
export function Em({ children, className, bright = false }) {
  return (
    <em
      className={cn(
        "font-serif text-[1.08em] leading-none font-normal tracking-[-0.01em] italic",
        bright ? "text-gradient-bright" : "text-gradient",
        className
      )}
    >
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
