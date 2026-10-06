import { useEffect, useState } from "react"
import { CheckIcon } from "lucide-react"
import Reveal from "@/components/common/Reveal"
import { dms } from "@/data/story"
import { useInView } from "@/hooks/useInView"
import { cn } from "@/lib/utils"
import { Eyebrow } from "./SectionHeading"

const avatarTones = [
  ["#f0a3bf", "#a8365f"],
  ["#9cc6ea", "#1f5f99"],
  ["#f3c37a", "#b8701c"],
  ["#a7cfa0", "#2f6b45"],
  ["#eba383", "#953b1d"],
]

const reducedMotion =
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches

function Switch({ on, onChange }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => onChange(!on)}
      className="inline-flex items-center gap-2.5 rounded-full border border-border bg-background py-1 pr-3 pl-1 text-sm text-ink transition-colors"
    >
      <span
        className={cn(
          "relative h-6 w-11 rounded-full transition-colors duration-300",
          on ? "bg-whatsapp" : "bg-ink/20"
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 left-0.5 size-5 rounded-full bg-white shadow transition-transform duration-300",
            on && "translate-x-5"
          )}
        />
      </span>
      With a website
    </button>
  )
}

// Row that flips over (like a card) from the DM to the part of the website
// that answers it.
function Row({ dm, index, answered }) {
  const [from, to] = avatarTones[index % avatarTones.length]
  return (
    <li className="[perspective:900px]">
      <div
        className="relative h-[68px] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] [transform-style:preserve-3d] motion-reduce:transition-none"
        style={{ transform: answered ? "rotateX(-180deg)" : "none", transitionDelay: `${index * 110}ms` }}
      >
        <div className="absolute inset-0 flex items-center gap-3 px-4 [backface-visibility:hidden]">
          <span
            className="size-10 shrink-0 rounded-full ring-2 ring-surface"
            style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
          />
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-semibold text-ink">{dm.name}</span>
            <span className="block truncate text-sm text-ink/80">{dm.question}</span>
          </span>
          <span className="flex shrink-0 flex-col items-end gap-1.5">
            <span className="text-xs text-muted-foreground">{dm.time}</span>
            <span className="size-2 rounded-full bg-[#3a7bfd]" />
          </span>
        </div>
        <div className="absolute inset-0 flex items-center gap-3 bg-whatsapp/[0.07] px-4 [backface-visibility:hidden] [transform:rotateX(180deg)]">
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-whatsapp text-white">
            <CheckIcon className="size-5" strokeWidth={3} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-semibold text-ink">{dm.answer}</span>
            <span className="block truncate text-sm text-muted-foreground">
              Answers “{dm.question}”
            </span>
          </span>
          <span className="shrink-0 rounded-full bg-whatsapp/15 px-2 py-0.5 text-[11px] font-medium text-whatsapp">
            on your site
          </span>
        </div>
      </div>
    </li>
  )
}

export default function Inbox() {
  const [answered, setAnswered] = useState(false)
  const [touched, setTouched] = useState(false)
  const [ref, inView] = useInView({ rootMargin: "0px 0px -25% 0px" })

  // Show the pile first, then answer it once, unless the visitor got there first.
  useEffect(() => {
    if (!inView || touched || reducedMotion) return
    const id = setTimeout(() => setAnswered(true), 2600)
    return () => clearTimeout(id)
  }, [inView, touched])

  function flip(value) {
    setTouched(true)
    setAnswered(value)
  }

  return (
    <section id="inbox" data-tone="cream" className="px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto grid grid-cols-1 max-w-6xl items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <Reveal>
          <Eyebrow>Sound familiar?</Eyebrow>
          <h2 className="mt-3 text-3xl text-balance text-ink sm:text-5xl">
            Your DMs ask the same five questions. Every day.
          </h2>
          <p className="mt-5 max-w-lg text-pretty text-muted-foreground">
            People love your posts. Then they message to ask the price, the address, the timings,
            again and again, often at 11 pm. A website answers all of it before anyone has to ask, and
            sends the serious customers straight to your WhatsApp.
          </p>
          <p className="mt-6 max-w-lg border-l-2 border-marigold pl-4 font-serif text-xl leading-snug text-ink">
            Fewer “price?” messages. More “I'd like to order.”
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div ref={ref} className="overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl shadow-plum/10 dark:shadow-black/40">
            <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3.5">
              <div>
                <p className="text-sm font-semibold text-ink">Messages</p>
                <p
                  key={answered ? "done" : "open"}
                  className={cn("fade-up text-xs", answered ? "text-whatsapp" : "text-muted-foreground")}
                >
                  {answered ? "All answered, while you slept" : `${dms.length} unread · and counting`}
                </p>
              </div>
              <Switch on={answered} onChange={flip} />
            </div>
            <ul className="divide-y divide-border">
              {dms.map((dm, i) => (
                <Row key={dm.name} dm={dm} index={i} answered={answered} />
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
