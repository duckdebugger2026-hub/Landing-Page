import { useEffect, useRef, useState } from "react"
import { ArrowLeftIcon, CheckCheckIcon, MicIcon } from "lucide-react"
import Reveal from "@/components/common/Reveal"
import { chat } from "@/data/story"
import { site, steps } from "@/data/site"
import { cn } from "@/lib/utils"
import SectionHeading from "./SectionHeading"
import { Em, Mark } from "@/components/common/Type"

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

function PreviewCard() {
  return (
    <span className="mb-1.5 block overflow-hidden rounded-md bg-[#fdf6f2]">
      <span
        className="relative block h-20 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #eba383, #953b1d)" }}
      >
        <span className="absolute top-3 left-5 size-7 rounded-full bg-white/35" />
        <span className="absolute -right-4 -bottom-8 size-24 rounded-full bg-white/20" />
      </span>
      <span className="block p-2">
        <span className="block font-serif text-[13px] leading-tight text-[#4a2418]">Cakes made for celebrations</span>
        <span className="mt-1.5 inline-block rounded-full bg-[#b84c26] px-2 py-0.5 text-[9px] font-semibold text-white">
          Order a cake
        </span>
      </span>
    </span>
  )
}

// A WhatsApp-style chat that grows one exchange per step reached.
function ChatPhone({ reached }) {
  const [typing, setTyping] = useState(false)
  const lastReached = useRef(reached)

  useEffect(() => {
    if (reached <= lastReached.current) return
    lastReached.current = reached
    const start = setTimeout(() => setTyping(true), 0)
    const stop = setTimeout(() => setTyping(false), 1300)
    return () => {
      clearTimeout(start)
      clearTimeout(stop)
    }
  }, [reached])

  const groups = chat.slice(0, Math.max(reached + 1, 0))

  return (
    <div className="relative mx-auto w-[min(310px,100%)] rounded-[2.6rem] bg-plum p-2.5 shadow-2xl shadow-plum/25 dark:shadow-black/50 dark:ring-1 dark:ring-white/10">
      <div className="relative flex h-[580px] flex-col overflow-hidden rounded-[2.1rem] bg-[#efe6da]">
        <div className="relative z-10 bg-[#2a1630] px-4 pt-9 pb-3 text-white">
          <span className="absolute top-2 left-1/2 h-6 w-24 -translate-x-1/2 rounded-full bg-black/60" />
          <div className="flex items-center gap-3">
            <ArrowLeftIcon className="size-4 opacity-80" />
            <span className="grid size-9 place-items-center rounded-full bg-marigold font-serif text-base text-plum">
              {site.initial}
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold">{site.name}</span>
              <span key={typing ? "t" : "o"} className="fade-up block text-[11px] text-white/70">
                {typing ? "typing…" : "online"}
              </span>
            </span>
          </div>
        </div>

        <div
          className="flex flex-1 flex-col justify-end gap-2 overflow-hidden px-3 pb-3"
          style={{
            backgroundImage: "radial-gradient(rgba(42,22,48,0.06) 1px, transparent 1px)",
            backgroundSize: "14px 14px",
          }}
        >
          <span className="mx-auto mb-1 rounded-md bg-white/80 px-2 py-0.5 text-[10px] font-medium text-[#5b4a60]">
            Today
          </span>
          {groups.map((group, g) =>
            group.map((m, j) => {
              const mine = m.from === "you"
              return (
                <div
                  key={`${g}-${j}`}
                  className={cn(
                    "bubble-in max-w-[82%] rounded-xl px-2.5 py-1.5 text-[13px] leading-snug text-[#1f1a1f] shadow-sm",
                    mine ? "self-end rounded-tr-sm bg-[#d9fdd3]" : "self-start rounded-tl-sm bg-white"
                  )}
                  style={{ "--d": `${j * 650}ms`, transformOrigin: mine ? "bottom right" : "bottom left" }}
                >
                  {m.preview && <PreviewCard />}
                  {m.text}
                  <span className="float-right mt-1.5 ml-2 inline-flex items-center gap-0.5 text-[10px] text-[#6d6670]">
                    {`10:${String(2 + g * 7 + j).padStart(2, "0")}`}
                    {mine && <CheckCheckIcon className="size-3.5 text-[#3a9bdc]" />}
                  </span>
                </div>
              )
            })
          )}
        </div>

        <div className="flex items-center gap-2 bg-[#efe6da] px-3 pb-4">
          <span className="flex-1 rounded-full bg-white px-4 py-2.5 text-[13px] text-[#8b8290]">Message</span>
          <span className="grid size-10 place-items-center rounded-full bg-[#1fa855] text-white">
            <MicIcon className="size-4" />
          </span>
        </div>
      </div>
    </div>
  )
}

export default function Process() {
  const [listRef, reached] = useTimelineProgress()

  return (
    <section id="process" data-tone="lilac" className="px-4 py-20 sm:px-6 sm:py-28">
      <SectionHeading
        eyebrow="How it works"
        title={<>From hello to live, all on <Em>WhatsApp</Em></>}
        intro={<><Mark>No forms, no portals, no account managers.</Mark> Here's a real project, start to finish, the way it actually happens.</>}
      />

      <div className="mx-auto mt-16 grid grid-cols-1 max-w-5xl items-start gap-14 lg:grid-cols-[1fr_auto] lg:gap-20">
        <ol ref={listRef} className="relative space-y-12 lg:py-10">
          <span aria-hidden className="absolute top-5 bottom-5 left-[19px] w-px bg-border lg:top-15 lg:bottom-15" />
          <span
            aria-hidden
            className="absolute top-5 bottom-5 left-[19px] w-px origin-top bg-marigold lg:top-15 lg:bottom-15"
            style={{ transform: "scaleY(var(--progress, 0))" }}
          />
          {steps.map((step, i) => {
            const done = i <= reached
            return (
              <li key={step.title} className="relative flex gap-5">
                <span
                  data-step
                  className={cn(
                    "relative z-10 grid size-10 shrink-0 place-items-center rounded-full font-mono text-sm font-medium ring-4 ring-(--page) transition-all duration-500",
                    done ? "scale-110 bg-marigold text-plum" : "bg-glow text-ink/60"
                  )}
                >
                  {i + 1}
                </span>
                <div className={cn("pt-1 transition-opacity duration-500", done ? "opacity-100" : "opacity-45")}>
                  <p className="font-mono text-[11px] font-medium tracking-[0.16em] text-muted-foreground uppercase">{step.when}</p>
                  <h3 className="mt-1 text-2xl text-ink">{step.title}</h3>
                  <p className="mt-1.5 max-w-md text-muted-foreground">{step.body}</p>
                </div>
              </li>
            )
          })}
        </ol>

        <Reveal className="lg:sticky lg:top-24">
          <ChatPhone reached={reached} />
        </Reveal>
      </div>
    </section>
  )
}
