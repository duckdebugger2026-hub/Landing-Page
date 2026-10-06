import { useEffect, useRef, useState } from "react"
import { ArrowRightIcon, CheckIcon, InfoIcon, MonitorIcon, MousePointerClickIcon, SmartphoneIcon } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Reveal from "@/components/common/Reveal"
import { BrowserFrame, PhoneFrame } from "@/components/preview/DeviceFrames"
import PreviewSite from "@/components/preview/PreviewSite"
import { palettes, presets } from "@/data/previewPresets"
import { cn } from "@/lib/utils"
import { Eyebrow } from "./SectionHeading"

const headingStyles = [
  { id: "classic", label: "Classic", sample: "font-serif" },
  { id: "modern", label: "Modern", sample: "font-sans font-bold" },
]

function noticeFor(kind, preset, name) {
  switch (kind) {
    case "cta":
      return preset.ctaNotice
    case "whatsapp":
      return `Opens WhatsApp with “Hi ${name}!” ready to send.`
    case "item":
      return "Customers can ask about any item on WhatsApp."
    case "map":
      return "Opens Google Maps with directions to you."
    case "instagram":
      return "Takes customers straight to your Instagram."
    default:
      return "Opens a simple menu with all your pages."
  }
}

function slugify(name) {
  return name.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "") || "yourbusiness"
}

function Segmented({ label, options, value, onChange }) {
  return (
    <div role="radiogroup" aria-label={label} className="inline-flex rounded-full border bg-surface p-1">
      {options.map((option) => (
        <button
          key={option.id}
          type="button"
          role="radio"
          aria-checked={value === option.id}
          onClick={() => onChange(option.id)}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm transition-colors duration-200",
            value === option.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-ink"
          )}
        >
          {option.icon}
          <span className={option.sample}>{option.label}</span>
        </button>
      ))}
    </div>
  )
}

