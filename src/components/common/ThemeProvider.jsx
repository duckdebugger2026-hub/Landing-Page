import { useCallback, useEffect, useMemo, useState } from "react"
import { ThemeContext } from "@/hooks/useTheme"

const STORAGE_KEY = "theme"
const THEME_COLOURS = { light: "#2a1630", dark: "#130b16" }

function readStored() {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

function applyTheme(theme) {
  document.documentElement.classList.toggle("dark", theme === "dark")
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", THEME_COLOURS[theme])
}

// Light by default. If the visitor switches to dark, their choice is remembered.
// index.html applies the saved choice before first paint, so there's no flash.
export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => (readStored() === "dark" ? "dark" : "light"))

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  const toggleTheme = useCallback(() => {
    const next = theme === "dark" ? "light" : "dark"
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Private browsing: the choice just won't be remembered.
    }
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (document.startViewTransition && !reduceMotion) {
      document.startViewTransition(() => {
        applyTheme(next)
        setTheme(next)
      })
    } else {
      setTheme(next)
    }
  }, [theme])

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme])
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
