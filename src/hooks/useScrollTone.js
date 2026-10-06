import { useEffect } from "react"

// Watches sections marked with data-tone and sets the matching mood on <html>
// as each one crosses a line 70% of the way down the screen. The CSS in
// index.css turns that into a smooth background colour change.
export function useScrollTone() {
  useEffect(() => {
    const root = document.documentElement
    const sections = document.querySelectorAll("[data-tone]")
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) root.dataset.tone = entry.target.dataset.tone
        }
      },
      { rootMargin: "-70% 0px -30% 0px" }
    )
    sections.forEach((section) => observer.observe(section))
    return () => {
      observer.disconnect()
      delete root.dataset.tone
    }
  }, [])
}
