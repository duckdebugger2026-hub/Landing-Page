import { useEffect, useState } from "react"
import { GlobeIcon } from "lucide-react"
import { InstagramIcon } from "@/components/common/Icons"
import { useInView } from "@/hooks/useInView"
import { cn } from "@/lib/utils"

// A phone that shows a café's Instagram profile, then rearranges the same nine
// posts into a website: one becomes the hero image, three become menu cards,
// five become a gallery. It flips on its own while visible, or on click.
// All positions are in cqw (percent of the screen's width).

const reducedMotion =
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches

const INK = "#5a3420"
const tones = [
  ["#e0a46b", "#8c5634"],
  ["#f3c37a", "#c27a22"],
  ["#d98b5f", "#7a3d22"],
  ["#efd9b8", "#c9a27a"],
  ["#c46a3d", "#6b2f17"],
  ["#f0b98a", "#b0643a"],
  ["#e7c48f", "#9c6b35"],
  ["#d4a373", "#6f4518"],
  ["#f5d6a8", "#d08c4a"],
]

const instaTiles = tones.map((_, i) => ({
  l: (i % 3) * 33.67,
  t: 84 + Math.floor(i / 3) * 33.67,
  w: 33,
  h: 33,
  r: 0,
}))

const siteTiles = [
  { l: 6, t: 22, w: 88, h: 56, r: 4.5 },
  { l: 6, t: 138, w: 27.3, h: 27.3, r: 3 },
  { l: 36.35, t: 138, w: 27.3, h: 27.3, r: 3 },
  { l: 66.7, t: 138, w: 27.3, h: 27.3, r: 3 },
  ...[0, 1, 2, 3, 4].map((k) => ({ l: 6 + k * 17.9, t: 172, w: 16.4, h: 16.4, r: 2 })),
]

const box = (p, delay) => ({
  left: `${p.l}cqw`,
  top: `${p.t}cqw`,
  width: `${p.w}cqw`,
  height: `${p.h}cqw`,
  borderRadius: `${p.r}cqw`,
  transitionDelay: `${delay}ms`,
})

// Elements that only belong to one of the two states fade and drift in or out.
const only = (visible, delay = 0) => ({
  opacity: visible ? 1 : 0,
  transform: visible ? "none" : "translateY(2cqw)",
  transitionDelay: visible ? `${delay}ms` : "0ms",
})

const morph = "morph absolute transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]"