export default function LivePreview() {
  const [name, setName] = useState("")
  const [presetId, setPresetId] = useState("cafe")
  const [paletteId, setPaletteId] = useState(null)
  const [headingStyle, setHeadingStyle] = useState("classic")
  const [device, setDevice] = useState("phone")
  const [notice, setNotice] = useState(null)
  const timer = useRef(0)

  const preset = presets.find((p) => p.id === presetId)
  // Until a colour is picked, each business type brings its own palette.
  const palette = palettes.find((p) => p.id === (paletteId ?? preset.palette))
  const displayName = name.trim() || preset.sample

  useEffect(() => () => clearTimeout(timer.current), [])

  function showNotice(kind) {
    setNotice({ id: Date.now(), text: noticeFor(kind, preset, displayName) })
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setNotice(null), 3200)
  }

  function wantThis() {
    const message = [
      "Hi! I tried the live preview on your website and I'd like something like this.",
      `Business: ${displayName} (${preset.label})`,
      `Colour: ${palette.label}`,
      `Style: ${headingStyles.find((s) => s.id === headingStyle).label}`,
    ].join("\n")
    window.dispatchEvent(new CustomEvent("enquiry:prefill", { detail: { message } }))
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
    toast.success("Added to the enquiry form", { description: "Add your name and number, then send." })
  }

  const vars = {
    "--pv-bg": palette.bg,
    "--pv-ink": palette.ink,
    "--pv-accent": palette.accent,
    "--pv-accent-ink": palette.accentInk,
    "--pv-soft": palette.soft,
    "--pv-from": palette.from,
    "--pv-to": palette.to,
  }

  const site = (
    <PreviewSite name={displayName} preset={preset} headingStyle={headingStyle} onAction={showNotice} />
  )

  return (
    <section id="preview" className="overflow-hidden bg-surface px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-[1fr_1.25fr] lg:gap-14">
        <Reveal className="lg:sticky lg:top-24">
          <Eyebrow>Try it</Eyebrow>
          <h2 className="mt-3 text-3xl text-ink sm:text-5xl">See your business here</h2>
          <p className="mt-4 max-w-md text-muted-foreground">
            Type your business name and watch your website come together. It's a real preview: scroll it
            and tap the buttons.
          </p>

          <div className="mt-8 space-y-6">
            <div>
              <Label htmlFor="preview-name" className="mb-2 text-ink">
                Business name
              </Label>
              <Input
                id="preview-name"
                value={name}
                maxLength={28}
                autoComplete="organization"
                onChange={(e) => setName(e.target.value)}
                placeholder={`e.g. ${preset.sample}`}
                className="h-11 max-w-sm bg-surface text-base"
              />
            </div>

            <div>
              <p className="mb-2 text-sm font-medium text-ink">Type of business</p>
              <div role="radiogroup" aria-label="Type of business" className="flex flex-wrap gap-2">
                {presets.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    role="radio"
                    aria-checked={presetId === p.id}
                    onClick={() => setPresetId(p.id)}
                    className={cn(
                      "rounded-full border px-4 py-2 text-sm transition-colors duration-200",
                      presetId === p.id
                        ? "border-ink bg-primary text-primary-foreground"
                        : "bg-surface text-ink hover:border-ink/40"
                    )}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 text-sm font-medium text-ink">
                Colour <span className="font-normal text-muted-foreground">· {palette.label}</span>
              </p>
              <div role="radiogroup" aria-label="Colour" className="flex flex-wrap gap-2.5">
                {palettes.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    role="radio"
                    aria-checked={palette.id === p.id}
                    aria-label={p.label}
                    title={p.label}
                    onClick={() => setPaletteId(p.id)}
                    className={cn(
                      "grid size-9 place-items-center rounded-full ring-offset-2 ring-offset-surface transition duration-200 hover:scale-110",
                      palette.id === p.id ? "ring-2 ring-ink" : "ring-1 ring-black/10"
                    )}
                    style={{ background: `linear-gradient(135deg, ${p.from}, ${p.accent})` }}
                  >
                    {palette.id === p.id && <CheckIcon className="size-4 text-white drop-shadow" strokeWidth={3} />}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 text-sm font-medium text-ink">Heading style</p>
              <Segmented label="Heading style" options={headingStyles} value={headingStyle} onChange={setHeadingStyle} />
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
            <Button onClick={wantThis} className="h-11 rounded-full px-6 text-[15px]">
              I want this one
              <ArrowRightIcon className="transition-transform duration-300 group-hover/button:translate-x-0.5" />
            </Button>
            <a
              href="#estimate"
              className="text-sm font-medium text-ink underline decoration-marigold decoration-2 underline-offset-4"
            >
              Estimate the price
            </a>
          </div>

          <p className="mt-6 flex max-w-md gap-2.5 rounded-xl border border-marigold/40 bg-glow/40 p-3.5 text-sm leading-relaxed text-ink/80">
            <InfoIcon className="mt-0.5 size-4 shrink-0 text-marigold" />
            <span>
              These are sample formats to give you a feel for the result. Your actual website is designed
              around your business, and we finalise the design together after a free consultation.
            </span>
          </p>
        </Reveal>

        <Reveal delay={120} style={vars}>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <Segmented
              label="Device"
              value={device}
              onChange={setDevice}
              options={[
                { id: "phone", label: "Phone", icon: <SmartphoneIcon className="size-4" /> },
                { id: "desktop", label: "Desktop", icon: <MonitorIcon className="size-4" /> },
              ]}
            />
            <p className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <MousePointerClickIcon className="size-4 text-marigold" />
              Scroll and tap inside
            </p>
          </div>

          <div key={device} className="step-in relative">
            {device === "phone" ? (
              <>
                <div
                  aria-hidden
                  className="absolute top-1/2 left-1/2 aspect-square w-[min(560px,110%)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-glow/60"
                />
                <div className="relative">
                  <PhoneFrame notice={notice}>{site}</PhoneFrame>
                </div>
              </>
            ) : (
              <BrowserFrame url={`${slugify(displayName)}.in`} notice={notice}>
                {site}
              </BrowserFrame>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
