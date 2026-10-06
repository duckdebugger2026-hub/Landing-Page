import { useEffect } from "react"
import { Link } from "react-router"
import { ArrowLeftIcon } from "lucide-react"
import Logo from "@/components/layout/Logo"
import ThemeToggle from "@/components/layout/ThemeToggle"
import Footer from "@/components/layout/Footer"
import { site } from "@/data/site"

export default function LegalLayout({ title, updated, children }) {
  useEffect(() => {
    const previous = document.title
    document.title = `${title} | ${site.name}`
    return () => {
      document.title = previous
    }
  }, [title])

  return (
    <>
      <header className="border-b bg-background">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-4 sm:px-6">
          <Logo href="/" />
          <div className="flex items-center gap-4">
            <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-ink">
              <ArrowLeftIcon className="size-4" /> Back to home
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
        <h1 className="text-4xl text-ink sm:text-5xl">{title}</h1>
        <p className="mt-3 text-sm text-muted-foreground">Last updated {updated}</p>
        <div className="mt-10 space-y-5 leading-relaxed text-ink/85 [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:text-ink [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5">
          {children}
        </div>
      </main>
      <Footer home={false} />
    </>
  )
}
