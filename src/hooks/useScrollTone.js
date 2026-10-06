import { useEffect } from "react"

// Watches sections marked with data-tone and sets the matching mood on <html>
// for whichever one sits across the middle of the screen. The change is held
// back until scrolling settles, so flicking past several sections doesn't
// flash through their colours. The CSS in index.css turns it into a slow fade.
const SETTLE_MS = 350

export function useScrollTone() {
  useEffect(() => {
    const root = document.documentElement
    const sections = document.querySelectorAll("[data-tone]")
    let next = null
    let timer = 0
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) next = entry.target.dataset.tone
        }
        clearTimeout(timer)
        timer = setTimeout(() => {
          if (next && root.dataset.tone !== next) root.dataset.tone = next
        }, SETTLE_MS)
      },
      { rootMargin: "-50% 0px -50% 0px" }
    )
    sections.forEach((section) => observer.observe(section))
    return () => {
      clearTimeout(timer)
      observer.disconnect()
      delete root.dataset.tone
    }
  }, [])
}
