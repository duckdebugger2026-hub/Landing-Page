import { useEffect, useState } from "react"
import { ArrowRightIcon, ChevronRightIcon, Loader2Icon, SheetIcon } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { InstagramIcon, WhatsAppIcon } from "@/components/common/Icons"
import Reveal from "@/components/common/Reveal"
import { Eyebrow } from "./SectionHeading"
import { instagramLink, packages, site, whatsappLink } from "@/data/site"
import { Em, Mark } from "@/components/common/Type"

const packageItems = [
  ...packages.map((p) => ({ value: p.name, label: `${p.name} – ${p.price}` })),
  { value: "Custom estimate", label: "Custom estimate" },
  { value: "Not sure yet", label: "Not sure yet" },
]

const fieldClass = "h-10 bg-surface"

export default function Contact() {
  const [pkg, setPkg] = useState("Business")
  const [message, setMessage] = useState("")
  const [sending, setSending] = useState(false)

  // "Choose Starter" etc. in the pricing section preselect the package here.
  useEffect(() => {
    function onClick(e) {
      const el = e.target.closest("[data-package]")
      if (el?.dataset.package) setPkg(el.dataset.package)
    }
    document.addEventListener("click", onClick)
    return () => document.removeEventListener("click", onClick)
  }, [])

  // The estimator and the live preview can hand over a summary of what the visitor chose.
  useEffect(() => {
    function onPrefill(e) {
      if (e.detail.pkg) setPkg(e.detail.pkg)
      setMessage(e.detail.message)
    }
    window.addEventListener("enquiry:prefill", onPrefill)
    return () => window.removeEventListener("enquiry:prefill", onPrefill)
  }, [])

  async function onSubmit(e) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    // Bots fill every field; people never see this one.
    if (data.get("website")) return

    const enquiry = {
      name: String(data.get("name") ?? "").trim(),
      business: String(data.get("business") ?? "").trim(),
      whatsapp: String(data.get("whatsapp") ?? "").trim(),
      package: pkg,
      message: message.trim(),
    }

    if (!site.sheetEndpoint) {
      // No sheet connected yet: hand the enquiry over on WhatsApp instead.
      const text = [
        `Hi! I'm ${enquiry.name} from ${enquiry.business}.`,
        `Package: ${enquiry.package}`,
        enquiry.message && `About the website: ${enquiry.message}`,
      ]
        .filter(Boolean)
        .join("\n")
      window.open(whatsappLink(text), "_blank", "noopener,noreferrer")
      return
    }

    setSending(true)
    try {
      // Form-encoded body keeps this a "simple" request, so Apps Script
      // accepts it without a CORS preflight.
      const res = await fetch(site.sheetEndpoint, {
        method: "POST",
        body: new URLSearchParams(enquiry),
      })
      const json = await res.json().catch(() => ({ ok: res.ok }))
      if (!res.ok || json.ok === false) throw new Error("Request failed")
      form.reset()
      setPkg("Business")
      setMessage("")
      toast.success("Enquiry sent", {
        description: "Thank you! We'll reply on WhatsApp within 24 hours.",
      })
    } catch {
      toast.error("Couldn't send your enquiry", {
        description: "Please try again, or message us on WhatsApp.",
        action: { label: "WhatsApp", onClick: () => window.open(whatsappLink(), "_blank") },
      })
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="contact" data-tone="blush" className="px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 md:grid-cols-[1fr_1.15fr] md:gap-14">
        <Reveal>
          <Eyebrow>Contact</Eyebrow>
          <h2 className="mt-4 text-[2rem] leading-[1.08] text-ink sm:text-[2.9rem]">Tell us about <Em>your business</Em></h2>
          <p className="mt-4 max-w-md text-muted-foreground">
            Share a few details and we will send <Mark>a free quote and a homepage idea</Mark>. Prefer to talk?
            Message us on WhatsApp.
          </p>
          <div className="mt-8 space-y-3">
            <ContactCard
              href={whatsappLink()}
              icon={<WhatsAppIcon className="size-5 text-whatsapp" />}
              title="Chat on WhatsApp"
              detail={`${site.whatsappDisplay}, usually replies in an hour`}
            />
            <ContactCard
              href={instagramLink}
              icon={<InstagramIcon className="size-5 text-[#c13584]" />}
              title="See our work on Instagram"
              detail={`@${site.instagram}`}
            />
          </div>
        </Reveal>

        <Reveal delay={120}>
        <form
          onSubmit={onSubmit}
          className="relative rounded-2xl border bg-surface p-5 shadow-xl shadow-plum/5 sm:p-7"
          aria-label="Enquiry form"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="name" label="Your name">
              <Input id="name" name="name" required autoComplete="name" placeholder="Priya Sharma" className={fieldClass} />
            </Field>
            <Field id="business" label="Business name">
              <Input id="business" name="business" required autoComplete="organization" placeholder="Chai Adda Café" className={fieldClass} />
            </Field>
            <Field id="whatsapp" label="WhatsApp number">
              <Input
                id="whatsapp"
                name="whatsapp"
                type="tel"
                required
                autoComplete="tel"
                inputMode="tel"
                pattern="[0-9+\s\-]{10,16}"
                title="Enter a 10-digit number, with or without +91"
                placeholder="+91 98300 00000"
                className={fieldClass}
              />
            </Field>
            <Field id="package" label="Package">
              <Select value={pkg} onValueChange={(v) => v && setPkg(v)} items={packageItems}>
                <SelectTrigger id="package" className="w-full bg-surface data-[size=default]:h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {packageItems.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field id="message" label="What do you need?" className="sm:col-span-2">
              <Textarea
                id="message"
                name="message"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us about your business and what the website should do."
                className="min-h-28 bg-surface"
              />
            </Field>
            <div aria-hidden className="absolute -left-[9999px]">
              <label htmlFor="website">Leave this empty</label>
              <input id="website" name="website" tabIndex={-1} autoComplete="off" />
            </div>
          </div>
          <Button type="submit" disabled={sending} className="mt-6 h-11 w-full rounded-full text-[15px]">
            {sending && <Loader2Icon className="animate-spin" />}
            {sending ? "Sending…" : "Send enquiry"}
            {!sending && (
              <ArrowRightIcon className="transition-transform duration-300 group-hover/button:translate-x-0.5" />
            )}
          </Button>
          <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
            <SheetIcon className="size-3.5 text-whatsapp" />
            Saved securely to our Google Sheet. We reply within 24 hours.
          </p>
        </form>
        </Reveal>
      </div>
    </section>
  )
}

function Field({ id, label, className, children }) {
  return (
    <div className={className}>
      <Label htmlFor={id} className="mb-2 text-ink">
        {label}
      </Label>
      {children}
    </div>
  )
}

function ContactCard({ href, icon, title, detail }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-4 rounded-2xl border bg-surface p-4 transition duration-300 hover:-translate-y-0.5 hover:border-ink/20 hover:shadow-lg hover:shadow-plum/5"
    >
      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-background">{icon}</span>
      <span className="min-w-0 flex-1">
        <span className="block font-medium text-ink">{title}</span>
        <span className="block truncate text-sm text-muted-foreground">{detail}</span>
      </span>
      <ChevronRightIcon className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
    </a>
  )
}
