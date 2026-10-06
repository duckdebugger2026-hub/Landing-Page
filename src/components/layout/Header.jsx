import { useState } from "react"
import { MenuIcon } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { WhatsAppIcon } from "@/components/common/Icons"
import Logo from "@/components/layout/Logo"
import ThemeToggle from "@/components/layout/ThemeToggle"
import { useActiveSection } from "@/hooks/useActiveSection"
import { useScrolled } from "@/hooks/useScrolled"
import { navLinks, whatsappLink } from "@/data/site"
import { cn } from "@/lib/utils"

const sectionIds = navLinks.map((link) => link.href.slice(1))

export default function Header() {
  const [open, setOpen] = useState(false)
  const scrolled = useScrolled()
  const active = useActiveSection(sectionIds)

  return (
    <header
      className={cn(
        "fade-down sticky top-0 z-40 border-b transition-[background-color,border-color,box-shadow] duration-300",
        scrolled
          ? "border-border bg-background/85 shadow-[0_8px_30px_-12px_rgba(42,22,48,0.12)] backdrop-blur-md dark:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.6)]"
          : "border-transparent bg-background"
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:grid lg:grid-cols-[1fr_auto_1fr]">
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-7 text-sm text-muted-foreground">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={active === link.href.slice(1) ? "true" : undefined}
                  className="relative py-1 transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-right after:scale-x-0 after:bg-marigold after:transition-transform after:duration-300 hover:text-ink hover:after:origin-left hover:after:scale-x-100 aria-[current]:text-ink aria-[current]:after:scale-x-100"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <Logo className="lg:justify-self-center" />

        <div className="flex items-center gap-2 lg:justify-self-end">
          <ThemeToggle />
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "hidden h-9 rounded-full bg-surface px-4 sm:inline-flex"
            )}
          >
            <WhatsAppIcon />
            Chat on WhatsApp
          </a>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className={cn(
              buttonVariants({ variant: "outline", size: "icon" }),
              "size-9 rounded-full bg-surface text-whatsapp sm:hidden"
            )}
          >
            <WhatsAppIcon />
          </a>
          <a
            href="#contact"
            className={cn(buttonVariants(), "hidden h-9 rounded-full px-4 sm:inline-flex")}
          >
            Get a quote
          </a>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              aria-label="Open menu"
              className={cn(
                buttonVariants({ variant: "outline", size: "icon" }),
                "size-9 rounded-full bg-surface lg:hidden"
              )}
            >
              <MenuIcon />
            </SheetTrigger>
            <SheetContent side="right" className="bg-background p-6">
              <SheetTitle className="font-serif text-2xl font-normal">Menu</SheetTitle>
              <nav aria-label="Mobile" className="mt-4">
                <ul className="flex flex-col">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="block border-b py-3.5 text-base text-ink"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="mt-6 flex flex-col gap-2">
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className={cn(buttonVariants(), "h-11 rounded-full")}
                >
                  Get a free quote
                </a>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(buttonVariants({ variant: "outline" }), "h-11 rounded-full bg-surface")}
                >
                  <WhatsAppIcon />
                  Chat on WhatsApp
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
