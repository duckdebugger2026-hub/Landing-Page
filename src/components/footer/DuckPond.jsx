import { useEffect, useRef, useState } from "react"
import Duck from "@/components/common/Duck"

// One tile of wave, drawn twice side by side so it can scroll seamlessly.
const WAVE = "M0 12 Q 30 2 60 12 T 120 12 T 180 12 T 240 12 T 300 12 T 360 12 T 420 12 T 480 12 V 24 H 0 Z"

function Water({ className, duration }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-x-0 h-6 overflow-hidden ${className}`}>
      <div className="wave-drift flex h-full w-[200%]" style={{ animationDuration: duration }}>
        {[0, 1].map((k) => (
          <svg key={k} viewBox="0 0 480 24" preserveAspectRatio="none" className="h-full w-1/2">
            <path d={WAVE} fill="currentColor" />
          </svg>
        ))}
      </div>
    </div>
  )
}

// The rubber duck floats on a slow waterline, paddles toward the pointer,
// turns to face where it's going, and wanders off on its own when left alone.
export default function DuckPond() {
  const pondRef = useRef(null)
  const duckRef = useRef(null)
  const [wiggle, setWiggle] = useState(0)

  useEffect(() => {
    const pond = pondRef.current
    const duck = duckRef.current
    const footer = pond.closest("footer") ?? pond
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let x = 0.18
    let target = 0.18
    let frame = 0
    let lastPointer = 0

    const place = (facing) => {
      duck.style.left = `${x * 100}%`
      if (facing) duck.style.setProperty("--face", facing)
    }

    const tick = () => {
      frame = 0
      const dx = target - x
      if (Math.abs(dx) < 0.0015) return
      x += Math.max(-0.005, Math.min(0.005, dx * 0.05))
      place(dx > 0 ? 1 : -1)
      frame = requestAnimationFrame(tick)
    }
    const swimTo = (value) => {
      target = Math.min(0.94, Math.max(0.06, value))
      if (!frame) frame = requestAnimationFrame(tick)
    }

    const onMove = (e) => {
      const rect = pond.getBoundingClientRect()
      lastPointer = performance.now()
      swimTo((e.clientX - rect.left) / rect.width)
    }

    place(1)
    if (reduced) return
    footer.addEventListener("pointermove", onMove)
    const wander = setInterval(() => {
      if (performance.now() - lastPointer > 5000) swimTo(0.1 + Math.random() * 0.8)
    }, 6000)

    return () => {
      cancelAnimationFrame(frame)
      clearInterval(wander)
      footer.removeEventListener("pointermove", onMove)
    }
  }, [])

  return (
    <div ref={pondRef} className="relative h-20 sm:h-24">
      <Water className="bottom-1 text-white/[0.06]" duration="22s" />
      <div ref={duckRef} className="absolute bottom-2 -translate-x-1/2" style={{ left: "18%" }}>
        <button
          type="button"
          onClick={() => setWiggle((w) => w + 1)}
          aria-label="Squeeze the rubber duck"
          className="block w-14 outline-none focus-visible:ring-3 focus-visible:ring-ring/50 sm:w-16"
          style={{ transform: "scaleX(var(--face, 1))", transition: "transform 0.35s ease" }}
        >
          <span key={wiggle} className={wiggle ? "duck-wiggle block" : "duck-bob block"}>
            <Duck />
          </span>
        </button>
      </div>
      <Water className="bottom-0 text-white/[0.09]" duration="14s" />
    </div>
  )
}