export default function InstaToSite() {
  const [ref, inView] = useInView({ rootMargin: "0px", once: false })
  const [site, setSite] = useState(false)
  const [manual, setManual] = useState(false)

  useEffect(() => {
    if (!inView || manual || reducedMotion) return
    const id = setInterval(() => setSite((s) => !s), 3600)
    return () => clearInterval(id)
  }, [inView, manual])

  function toggle() {
    setManual(true)
    setSite((s) => !s)
  }

  const label = site ? "chaiadda.in" : "@chaiadda on Instagram"

  return (
    <div
      ref={ref}
      role="button"
      tabIndex={0}
      aria-pressed={site}
      aria-label={site ? "Showing the website. Show the Instagram profile" : "Showing Instagram. Show it as a website"}
      onClick={toggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          toggle()
        }
      }}
      className="group relative outline-none"
    >
      <span
        key={label}
        className="fade-up absolute -top-4 left-1/2 z-20 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1 text-[10px] font-medium whitespace-nowrap text-ink shadow-md sm:text-xs"
      >
        {site ? <GlobeIcon className="size-3.5 text-marigold" /> : <InstagramIcon className="size-3.5 text-[#c13584]" />}
        {label}
      </span>

      <div className="relative aspect-[9/18.5] w-full rounded-[1.75rem] bg-plum p-[5px] shadow-xl shadow-plum/25 transition-transform duration-500 group-hover:-translate-y-1 group-focus-visible:ring-3 group-focus-visible:ring-ring/50 dark:shadow-black/40 dark:ring-1 dark:ring-white/10">
        <div
          className="@container relative h-full overflow-hidden rounded-[1.45rem] transition-colors duration-700"
          style={{ background: site ? "#fdf3e6" : "#ffffff", color: INK }}
          aria-hidden
        >
          {/* Status bar */}
          <span className="absolute top-[3.2cqw] left-[7cqw] text-[3cqw] font-semibold">9:41</span>
          <span className="absolute top-[2.4cqw] left-1/2 z-10 h-[5.5cqw] w-[30cqw] -translate-x-1/2 rounded-full bg-plum" />
          <span className="absolute top-[3.4cqw] right-[7cqw] h-[2.6cqw] w-[5cqw] rounded-[0.8cqw] border-[0.4cqw] border-current" />

          {/* Instagram: top bar, avatar, stats and bio */}
          <span className={morph} style={{ ...only(!site), left: "6cqw", top: "11cqw" }}>
            <span className="text-[4.2cqw] font-bold">chaiadda</span>
          </span>
          <span className={morph} style={{ ...only(!site), left: "78cqw", top: "11.5cqw" }}>
            <span className="flex gap-[3cqw]">
              <span className="block size-[4.4cqw] rounded-[1.2cqw] border-[0.5cqw] border-current" />
              <span className="flex flex-col justify-center gap-[0.9cqw]">
                <span className="block h-[0.5cqw] w-[4.4cqw] bg-current" />
                <span className="block h-[0.5cqw] w-[4.4cqw] bg-current" />
                <span className="block h-[0.5cqw] w-[4.4cqw] bg-current" />
              </span>
            </span>
          </span>
          <span
            className={cn(morph, "rounded-full p-[0.7cqw]")}
            style={{
              ...only(!site),
              left: "6cqw",
              top: "21cqw",
              width: "20cqw",
              height: "20cqw",
              background: "linear-gradient(45deg, #e5a03a, #d9468a, #8a3ab9)",
            }}
          >
            <span className="block size-full rounded-full border-[0.8cqw] border-white" style={{ background: "linear-gradient(135deg, #e0a46b, #8c5634)" }} />
          </span>
          <span className={morph} style={{ ...only(!site), left: "32cqw", top: "25cqw", width: "62cqw" }}>
            <span className="grid grid-cols-3 text-center">
              {[
                ["248", "posts"],
                ["12.4k", "followers"],
                ["310", "following"],
              ].map(([n, l]) => (
                <span key={l}>
                  <span className="block text-[4.2cqw] font-bold">{n}</span>
                  <span className="block text-[2.8cqw] opacity-70">{l}</span>
                </span>
              ))}
            </span>
          </span>
          <span className={morph} style={{ ...only(!site), left: "6cqw", top: "45cqw", width: "88cqw" }}>
            <span className="block text-[3.8cqw] font-semibold">Chai Adda</span>
            <span className="block text-[3.3cqw] opacity-60">Café · Kolkata</span>
            <span className="block text-[3.3cqw]">Fresh chai, every evening ☕</span>
            <span className="block text-[3.3cqw] font-semibold text-[#3a2a8c]">chaiadda.in</span>
          </span>
          <span className={morph} style={{ ...only(!site), left: "6cqw", top: "69cqw", width: "88cqw" }}>
            <span className="grid grid-cols-2 gap-[2cqw] text-center text-[3.2cqw] font-semibold">
              <span className="block rounded-[2cqw] bg-[#e5a03a] py-[1.8cqw] text-[#2a1630]">Follow</span>
              <span className="block rounded-[2cqw] bg-[#f1ece6] py-[1.8cqw]">Message</span>
            </span>
          </span>
          <span className={morph} style={{ ...only(!site), left: "8cqw", top: "193cqw", width: "84cqw" }}>
            <span className="flex justify-between">
              {[0, 1, 2, 3, 4].map((i) => (
                <span key={i} className={cn("block size-[5cqw] border-[0.5cqw] border-current", i === 4 ? "rounded-full" : "rounded-[1.4cqw]")} />
              ))}
            </span>
          </span>

          {/* Website: header, headline, button and section label */}
          <span className={morph} style={{ ...only(site, 250), left: "6cqw", top: "10.5cqw" }}>
            <span className="font-serif text-[5.6cqw]">Chai Adda</span>
          </span>
          <span className={morph} style={{ ...only(site, 250), left: "86cqw", top: "12.5cqw" }}>
            <span className="flex flex-col gap-[1cqw]">
              <span className="block h-[0.6cqw] w-[6cqw] bg-current" />
              <span className="block h-[0.6cqw] w-[6cqw] bg-current" />
            </span>
          </span>
          <span className={morph} style={{ ...only(site, 450), left: "6cqw", top: "83cqw", width: "88cqw" }}>
            <span className="block text-[2.6cqw] font-semibold tracking-[0.2em] opacity-60">CAFÉ · KOLKATA</span>
            <span className="mt-[1.5cqw] block font-serif text-[8cqw] leading-[1.05]">Fresh chai, every evening</span>
          </span>
          <span className={morph} style={{ ...only(site, 550), left: "6cqw", top: "113cqw", width: "88cqw" }}>
            <span className="block rounded-full py-[2.8cqw] text-center text-[3.4cqw] font-semibold text-white" style={{ background: INK }}>
              Book a table →
            </span>
          </span>
          <span className={morph} style={{ ...only(site, 600), left: "6cqw", top: "130cqw" }}>
            <span className="font-serif text-[4.4cqw]">On the menu</span>
          </span>

          {/* The nine posts, which travel between the two layouts */}
          {tones.map(([from, to], i) => {
            const delay = site ? i * 45 : (8 - i) * 30
            return (
              <span
                key={i}
                className={cn(morph, "overflow-hidden")}
                style={{ ...box(site ? siteTiles[i] : instaTiles[i], delay), background: `linear-gradient(${120 + i * 25}deg, ${from}, ${to})` }}
              >
                <span
                  className="absolute aspect-square rounded-full bg-white/35"
                  style={{ width: "34%", left: `${18 + (i % 3) * 10}%`, top: `${16 + (i % 2) * 18}%` }}
                />
                <span className="absolute -right-[18%] -bottom-[30%] aspect-square w-[72%] rounded-full bg-white/20" />
              </span>
            )
          })}

          <span
            className={cn(morph, "grid place-items-center rounded-full bg-[#1fa855] text-white shadow-lg")}
            style={{ ...only(site, 700), left: "79cqw", top: "182cqw", width: "14cqw", height: "14cqw" }}
          >
            <span className="block size-[5cqw] rounded-full border-[0.7cqw] border-white" />
          </span>
        </div>
      </div>
    </div>
  )
}
