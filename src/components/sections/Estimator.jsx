import { useMemo, useState } from "react"
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon, ClipboardPenLineIcon } from "lucide-react"
import { toast } from "sonner"
import { Button, buttonVariants } from "@/components/ui/button"
import { WhatsAppIcon } from "@/components/common/Icons"
import Reveal from "@/components/common/Reveal"
import { whatsappLink } from "@/data/site"
import {
  businessTypes,
  carePlans,
  contentOptions,
  features,
  logo,
  sizes,
  timelines,
} from "@/data/estimator"
import { useCountUp } from "@/hooks/useCountUp"
import { formatINR } from "@/lib/format"
import { cn } from "@/lib/utils"
import SectionHeading from "./SectionHeading"
import { Em } from "@/components/common/Type"

const steps = [
  { label: "Business", title: "What kind of business is it?" },
  { label: "Size", title: "How big should the website be?" },
  { label: "Features", title: "What should it do?", hint: "Pick as many as you like." },
  { label: "Content", title: "Who provides the content?" },
  { label: "Launch", title: "When do you want to go live?" },
]

function OptionCard({ type = "radio", selected, onSelect, label, detail, meta, badge }) {
  return (
    <button
      type="button"
      role={type}
      aria-checked={selected}
      onClick={onSelect}
      className={cn(
        "flex w-full items-start gap-3 rounded-xl border bg-surface p-4 text-left transition duration-200 outline-none hover:border-ink/30 hover:shadow-md hover:shadow-plum/5 focus-visible:ring-3 focus-visible:ring-ring/50",
        selected && "border-ink shadow-md shadow-plum/10"
      )}
    >
      <span
        className={cn(
          "mt-0.5 grid size-5 shrink-0 place-items-center border transition-colors duration-200",
          type === "radio" ? "rounded-full" : "rounded-md",
          selected ? "border-ink bg-primary text-primary-foreground" : "border-input bg-surface"
        )}
      >
        {selected && <CheckIcon className="size-3.5" strokeWidth={3} />}
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="font-medium text-ink">{label}</span>
          {badge && (
            <span className="rounded-full bg-glow px-2 py-0.5 text-[11px] font-medium text-ink">{badge}</span>
          )}
        </span>
        {detail && <span className="mt-0.5 block text-sm text-muted-foreground">{detail}</span>}
      </span>
      {meta && <span className="shrink-0 pt-0.5 text-sm font-medium text-ink tabular-nums">{meta}</span>}
    </button>
  )
}

function Group({ label, children, className }) {
  return (
    <div role="group" aria-label={label} className={cn("grid gap-3", className)}>
      {children}
    </div>
  )
}

function GroupLabel({ children }) {
  return <p className="mb-3 text-sm font-medium text-muted-foreground">{children}</p>
}

