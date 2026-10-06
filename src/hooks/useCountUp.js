import { useEffect, useRef, useState } from "react"

const reducedMotion =
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches

// Eases a number from its previous value to `value`, for totals that tick up.
export function useCountUp(value, duration = 600) {
  const [display, setDisplay] = useState(value)
  const from = useRef(value)

  useEffect(() => {
    if (reducedMotion) return
    const start = performance.now()
    const initial = from.current
    let frame = 0
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      const current = initial + (value - initial) * eased
      from.current = current
      setDisplay(current)
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [value, duration])

  return reducedMotion ? value : display
}
