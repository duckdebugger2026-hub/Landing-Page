import { useEffect, useRef, useState } from "react"
import { buttonVariants } from "@/components/ui/button"
import { WhatsAppIcon } from "@/components/common/Icons"
import Reveal from "@/components/common/Reveal"
import { steps, whatsappLink } from "@/data/site"
import { cn } from "@/lib/utils"
import { Eyebrow } from "./SectionHeading"

// Fills the timeline as it passes the middle of the screen, and reports how
// many steps have been reached.
function useTimelineProgress() {
  const ref = useRef(null)
  const [reached, setReached] = useState(-1)

  useEffect(() => {
    const list = ref.current
    let frame = 0
    const update = () => {
      frame = 0
      const line = window.innerHeight * 0.6
      const rect = list.getBoundingClientRect()
      const progress = Math.min(Math.max((line - rect.top) / rect.height, 0), 1)
      list.style.setProperty("--progress", progress.toFixed(3))
      const markers = list.querySelectorAll("[data-step]")
      let count = 0
      for (const marker of markers) {
        if (marker.getBoundingClientRect().top + 20 < line) count++
      }
      setReached(count - 1)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  return [ref, reached]
}

export default function Process() {
  const [listRef, reached] = useTimelineProgress()

  return (
    <section id="process" className="bg-surface px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-[1fr_1.3fr] md:gap-16">
        <Reveal className="md:sticky md:top-28 md:self-start">
          <Eyebrow>Process</Eyebrow>
          <h2 className="mt-3 text-3xl text-ink sm:text-5xl">How we work together</h2>
          <p className="mt-4 max-w-sm text-muted-foreground">
            Unhurried, personal and clear. You approve every step before we move on.
          </p>
          <a
            href={whatsappLink("Hi! I'd like to start a website project.")}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "outline" }), "mt-6 h-10 rounded-full px-5")}
          >
            <WhatsAppIcon className="text-whatsapp" />
            Start on WhatsApp
          </a>
        </Reveal>
        <ol ref={listRef} className="relative space-y-10">
          <span aria-hidden className="absolute top-5 bottom-5 left-[19px] w-px bg-border" />
          <span
            aria-hidden
            className="absolute top-5 bottom-5 left-[19px] w-px origin-top bg-marigold"
            style={{ transform: "scaleY(var(--progress, 0))" }}
          />
          {steps.map((step, i) => {
            const done = i <= reached
            return (
              <li key={step.title} className="relative flex gap-5">
                <span
                  data-step
                  className={cn(
                    "relative z-10 grid size-10 shrink-0 place-items-center rounded-full font-serif text-lg ring-4 ring-surface transition-all duration-500",
                    done ? "scale-110 bg-marigold text-plum" : "bg-glow text-ink/60"
                  )}
                >
                  {i + 1}
                </span>
                <div
                  className={cn(
                    "pt-1.5 transition-opacity duration-500",
                    done ? "opacity-100" : "opacity-50"
                  )}
                >
                  <h3 className="text-xl text-ink">{step.title}</h3>
                  <p className="mt-1 text-muted-foreground">{step.body}</p>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
