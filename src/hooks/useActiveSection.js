import { useEffect, useState } from "react"

// Id of the section currently in the middle of the screen.
export function useActiveSection(ids) {
  const [active, setActive] = useState("")
  const key = ids.join(",")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    )
    for (const id of key.split(",")) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [key])

  return active
}
