import { useRef, useState } from "react"
import { ArrowRightIcon, CheckIcon } from "lucide-react"
import BrowserMockup from "@/components/common/BrowserMockup"
import PhoneMockup from "@/components/common/PhoneMockup"
import Reveal from "@/components/common/Reveal"
import { mockupThemes } from "@/data/mockupThemes"
import { projects } from "@/data/site"
import { useInView } from "@/hooks/useInView"
import { cn } from "@/lib/utils"
import SectionHeading from "./SectionHeading"

const reducedMotion =
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches

const tile = "tile-in rounded-2xl border border-border bg-surface p-6"
const label = "text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase"

// The big panel: the client's colours, a laptop and a phone that lean toward the pointer.
function Stage({ project }) {
  const ref = useRef(null)
  const t = mockupThemes[project.theme]

  function onMove(e) {
    if (reducedMotion) return
    const r = ref.current.getBoundingClientRect()
    ref.current.style.setProperty("--mx", ((e.clientX - r.left) / r.width - 0.5).toFixed(3))
    ref.current.style.setProperty("--my", ((e.clientY - r.top) / r.height - 0.5).toFixed(3))
  }
  function onLeave() {
    ref.current.style.setProperty("--mx", "0")
    ref.current.style.setProperty("--my", "0")
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="relative isolate min-h-[340px] overflow-hidden rounded-2xl transition-colors duration-700 sm:min-h-[420px] lg:h-full"
      style={{ background: t.bg }}
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 transition-opacity duration-700"
        style={{
          background: `radial-gradient(circle at 85% 15%, ${t.from}55, transparent 55%), radial-gradient(circle at 10% 100%, ${t.to}30, transparent 50%)`,
        }}
      />
      <div key={project.name} className="tile-in absolute inset-0">
        <div
          className="absolute top-[9%] left-[6%] w-[80%] transition-transform duration-500 ease-out"
          style={{ transform: "translate(calc(var(--mx, 0) * -10px), calc(var(--my, 0) * -10px))" }}
        >
          <BrowserMockup
            theme={project.theme}
            brand={project.brand}
            headline={project.headline}
            fontClass={project.font.className}
            className="shadow-2xl shadow-black/15"
          />
        </div>
        <div
          className="absolute right-[5%] -bottom-[10%] w-[27%] max-w-[170px] transition-transform duration-500 ease-out"
          style={{ transform: "translate(calc(var(--mx, 0) * 18px), calc(var(--my, 0) * 18px)) rotate(5deg)" }}
        >
          <PhoneMockup
            theme={project.theme}
            brand={project.brand.split(" ")[0]}
            headline={project.headline}
            fontClass={project.font.className}
          />
        </div>
      </div>
      <p
        className="absolute bottom-4 left-5 rounded-full bg-white/80 px-3 py-1 text-xs font-medium backdrop-blur"
        style={{ color: t.ink }}
      >
        {project.type} · {project.city}
      </p>
    </div>
  )
}

