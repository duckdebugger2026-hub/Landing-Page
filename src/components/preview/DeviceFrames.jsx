import { useEffect, useRef, useState } from "react"
import { LockIcon } from "lucide-react"

const hideScrollbar = "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden"

// Short explanation of what a tapped button would do on the real site.
function Notice({ notice }) {
  return (
    <div aria-live="polite" className="pointer-events-none absolute inset-x-3 bottom-16 z-30 flex justify-center">
      {notice && (
        <p
          key={notice.id}
          className="fade-up max-w-[17rem] rounded-xl bg-plum/95 px-3.5 py-2.5 text-center text-[12px] leading-snug text-white shadow-lg"
        >
          {notice.text}
        </p>
      )}
    </div>
  )
}

export function PhoneFrame({ notice, children }) {
  return (
    <div className="relative mx-auto w-[min(300px,100%)] rounded-[2.6rem] bg-plum p-2.5 shadow-2xl shadow-plum/30 dark:shadow-black/50 dark:ring-1 dark:ring-white/10">
      <div className="relative h-[600px] overflow-hidden rounded-[2.1rem] bg-(--pv-bg)">
        <div className="absolute inset-x-0 top-0 z-20 flex h-9 items-center justify-between bg-(--pv-bg) px-6 text-[11px] font-semibold text-(--pv-ink) transition-colors duration-500">
          <span>9:41</span>
          <span className="absolute top-2 left-1/2 h-6 w-24 -translate-x-1/2 rounded-full bg-plum" />
          <span className="flex items-center gap-1">
            <span className="h-2 w-3 rounded-[2px] bg-current opacity-80" />
            <span className="h-2.5 w-5 rounded-[3px] border border-current p-px">
              <span className="block h-full w-3/4 rounded-[1px] bg-current" />
            </span>
          </span>
        </div>
        <div className={`h-full overflow-y-auto pt-9 ${hideScrollbar}`}>{children}</div>
        <span className="absolute bottom-1.5 left-1/2 z-20 h-1 w-28 -translate-x-1/2 rounded-full bg-(--pv-ink)/70" />
        <Notice notice={notice} />
      </div>
    </div>
  )
}

const DESKTOP_WIDTH = 1024
const DESKTOP_HEIGHT = 640

// Renders a real 1024px-wide desktop page and scales it down to fit.
export function BrowserFrame({ url, notice, children }) {
  const ref = useRef(null)
  const [scale, setScale] = useState(0.6)

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / DESKTOP_WIDTH))
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="w-full">
      <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-2xl shadow-plum/20 dark:shadow-black/50">
        <div className="flex items-center gap-3 border-b border-border bg-subtle px-3 py-2.5">
          <span className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-ink/15" />
            <span className="size-2.5 rounded-full bg-ink/15" />
            <span className="size-2.5 rounded-full bg-ink/15" />
          </span>
          <span className="flex min-w-0 flex-1 items-center justify-center gap-1.5 rounded-md bg-surface px-3 py-1 text-xs text-muted-foreground dark:bg-background">
            <LockIcon className="size-3 shrink-0" />
            <span className="truncate">{url}</span>
          </span>
          <span className="w-10" />
        </div>
        <div className="relative overflow-hidden" style={{ height: DESKTOP_HEIGHT * scale }}>
          <div
            className={`absolute top-0 left-0 origin-top-left overflow-y-auto ${hideScrollbar}`}
            style={{ width: DESKTOP_WIDTH, height: DESKTOP_HEIGHT, transform: `scale(${scale})` }}
          >
            {children}
          </div>
          <Notice notice={notice} />
        </div>
      </div>
    </div>
  )
}
