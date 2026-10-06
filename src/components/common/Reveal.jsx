import { useInView } from "@/hooks/useInView"
import { cn } from "@/lib/utils"

// Fades its children up (or in from the side with `x`) when scrolled into view.
export default function Reveal({ as: Tag = "div", delay = 0, x = 0, y = 24, className, style, children, ...props }) {
  const [ref, inView] = useInView()
  return (
    <Tag
      ref={ref}
      className={cn("reveal", inView && "is-visible", className)}
      style={{ "--reveal-delay": `${delay}ms`, "--reveal-x": `${x}px`, "--reveal-y": `${y}px`, ...style }}
      {...props}
    >
      {children}
    </Tag>
  )
}
