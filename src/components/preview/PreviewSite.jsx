import { ArrowRightIcon, ClockIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react"
import { InstagramIcon, WhatsAppIcon } from "@/components/common/Icons"
import { cn } from "@/lib/utils"

// A small but complete client website. Colours come from --pv-* variables set
// by the parent, and the layout switches from phone to desktop with container
// queries (@2xl), so the same component fills both preview frames.

function Art({ className }) {
  return (
    <div
      className={cn("pv-art relative overflow-hidden", className)}
      style={{ background: "linear-gradient(135deg, var(--pv-from), var(--pv-to))" }}
    >
      <span className="absolute top-[16%] left-[14%] aspect-square w-[26%] rounded-full bg-white/35" />
      <span className="absolute -right-[12%] -bottom-[34%] aspect-square w-[70%] rounded-full bg-white/20" />
    </div>
  )
}

function Tap({ kind, onAction, className, children, ...props }) {
  return (
    <button type="button" onClick={() => onAction(kind)} className={cn("cursor-pointer", className)} {...props}>
      {children}
    </button>
  )
}

export default function PreviewSite({ name, preset, headingStyle, onAction }) {
  const heading = headingStyle === "classic" ? "font-serif font-normal" : "font-sans font-bold tracking-tight"
  const primary =
    "inline-flex items-center justify-center gap-1.5 rounded-full bg-(--pv-accent) px-4 py-2.5 text-[12px] font-semibold text-(--pv-accent-ink) transition-colors duration-500 @2xl:px-6 @2xl:py-3 @2xl:text-sm"
  const whatsapp =
    "inline-flex items-center justify-center gap-1.5 rounded-full bg-[#1fa855] px-4 py-2.5 text-[12px] font-semibold text-white @2xl:px-6 @2xl:py-3 @2xl:text-sm"

  return (
    <div className="@container min-h-full bg-(--pv-bg) text-[13px] text-(--pv-ink) transition-colors duration-500">
      <header className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-(--pv-ink)/10 bg-(--pv-bg)/90 px-4 py-3 backdrop-blur transition-colors duration-500 @2xl:px-10 @2xl:py-4">
        <span className="flex min-w-0 items-center gap-2">
          <span className="grid size-7 shrink-0 place-items-center rounded-full bg-(--pv-accent) text-[12px] font-bold text-(--pv-accent-ink) transition-colors duration-500">
            {name.charAt(0).toUpperCase()}
          </span>
          <span className={cn("truncate text-[15px] @2xl:text-lg", heading)}>{name}</span>
        </span>
        <nav className="hidden items-center gap-6 text-sm opacity-75 @2xl:flex">
          <Tap kind="menu" onAction={onAction}>{preset.itemsTitle}</Tap>
          <Tap kind="menu" onAction={onAction}>About</Tap>
          <Tap kind="map" onAction={onAction}>Visit</Tap>
        </nav>
        <Tap kind="whatsapp" onAction={onAction} className={cn(whatsapp, "hidden @2xl:inline-flex")}>
          <WhatsAppIcon className="size-4" /> WhatsApp
        </Tap>
        <Tap kind="menu" onAction={onAction} aria-label="Menu" className="@2xl:hidden">
          <MenuIcon className="size-5" />
        </Tap>
      </header>

      <div key={preset.id} className="step-in">
        <section className="grid gap-5 px-4 pt-5 pb-8 @2xl:grid-cols-2 @2xl:items-center @2xl:gap-10 @2xl:px-10 @2xl:py-14">
          <Art className="aspect-[4/3] rounded-2xl @2xl:order-2 @2xl:aspect-[5/4] @2xl:rounded-3xl" />
          <div>
            <p className="text-[10px] font-semibold tracking-[0.18em] uppercase opacity-60 @2xl:text-xs">
              {preset.eyebrow} · {preset.city}
            </p>
            <h1 className={cn("mt-2 text-[28px] leading-[1.08] @2xl:text-5xl", heading)}>{preset.headline}</h1>
            <p className="mt-3 leading-relaxed opacity-75 @2xl:text-base">{preset.intro}</p>
            <div className="mt-5 flex flex-col gap-2 @2xl:flex-row @2xl:gap-3">
              <Tap kind="cta" onAction={onAction} className={primary}>
                {preset.cta} <ArrowRightIcon className="size-3.5" />
              </Tap>
              <Tap kind="whatsapp" onAction={onAction} className={whatsapp}>
                <WhatsAppIcon className="size-4" /> Chat on WhatsApp
              </Tap>
            </div>
          </div>
        </section>

        <section className="bg-(--pv-soft) px-4 py-8 transition-colors duration-500 @2xl:px-10 @2xl:py-14">
          <h2 className={cn("text-xl @2xl:text-3xl", heading)}>{preset.itemsTitle}</h2>
          <div className="mt-4 grid gap-3 @2xl:mt-6 @2xl:grid-cols-3 @2xl:gap-5">
            {preset.items.map((item, i) => (
              <Tap
                key={item.name}
                kind="item"
                onAction={onAction}
                className="flex items-center gap-3 rounded-xl bg-(--pv-bg) p-3 text-left transition-colors duration-500 @2xl:flex-col @2xl:items-stretch @2xl:p-4"
              >
                <Art
                  className={cn(
                    "aspect-square w-14 shrink-0 rounded-lg @2xl:w-full @2xl:rounded-xl",
                    i === 1 && "opacity-80",
                    i === 2 && "opacity-65"
                  )}
                />
                <span className="flex min-w-0 flex-1 items-start justify-between gap-2">
                  <span className="min-w-0">
                    <span className="block font-semibold @2xl:text-base">{item.name}</span>
                    <span className="block text-[12px] opacity-65 @2xl:text-sm">{item.detail}</span>
                  </span>
                  <span className="shrink-0 font-semibold @2xl:text-base">{item.price}</span>
                </span>
              </Tap>
            ))}
          </div>
        </section>

        <section className="px-4 py-8 @2xl:px-10 @2xl:py-14">
          <div className="flex items-center gap-1 text-(--pv-accent) transition-colors duration-500">
            {[0, 1, 2, 3, 4].map((i) => (
              <StarIcon key={i} className="size-4 fill-current" />
            ))}
            <span className="ml-2 text-[12px] text-(--pv-ink) opacity-70">4.9 on Google</span>
          </div>
          <blockquote className={cn("mt-3 text-lg leading-snug @2xl:max-w-2xl @2xl:text-2xl", heading)}>
            “{preset.review.quote}”
          </blockquote>
          <p className="mt-2 text-[12px] opacity-60">{preset.review.name}</p>
        </section>

        <section className="grid gap-4 px-4 pb-10 @2xl:grid-cols-2 @2xl:items-center @2xl:gap-10 @2xl:px-10 @2xl:pb-16">
          <Tap
            kind="map"
            onAction={onAction}
            aria-label="Map"
            className="relative grid aspect-[16/9] place-items-center overflow-hidden rounded-2xl bg-(--pv-soft) transition-colors duration-500"
          >
            <span
              aria-hidden
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "linear-gradient(var(--pv-bg) 2px, transparent 2px), linear-gradient(90deg, var(--pv-bg) 2px, transparent 2px)",
                backgroundSize: "28px 28px",
              }}
            />
            <MapPinIcon className="relative size-8 fill-(--pv-accent) text-(--pv-bg) transition-colors duration-500" />
          </Tap>
          <div>
            <h2 className={cn("text-xl @2xl:text-3xl", heading)}>Come say hello</h2>
            <p className="mt-3 flex items-start gap-2 opacity-75">
              <MapPinIcon className="mt-0.5 size-4 shrink-0" /> {preset.city}
            </p>
            <p className="mt-1.5 flex items-start gap-2 opacity-75">
              <ClockIcon className="mt-0.5 size-4 shrink-0" /> {preset.hours}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Tap kind="whatsapp" onAction={onAction} className={whatsapp}>
                <WhatsAppIcon className="size-4" /> Message us
              </Tap>
              <Tap
                kind="instagram"
                onAction={onAction}
                className="inline-flex items-center gap-1.5 rounded-full border border-(--pv-ink)/20 px-4 py-2.5 text-[12px] font-semibold @2xl:px-6 @2xl:py-3 @2xl:text-sm"
              >
                <InstagramIcon className="size-4" /> Instagram
              </Tap>
            </div>
          </div>
        </section>
      </div>

      <footer className="border-t border-(--pv-ink)/10 px-4 py-5 text-[11px] opacity-60 @2xl:px-10">
        © 2026 {name} · {preset.city}
      </footer>

      {/* Floating WhatsApp button, like on the real thing */}
      <div className="pointer-events-none sticky bottom-3 flex h-0 justify-end px-3 @2xl:bottom-5 @2xl:px-6">
        <Tap
          kind="whatsapp"
          onAction={onAction}
          aria-label="WhatsApp"
          className="pointer-events-auto grid size-11 -translate-y-full place-items-center rounded-full bg-[#1fa855] text-white shadow-lg @2xl:size-12"
        >
          <WhatsAppIcon className="size-5" />
        </Tap>
      </div>
    </div>
  )
}
