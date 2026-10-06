import { ArrowRightIcon, CheckIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import Reveal from "@/components/common/Reveal"
import { packages } from "@/data/site"
import { cn } from "@/lib/utils"
import SectionHeading from "./SectionHeading"

export default function Pricing() {
  return (
    <section id="pricing" className="bg-band px-4 py-20 sm:px-6 sm:py-28">
      <SectionHeading
        inverted
        eyebrow="Pricing"
        title="Simple packages, clear prices"
        intro="Pick a starting point. Every package includes a mobile-friendly design, an enquiry form connected to Google Sheets and a WhatsApp chat button."
      />
      <div className="mx-auto mt-14 grid max-w-5xl items-stretch gap-5 md:grid-cols-3">
        {packages.map((pkg, i) => (
          <Reveal key={pkg.name} delay={i * 120} className="h-full">
          <article
            className={cn(
              "relative flex h-full flex-col rounded-2xl p-6 transition duration-300 ease-out hover:-translate-y-1",
              pkg.popular
                ? "border-2 border-marigold bg-background text-ink shadow-2xl shadow-black/30"
                : "border border-white/10 bg-band-soft text-white hover:border-white/25"
            )}
          >
            {pkg.popular && (
              <Badge className="absolute -top-3 right-5 rounded-full bg-marigold px-3 text-plum">
                Most popular
              </Badge>
            )}
            <h3 className="text-xl">{pkg.name}</h3>
            <p className={cn("mt-1 text-sm", pkg.popular ? "text-muted-foreground" : "text-white/65")}>
              {pkg.blurb}
            </p>
            <p className="mt-6 flex items-baseline gap-2">
              <span className="font-serif text-4xl">{pkg.price}</span>
              <span className={cn("text-xs", pkg.popular ? "text-muted-foreground" : "text-white/60")}>
                one-time
              </span>
            </p>
            <a
              href="#contact"
              data-package={pkg.name}
              className={cn(
                buttonVariants({ variant: pkg.popular ? "default" : "outline" }),
                "mt-6 h-10 rounded-full",
                !pkg.popular && "border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white"
              )}
            >
              Choose {pkg.name}
              <ArrowRightIcon className="transition-transform duration-300 group-hover/button:translate-x-0.5" />
            </a>
            <ul className="mt-6 space-y-2.5 text-sm">
              {pkg.features.map((feature) => (
                <li key={feature} className="flex gap-2.5">
                  <CheckIcon className="mt-0.5 size-4 shrink-0 text-marigold" />
                  <span className={pkg.popular ? "text-ink" : "text-white/85"}>{feature}</span>
                </li>
              ))}
            </ul>
          </article>
          </Reveal>
        ))}
      </div>
      <p className="mt-10 text-center text-sm text-white/55">
        Domain and hosting billed at actual cost. No monthly fees.
      </p>
      <p className="mt-3 text-center">
        <a
          href="#estimate"
          className="group inline-flex items-center gap-1.5 text-sm font-medium text-marigold underline-offset-4 hover:underline"
        >
          Need something different? Build your own package
          <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </a>
      </p>
    </section>
  )
}
