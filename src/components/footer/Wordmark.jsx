import { useInView } from "@/hooks/useInView"
import { cn } from "@/lib/utils"

// The studio name, edge to edge. Letters rise from behind a mask when the
// footer arrives, and each one lifts and turns marigold under the cursor.
export default function Wordmark({ text }) {
  const [ref, inView] = useInView({ rootMargin: "0px 0px -5% 0px" })

  return (
    <p
      ref={ref}
      aria-label={text}
      className="flex justify-center px-4 font-serif text-[clamp(3.4rem,18.5vw,16rem)] leading-[0.9] tracking-tight whitespace-nowrap text-white select-none"
    >
      {[...text].map((char, i) => (
        <span key={i} aria-hidden className="-my-[0.12em] inline-block overflow-hidden py-[0.12em]">
          <span className={cn("wordmark-letter inline-block", inView && "is-in")} style={{ "--i": i }}>
            {char === " " ? " " : char}
          </span>
        </span>
      ))}
    </p>
  )
}
