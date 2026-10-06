import { Link } from "react-router"
import { MailIcon } from "lucide-react"
import { InstagramIcon, WhatsAppIcon } from "@/components/common/Icons"
import Logo from "@/components/layout/Logo"
import { instagramLink, navLinks, site, whatsappLink } from "@/data/site"

const year = new Date().getFullYear()

const legal = [
  { label: "Privacy policy", href: "/privacy" },
  { label: "Terms of service", href: "/terms" },
  { label: "Refund policy", href: "/refunds" },
]

export default function Footer({ home = true }) {
  // On legal pages, section links point back to the homepage.
  const prefix = home ? "" : "/"
  return (
    <footer className="bg-band px-4 pt-16 pb-24 text-white sm:px-6 sm:pb-10">
      <div className="mx-auto grid max-w-5xl gap-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div>
          <Logo inverted href={home ? "#top" : "/"} />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/65">
            <span className="font-medium text-white">About us.</span> {site.name} {site.about}
          </p>
        </div>
        <FooterColumn title="Explore">
          {navLinks.slice(0, 4).map((link) => (
            <li key={link.href}>
              <a href={`${prefix}${link.href}`} className="hover:text-white">
                {link.label}
              </a>
            </li>
          ))}
        </FooterColumn>
        <FooterColumn title="Legal">
          {legal.map((link) => (
            <li key={link.href}>
              <Link to={link.href} className="hover:text-white">
                {link.label}
              </Link>
            </li>
          ))}
        </FooterColumn>
        <FooterColumn title="Connect">
          <li>
            <a href={instagramLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-white">
              <InstagramIcon className="size-4" /> Instagram
            </a>
          </li>
          <li>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-white">
              <WhatsAppIcon className="size-4" /> WhatsApp
            </a>
          </li>
          <li>
            <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 break-all hover:text-white">
              <MailIcon className="size-4 shrink-0" /> {site.email}
            </a>
          </li>
        </FooterColumn>
      </div>
      <div className="mx-auto mt-12 flex max-w-5xl flex-col justify-between gap-2 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row">
        <p>© {year} {site.name}. All rights reserved.</p>
        <p>Made in India</p>
      </div>
    </footer>
  )
}

function FooterColumn({ title, children }) {
  return (
    <div>
      <h2 className="font-sans text-sm font-semibold tracking-normal text-white">{title}</h2>
      <ul className="mt-4 space-y-2.5 text-sm text-white/65">{children}</ul>
    </div>
  )
}
