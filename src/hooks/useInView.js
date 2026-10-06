import { useEffect, useRef, useState } from "react"

// True while the element is on screen. With `once`, it stays true after the
// first time it appears (used for scroll reveals and lazy loading).
export function useInView({ rootMargin = "0px 0px -10% 0px", once = true } = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting)
        if (entry.isIntersecting && once) observer.disconnect()
      },
      { rootMargin }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [rootMargin, once])

  return [ref, inView]
}
