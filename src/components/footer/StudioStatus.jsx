import { useEffect, useState } from "react"
import { studioStatus } from "@/lib/studioHours"
import { cn } from "@/lib/utils"

// "Online now · 3:42 pm in India", or when we'll be back. Updates every 30 seconds.
export default function StudioStatus() {
  const [status, setStatus] = useState(studioStatus)

  useEffect(() => {
    const id = setInterval(() => setStatus(studioStatus()), 30000)
    return () => clearInterval(id)
  }, [])

  return (
    <p className="inline-flex items-center gap-2 rounded-full bg-white/[0.07] px-3.5 py-1.5 text-xs text-white/80 ring-1 ring-white/10 sm:text-sm">
      <span className="relative flex size-2">
        {status.open && (
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-whatsapp/70 [animation-duration:2.4s] motion-reduce:animate-none" />
        )}
        <span className={cn("relative inline-flex size-2 rounded-full", status.open ? "bg-whatsapp" : "bg-white/40")} />
      </span>
      {status.open
        ? `Online now · ${status.time} in ${status.place}`
        : `Away · ${status.time} in ${status.place} · back at ${status.opensAt}`}
    </p>
  )
}
