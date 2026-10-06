import { Link } from "react-router"
import { ArrowRightIcon, ArrowUpIcon, MailIcon } from "lucide-react"
import { InstagramIcon, WhatsAppIcon } from "@/components/common/Icons"
import DuckPond from "@/components/footer/DuckPond"
import StudioStatus from "@/components/footer/StudioStatus"
import Wordmark from "@/components/footer/Wordmark"
import Logo from "@/components/layout/Logo"
import { instagramLink, navLinks, site, whatsappLink } from "@/data/site"
import { Em } from "@/components/common/Type"

const year = new Date().getFullYear()

const legal = [
  { label: "Privacy policy", href: "/privacy" },
  { label: "Terms of service", href: "/terms" },
  { label: "Refund policy", href: "/refunds" },
]

const linkClass = "transition-colors hover:text-white"

export default function Footer({ home = true }) {
  // On legal pages, section links point back to the homepage.
  const prefix = home ? "" : import.meta.env.BASE_URL

  return (
    <footer id="site-footer" className="relative isolate overflow-hidden bg-band text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <span className="drift-slow absolute -top-40 -right-40 size-[38rem] rounded-full bg-[radial-gradient(closest-side,rgb(229_160_58/0.22),transparent)]" />
        <span className="drift-slow absolute top-1/3 -left-48 size-[34rem] rounded-full bg-[radial-gradient(closest-side,rgb(210_69_127/0.18),transparent)] [animation-delay:-14s]" />
      </div>
      <div className="mx-auto max-w-6xl px-4 pt-20 sm:px-6 sm:pt-24">
        <div className="grid grid-cols-1 gap-10 border-b border-white/10 pb-14 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <StudioStatus />
            <h2 className="mt-6 max-w-2xl text-4xl leading-[1.04] text-balance sm:text-[3.6rem]">
              Let's give your shop <Em bright>a home online.</Em>
            </h2>
            <p className="mt-5 max-w-lg text-pretty text-white/65">
              Tell us about your business on WhatsApp. You'll get a free quote and a homepage idea, usually
              the same day.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-whatsapp px-6 font-medium whitespace-nowrap text-white transition-transform duration-300 hover:-translate-y-0.5"
            >
              <WhatsAppIcon className="size-5" />
              Chat on WhatsApp
            </a>
            <a
              href={`${prefix}#contact`}
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-petal px-6 font-medium whitespace-nowrap text-plum transition-transform duration-300 hover:-translate-y-0.5"
            >
              Get a free quote
              <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 py-14 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div className="col-span-2 lg:col-span-1">
            <Logo inverted href={home ? "#top" : import.meta.env.BASE_URL} />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/65">
              <span className="font-medium text-white">About us.</span> {site.name} {site.about}
            </p>
          </div>
          <FooterColumn title="Explore">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={`${prefix}${link.href}`} className={linkClass}>
                  {link.label}
                </a>
              </li>
            ))}
          </FooterColumn>
          <FooterColumn title="Legal">
            {legal.map((link) => (
              <li key={link.href}>
                <Link to={link.href} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </FooterColumn>
          <FooterColumn title="Connect" className="col-span-2 sm:col-span-1">
            <li>
              <a href={instagramLink} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 ${linkClass}`}>
                <InstagramIcon className="size-4" /> Instagram
              </a>
            </li>
            <li>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 ${linkClass}`}>
                <WhatsAppIcon className="size-4" /> WhatsApp
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className={`inline-flex items-center gap-2 break-all ${linkClass}`}>
                <MailIcon className="size-4 shrink-0" /> {site.email}
              </a>
            </li>
          </FooterColumn>
        </div>
      </div>

      <Wordmark text={site.name} />
      <DuckPond />

      <div className="relative bg-band">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-white/50 sm:flex-row sm:px-6">
          <p>
            © {year} {site.name}. All rights reserved. · Made in India
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group inline-flex items-center gap-1.5 transition-colors hover:text-white"
          >
            Back to top
            <ArrowUpIcon className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({ title, className, children }) {
  return (
    <div className={className}>
      <h2 className="font-sans text-sm font-semibold tracking-normal text-white">{title}</h2>
      <ul className="mt-4 space-y-2.5 text-sm text-white/65">{children}</ul>
    </div>
  )
}
