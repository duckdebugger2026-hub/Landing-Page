import { site } from "@/data/site"

const { opens, closes, timeZone, place } = site.hours

export function hourLabel(hour) {
  const suffix = hour < 12 ? "am" : "pm"
  return `${hour % 12 || 12} ${suffix}`
}

// Current time at the studio and whether it's within working hours.
export function studioStatus() {
  const now = new Date()
  const time = new Intl.DateTimeFormat("en-IN", { timeZone, hour: "numeric", minute: "2-digit", hour12: true })
    .format(now)
    .toLowerCase()
  const hour = Number(new Intl.DateTimeFormat("en-GB", { timeZone, hour: "2-digit", hourCycle: "h23" }).format(now))
  return { time, place, open: hour >= opens && hour < closes, opensAt: hourLabel(opens) }
}
