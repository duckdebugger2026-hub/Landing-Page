import { Fragment, useEffect, useRef } from "react"
import { ArrowRightIcon } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { WhatsAppIcon } from "@/components/common/Icons"
import PhoneMockup from "@/components/common/PhoneMockup"
import { projects, site, whatsappLink } from "@/data/site"
import { cn } from "@/lib/utils"

const lead = "A beautiful home for your business, beyond the".split(" ")

// Each word slides up from behind a mask, one after another.
function Word({ i, children }) {
  return (
    <span className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-top">
      <span className="word-rise inline-block" style={{ "--i": i }}>
        {children}
      </span>
    </span>
  )
}

// Phones drift apart on scroll and lean toward the pointer.
function usePhoneParallax() {
  const ref = useRef(null)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    let frame = 0
    const update = () => {
      frame = 0
      const progress = Math.min(window.scrollY / 500, 1)
      ref.current?.style.setProperty("--p", progress.toFixed(3))
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    // On desktop, the phones tilt a few degrees toward the pointer.
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches
    const onPointer = (e) => {
      const x = e.clientX / window.innerWidth - 0.5
      const y = e.clientY / window.innerHeight - 0.5
      ref.current?.style.setProperty("--tx", (x * 8).toFixed(2))
      ref.current?.style.setProperty("--ty", (y * -6).toFixed(2))
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    if (finePointer) window.addEventListener("pointermove", onPointer, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("pointermove", onPointer)
    }
  }, [])

  return ref
}

export default function Hero() {
  const [chai, riya, smile] = projects
  const stageRef = usePhoneParallax()

  return (
    <section id="top" className="relative overflow-hidden px-4 pt-14 sm:px-6 sm:pt-20">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="mx-auto max-w-[15ch] text-[2.6rem] leading-[1.05] text-balance text-ink sm:text-6xl lg:text-7xl">
          {lead.map((word, i) => (
            <Fragment key={i}>
              <Word i={i}>{word}</Word>{" "}
            </Fragment>
          ))}
          <span className="relative isolate inline-block whitespace-nowrap">
            <Word i={lead.length}>Instagram</Word> <Word i={lead.length + 1}>grid.</Word>
            <svg
              aria-hidden
              viewBox="0 0 300 20"
              preserveAspectRatio="none"
              className="absolute -bottom-[0.06em] left-[2%] -z-10 h-[0.32em] w-[96%] text-marigold"
            >
              <path
                d="M3 14 C 70 5, 160 3, 297 9"
                pathLength="1"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                className="draw-line"
                style={{ "--d": "900ms" }}
              />
            </svg>
          </span>
        </h1>
        <p
          className="fade-up mx-auto mt-6 max-w-xl text-base text-pretty text-muted-foreground sm:text-lg"
          style={{ "--d": "650ms" }}
        >
          {site.description}
        </p>
        <div className="fade-up mt-8 flex flex-col justify-center gap-3 sm:flex-row" style={{ "--d": "800ms" }}>
          <a href="#contact" className={cn(buttonVariants(), "h-11 rounded-full px-6 text-[15px]")}>
            Get a free quote
            <ArrowRightIcon className="transition-transform duration-300 group-hover/button:translate-x-0.5" />
          </a>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-11 rounded-full bg-surface px-6 text-[15px]"
            )}
          >
            <WhatsAppIcon className="text-whatsapp" />
            Chat on WhatsApp
          </a>
        </div>
      </div>

      <div
        ref={stageRef}
        className="relative mx-auto mt-12 h-[230px] max-w-md transition-transform duration-700 ease-out sm:mt-16 sm:h-[400px] sm:max-w-xl"
        style={{
          transform:
            "perspective(1200px) rotateX(calc(var(--ty, 0) * 1deg)) rotateY(calc(var(--tx, 0) * 1deg))",
        }}
      >
        <div
          className="arc-in absolute bottom-0 left-1/2 aspect-[2/1] w-[118%] -translate-x-1/2 rounded-t-full bg-glow"
          style={{ "--d": "700ms" }}
        />
        <div className="absolute bottom-[-60px] left-[6%] w-[30%] -rotate-[10deg] sm:bottom-[-70px]">
          <div style={{ transform: "translateY(calc(var(--p, 0) * 24px)) rotate(calc(var(--p, 0) * -6deg))" }}>
            <div className="phone-in" style={{ "--d": "1000ms", "--from-rotate": "10deg" }}>
              <PhoneMockup theme={riya.theme} brand="Riya" headline={riya.headline} />
            </div>
          </div>
        </div>
        <div className="absolute right-[6%] bottom-[-60px] w-[30%] rotate-[10deg] sm:bottom-[-70px]">
          <div style={{ transform: "translateY(calc(var(--p, 0) * 24px)) rotate(calc(var(--p, 0) * 6deg))" }}>
            <div className="phone-in" style={{ "--d": "1000ms", "--from-rotate": "-10deg" }}>
              <PhoneMockup theme={smile.theme} brand="SmileCare" headline={smile.headline} />
            </div>
          </div>
        </div>
        <div className="absolute bottom-[-40px] left-1/2 w-[36%] -translate-x-1/2">
          <div style={{ transform: "translateY(calc(var(--p, 0) * -16px))" }}>
            <div className="phone-in" style={{ "--d": "850ms" }}>
              <PhoneMockup theme={chai.theme} brand="Chai" headline={chai.headline} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
