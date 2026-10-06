import { MoonIcon, SunIcon } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { useTheme } from "@/hooks/useTheme"
import { cn } from "@/lib/utils"

export default function ThemeToggle({ className }) {
  const { theme, toggleTheme } = useTheme()
  const dark = theme === "dark"
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      title={dark ? "Light mode" : "Dark mode"}
      className={cn(
        buttonVariants({ variant: "outline", size: "icon" }),
        "relative size-9 overflow-hidden rounded-full bg-surface",
        className
      )}
    >
      <SunIcon
        className={cn(
          "absolute transition-all duration-500",
          dark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-50 opacity-0"
        )}
      />
      <MoonIcon
        className={cn(
          "absolute transition-all duration-500",
          dark ? "rotate-90 scale-50 opacity-0" : "rotate-0 scale-100 opacity-100"
        )}
      />
    </button>
  )
}