export default function Work() {
  const [active, setActive] = useState(0)
  const [auto, setAuto] = useState(!reducedMotion)
  const [ref, inView] = useInView({ rootMargin: "-15% 0px", once: false })
  const project = projects[active]

  function choose(i) {
    setAuto(false)
    setActive(i)
  }

  function tryStyle() {
    window.dispatchEvent(new CustomEvent("preview:preset", { detail: { preset: project.preset } }))
    document.getElementById("preview")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="work" data-tone="petal" className="px-4 py-20 sm:px-6 sm:py-28">
      <SectionHeading
        eyebrow="Portfolio"
        title="Selected work"
        intro="Three shops, three very different customers. Every site is designed around how its customers actually buy."
      />

      <Reveal delay={100} className="mx-auto mt-14 max-w-6xl">
        <div ref={ref} role="tablist" aria-label="Projects" className="grid gap-3 sm:grid-cols-3">
          {projects.map((p, i) => {
            const selected = i === active
            return (
              <button
                key={p.name}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => choose(i)}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border p-4 text-left transition-colors duration-300",
                  selected ? "border-ink/25 bg-surface shadow-lg shadow-plum/5" : "border-border hover:border-ink/25"
                )}
              >
                <span className="flex items-baseline gap-3">
                  <span className={cn("font-serif text-sm tabular-nums", selected ? "text-marigold" : "text-muted-foreground")}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span
                      className={cn(
                        "block font-serif text-xl transition-colors",
                        selected ? "text-ink" : "text-ink/55 group-hover:text-ink"
                      )}
                    >
                      {p.name}
                    </span>
                    <span className="block text-sm text-muted-foreground">
                      {p.type}, {p.city}
                    </span>
                  </span>
                </span>
                <span aria-hidden className="absolute inset-x-0 bottom-0 h-0.5 bg-border/60">
                  {selected && (
                    <span
                      key={`${active}-${auto}`}
                      className={cn("block h-full bg-marigold", auto ? "tab-progress" : "w-full")}
                      style={{ animationPlayState: inView ? "running" : "paused" }}
                      onAnimationEnd={() => setActive((a) => (a + 1) % projects.length)}
                    />
                  )}
                </span>
              </button>
            )
          })}
        </div>

        <div role="tabpanel" aria-label={project.name} className="mt-4 grid gap-4 lg:grid-cols-4 lg:grid-rows-[auto_auto_auto]">
          <div className="lg:col-span-2 lg:row-span-2">
            <Stage project={project} />
          </div>

          <div key={`brief-${active}`} className={cn(tile, "lg:col-span-2")} style={{ "--d": "60ms" }}>
            <p className={label}>The brief</p>
            <p className="mt-3 font-serif text-xl leading-snug text-balance text-ink sm:text-2xl">“{project.brief}”</p>
          </div>

          <div key={`palette-${active}`} className={tile} style={{ "--d": "120ms" }}>
            <p className={label}>Palette</p>
            <ul className="mt-4 grid grid-cols-4 gap-2">
              {project.palette.map((c) => (
                <li key={c.hex} className="text-center">
                  <span
                    className="mx-auto block aspect-square w-full max-w-12 rounded-full ring-1 ring-black/10"
                    style={{ background: c.hex }}
                  />
                  <span className="mt-2 block text-xs font-medium text-ink">{c.name}</span>
                  <span className="block font-mono text-[10px] text-muted-foreground uppercase">{c.hex.slice(1)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div key={`type-${active}`} className={cn(tile, "flex flex-col")} style={{ "--d": "180ms" }}>
            <p className={label}>Typography</p>
            <div className="mt-2 flex flex-1 items-end justify-between gap-3">
              <span className={cn("text-6xl leading-none text-ink", project.font.className)}>Aa</span>
              <span className="text-right text-xs text-muted-foreground">{project.font.name}</span>
            </div>
            <p className={cn("mt-3 truncate text-lg text-ink/80", project.font.className)}>{project.headline}</p>
          </div>

          <div
            key={`built-${active}`}
            className={cn(tile, "flex flex-col gap-6 lg:col-span-4 lg:flex-row lg:items-center lg:justify-between")}
            style={{ "--d": "240ms" }}
          >
            <div>
              <p className={label}>What we built</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {project.built.map((item) => (
                  <li
                    key={item}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-sm text-ink"
                  >
                    <CheckIcon className="size-3.5 text-marigold" strokeWidth={3} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
              <dl className="flex gap-8">
                {[
                  ["Package", project.scope.package],
                  ["Size", project.scope.pages],
                  ["Live in", project.scope.time],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-xs text-muted-foreground">{k}</dt>
                    <dd className="font-serif text-xl text-ink">{v}</dd>
                  </div>
                ))}
              </dl>
              <button
                type="button"
                onClick={tryStyle}
                className="group inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Try this style with your name
                <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
