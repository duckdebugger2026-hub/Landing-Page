import { useRef, useState } from "react"
import Duck from "@/components/common/Duck"
import Reveal from "@/components/common/Reveal"
import { site, whatsappLink } from "@/data/site"
import { duckLines } from "@/data/story"
import { Eyebrow } from "./SectionHeading"

export default function StudioNote() {
  const [line, setLine] = useState(-1)
  const [wiggle, setWiggle] = useState(0)
  const timer = useRef(0)

  function squeak() {
    setLine((l) => (l + 1) % duckLines.length)
    setWiggle((w) => w + 1)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setLine(-1), 4000)
  }

  return (
    <section id="about" data-tone="cream" className="px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto grid grid-cols-1 max-w-5xl items-center gap-12 md:grid-cols-[1.4fr_1fr] md:gap-16">
        <Reveal>
          <Eyebrow>Why “Duck Debugger”?</Eyebrow>
          <div className="mt-6 space-y-5 font-serif text-xl leading-relaxed text-ink sm:text-2xl sm:leading-relaxed">
            <p>
              Programmers have an old trick. When you're stuck, you explain the problem, line by line, to
              a rubber duck on your desk. Somewhere in the explaining, the answer turns up.
            </p>
            <p>
              That's how we build websites. You tell us about your business, out loud, the way you'd tell a
              friend. We listen, ask the obvious questions, and turn it into a site your customers
              actually use.
            </p>
          </div>
          <p className="mt-6 max-w-lg text-muted-foreground">
            No jargon, no account managers, no monthly fees you didn't agree to. Just a small studio that
            answers on WhatsApp and treats your shop like it's our own.
          </p>
          <div className="mt-8 flex items-center gap-4">
            <span className="grid size-12 place-items-center rounded-full bg-marigold font-serif text-xl text-plum">
              {site.initial}
            </span>
            <span>
              <span className="block font-serif text-2xl text-ink italic">The {site.name} team</span>
              <span className="block text-sm text-muted-foreground">
                Small studio, big on listening ·{" "}
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-ink underline decoration-marigold decoration-2 underline-offset-4"
                >
                  say hi
                </a>
              </span>
            </span>
          </div>
        </Reveal>

        <Reveal delay={150} className="relative mx-auto w-full max-w-[280px] pt-16">
          <p
            aria-live="polite"
            className="pointer-events-none absolute top-0 left-1/2 w-max max-w-[240px] -translate-x-1/2 text-center"
          >
            {line >= 0 && (
              <span
                key={wiggle}
                className="fade-up relative inline-block rounded-2xl bg-surface px-4 py-2.5 text-sm text-ink shadow-lg ring-1 ring-border"
              >
                {duckLines[line]}
                <span className="absolute -bottom-1.5 left-1/2 size-3 -translate-x-1/2 rotate-45 bg-surface ring-1 ring-border [clip-path:polygon(100%_0,100%_100%,0_100%)]" />
              </span>
            )}
          </p>
          <button
            type="button"
            onClick={squeak}
            aria-label="Squeeze the rubber duck"
            className="block w-full outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <span key={wiggle} className={wiggle ? "duck-wiggle block" : "duck-bob block"}>
              <Duck />
              <span aria-hidden className="mx-auto -mt-3 block h-3 w-3/4 rounded-[50%] bg-ink/10" />
            </span>
          </button>
          <p className="mt-3 text-center text-xs text-muted-foreground">Go on, give it a squeeze.</p>
        </Reveal>
      </div>
    </section>
  )
}