export default function Estimator() {
  const [step, setStep] = useState(0)
  const [business, setBusiness] = useState(null)
  const [size, setSize] = useState("five")
  const [selected, setSelected] = useState([])
  const [featuresTouched, setFeaturesTouched] = useState(false)
  const [content, setContent] = useState("ready")
  const [wantsLogo, setWantsLogo] = useState(false)
  const [timeline, setTimeline] = useState("standard")
  const [care, setCare] = useState("none")

  const businessItem = businessTypes.find((b) => b.id === business)
  const recommended = businessItem?.recommends ?? []

  const quote = useMemo(() => {
    const sizeItem = sizes.find((s) => s.id === size)
    const contentItem = contentOptions.find((c) => c.id === content)
    const timelineItem = timelines.find((t) => t.id === timeline)
    const careItem = carePlans.find((c) => c.id === care)

    const lines = [
      { label: `${sizeItem.label} website`, amount: sizeItem.price },
      ...features.filter((f) => selected.includes(f.id)).map((f) => ({ label: f.label, amount: f.price })),
    ]
    if (contentItem.price) lines.push({ label: contentItem.label, amount: contentItem.price })
    if (wantsLogo) lines.push({ label: logo.label, amount: logo.price })

    const subtotal = lines.reduce((sum, line) => sum + line.amount, 0)
    const rush = Math.round((subtotal * timelineItem.surcharge) / 100) * 100
    return {
      lines,
      rush,
      total: subtotal + rush,
      monthly: careItem.monthly,
      closest: sizeItem.package,
      sizeItem,
      contentItem,
      timelineItem,
    }
  }, [size, selected, content, wantsLogo, timeline, care])

  const total = useCountUp(quote.total)

  function chooseBusiness(id) {
    setBusiness(id)
    if (!featuresTouched) setSelected(businessTypes.find((b) => b.id === id).recommends)
    setTimeout(() => setStep(1), 250)
  }

  function toggleFeature(id) {
    setFeaturesTouched(true)
    setSelected((current) => (current.includes(id) ? current.filter((f) => f !== id) : [...current, id]))
  }

  function summaryText() {
    const chosen = features.filter((f) => selected.includes(f.id)).map((f) => f.label)
    return [
      "Hi! I used the package estimator on your website.",
      businessItem && `Business: ${businessItem.label}`,
      `Size: ${quote.sizeItem.label}`,
      `Features: ${chosen.length ? chosen.join(", ") : "None extra"}`,
      `Content: ${quote.contentItem.label}`,
      `Logo design: ${wantsLogo ? "Yes" : "No"}`,
      `Launch: ${quote.timelineItem.label} (${quote.timelineItem.detail.toLowerCase()})`,
      `Care plan: ${quote.monthly ? "Yes" : "No"}`,
      `Estimate: ${formatINR(quote.total)} one-time${quote.monthly ? ` + ${formatINR(quote.monthly)}/month` : ""}`,
    ]
      .filter(Boolean)
      .join("\n")
  }

  function addToEnquiry() {
    window.dispatchEvent(
      new CustomEvent("enquiry:prefill", { detail: { pkg: "Custom estimate", message: summaryText() } })
    )
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
    toast.success("Added to the enquiry form", { description: "Add your name and number, then send." })
  }

  const current = steps[step]
  const isLast = step === steps.length - 1

  return (
    <section id="estimate" data-tone="blush" className="px-4 py-20 sm:px-6 sm:py-28">
      <SectionHeading
        eyebrow="Estimator"
        title={<>Build your <Em>own</Em> package</>}
        intro="Answer five quick questions and watch the price update as you go. No sign-up, no obligation."
      />

      <Reveal delay={100} className="mx-auto mt-14 grid grid-cols-1 max-w-6xl items-start gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="rounded-2xl border bg-surface/60 p-5 shadow-xl shadow-plum/5 backdrop-blur sm:p-8">
          <ol className="grid grid-cols-5 gap-2" aria-label="Steps">
            {steps.map((s, i) => (
              <li key={s.label}>
                <button
                  type="button"
                  onClick={() => setStep(i)}
                  aria-current={i === step ? "step" : undefined}
                  className="group w-full text-left outline-none"
                >
                  <span className="block h-1 overflow-hidden rounded-full bg-border">
                    <span
                      className={cn(
                        "block h-full rounded-full bg-band transition-[width] duration-500 ease-out",
                        i <= step ? "w-full" : "w-0"
                      )}
                    />
                  </span>
                  <span
                    className={cn(
                      "mt-2 hidden text-xs transition-colors sm:block",
                      i === step ? "font-medium text-ink" : "text-muted-foreground group-hover:text-ink"
                    )}
                  >
                    {i + 1}. {s.label}
                  </span>
                </button>
              </li>
            ))}
          </ol>

          <div key={step} className="step-in mt-8 min-h-[22rem]">
            <p className="font-mono text-[11px] font-medium tracking-[0.16em] text-muted-foreground uppercase sm:hidden">
              Step {step + 1} of {steps.length}
            </p>
            <h3 className="mt-1 text-2xl text-ink sm:mt-0 sm:text-3xl">{current.title}</h3>
            {current.hint && <p className="mt-1 text-sm text-muted-foreground">{current.hint}</p>}

            <div className="mt-6">
              {step === 0 && (
                <Group label={current.title} className="sm:grid-cols-2">
                  {businessTypes.map((b) => (
                    <OptionCard
                      key={b.id}
                      label={b.label}
                      selected={business === b.id}
                      onSelect={() => chooseBusiness(b.id)}
                    />
                  ))}
                </Group>
              )}

              {step === 1 && (
                <Group label={current.title}>
                  {sizes.map((s) => (
                    <OptionCard
                      key={s.id}
                      label={s.label}
                      detail={s.detail}
                      meta={formatINR(s.price)}
                      selected={size === s.id}
                      onSelect={() => setSize(s.id)}
                    />
                  ))}
                </Group>
              )}

              {step === 2 && (
                <Group label={current.title} className="sm:grid-cols-2">
                  {features.map((f) => (
                    <OptionCard
                      key={f.id}
                      type="checkbox"
                      label={f.label}
                      detail={f.detail}
                      meta={`+${formatINR(f.price)}`}
                      badge={recommended.includes(f.id) ? "Popular" : undefined}
                      selected={selected.includes(f.id)}
                      onSelect={() => toggleFeature(f.id)}
                    />
                  ))}
                </Group>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <Group label="Content">
                    {contentOptions.map((c) => (
                      <OptionCard
                        key={c.id}
                        label={c.label}
                        detail={c.detail}
                        meta={c.price ? `+${formatINR(c.price)}` : "Included"}
                        selected={content === c.id}
                        onSelect={() => setContent(c.id)}
                      />
                    ))}
                  </Group>
                  <div>
                    <GroupLabel>Branding</GroupLabel>
                    <OptionCard
                      type="checkbox"
                      label={logo.label}
                      detail={logo.detail}
                      meta={`+${formatINR(logo.price)}`}
                      selected={wantsLogo}
                      onSelect={() => setWantsLogo((v) => !v)}
                    />
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-6">
                  <div>
                    <GroupLabel>Timeline</GroupLabel>
                    <Group label="Timeline" className="sm:grid-cols-2">
                      {timelines.map((t) => (
                        <OptionCard
                          key={t.id}
                          label={t.label}
                          detail={t.detail}
                          meta={t.surcharge ? `+${t.surcharge * 100}%` : undefined}
                          selected={timeline === t.id}
                          onSelect={() => setTimeline(t.id)}
                        />
                      ))}
                    </Group>
                  </div>
                  <div>
                    <GroupLabel>After launch</GroupLabel>
                    <Group label="After launch" className="sm:grid-cols-2">
                      {carePlans.map((c) => (
                        <OptionCard
                          key={c.id}
                          label={c.label}
                          detail={c.detail}
                          meta={c.monthly ? `${formatINR(c.monthly)}/mo` : undefined}
                          selected={care === c.id}
                          onSelect={() => setCare(c.id)}
                        />
                      ))}
                    </Group>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between gap-3 border-t pt-5">
            <Button
              variant="ghost"
              onClick={() => setStep((s) => s - 1)}
              disabled={step === 0}
              className="h-10 rounded-full px-4"
            >
              <ArrowLeftIcon />
              Back
            </Button>
            <p className="text-sm text-muted-foreground lg:hidden">
              <span className="text-lg font-semibold tracking-tight text-ink tabular-nums">{formatINR(total)}</span>
            </p>
            {isLast ? (
              <Button onClick={addToEnquiry} className="h-10 rounded-full px-5">
                Get this quote
                <ArrowRightIcon className="transition-transform duration-300 group-hover/button:translate-x-0.5" />
              </Button>
            ) : (
              <Button onClick={() => setStep((s) => s + 1)} className="h-10 rounded-full px-5">
                Next
                <ArrowRightIcon className="transition-transform duration-300 group-hover/button:translate-x-0.5" />
              </Button>
            )}
          </div>
        </div>

        <aside
          aria-label="Your estimate"
          className="rounded-2xl bg-band p-6 text-white shadow-2xl shadow-plum/25 sm:p-8 lg:sticky lg:top-24"
        >
          <p className="font-mono text-[11px] font-medium tracking-[0.16em] text-white/60 uppercase">Your estimate</p>
          <p className="mt-3 text-5xl font-semibold tracking-[-0.04em] tabular-nums sm:text-6xl" aria-live="polite">
            {formatINR(total)}
          </p>
          <p className="mt-1 text-sm text-white/60">
            one-time
            {quote.monthly > 0 && (
              <span className="text-white/85"> + {formatINR(quote.monthly)}/month care plan</span>
            )}
          </p>
          <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs">
            Closest package: <span className="font-medium text-marigold">{quote.closest}</span>
          </p>

          <ul className="mt-6 space-y-2.5 border-t border-white/10 pt-5 text-sm">
            {quote.lines.map((line) => (
              <li key={line.label} className="line-in flex justify-between gap-4">
                <span className="text-white/75">{line.label}</span>
                <span className="tabular-nums">{formatINR(line.amount)}</span>
              </li>
            ))}
            {quote.rush > 0 && (
              <li className="line-in flex justify-between gap-4">
                <span className="text-white/75">Rush delivery</span>
                <span className="tabular-nums">{formatINR(quote.rush)}</span>
              </li>
            )}
          </ul>

          <div className="mt-6 grid gap-2.5">
            <a
              href={whatsappLink(summaryText())}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants(), "h-11 rounded-full bg-whatsapp text-white hover:bg-whatsapp/90")}
            >
              <WhatsAppIcon />
              Send this on WhatsApp
            </a>
            <Button
              variant="outline"
              onClick={addToEnquiry}
              className="h-11 rounded-full border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white"
            >
              <ClipboardPenLineIcon />
              Add to enquiry form
            </Button>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-white/50">
            An estimate, not a final quote. We confirm the price after a free 15-minute call.
            Domain and hosting are billed at actual cost.
          </p>
        </aside>
      </Reveal>
    </section>
  )
}
