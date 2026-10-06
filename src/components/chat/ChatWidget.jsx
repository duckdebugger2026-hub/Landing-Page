import { useEffect, useRef, useState } from "react"
import { ArrowUpIcon, XIcon } from "lucide-react"
import Duck from "@/components/common/Duck"
import { WhatsAppIcon } from "@/components/common/Icons"
import { greeting } from "@/data/chatbot"
import { whatsappLink } from "@/data/site"
import { respond } from "@/lib/chatEngine"
import { cn } from "@/lib/utils"

const STORE_KEY = "duck-chat"
const NUDGE_KEY = "duck-nudged"

function load() {
  try {
    return JSON.parse(sessionStorage.getItem(STORE_KEY)) ?? { messages: [], flow: {} }
  } catch {
    return { messages: [], flow: {} }
  }
}

function save(value) {
  try {
    sessionStorage.setItem(STORE_KEY, JSON.stringify(value))
  } catch {
    // Storage blocked: the chat just won't survive a reload.
  }
}

const isSmallScreen = () => window.matchMedia("(max-width: 639px)").matches

function DuckAvatar({ className }) {
  return (
    <span className={cn("grid shrink-0 place-items-center rounded-full bg-[#fbebcb]", className)}>
      <Duck className="w-[72%] translate-y-[4%]" />
    </span>
  )
}

function Typing() {
  return (
    <div className="flex items-end gap-2">
      <DuckAvatar className="size-7" />
      <div className="flex gap-1 rounded-2xl rounded-bl-md bg-background px-3.5 py-3" aria-label="The duck is typing">
        {[0, 1, 2].map((i) => (
          <span key={i} className="typing-dot size-1.5 rounded-full bg-ink/50" style={{ animationDelay: `${i * 150}ms` }} />
        ))}
      </div>
    </div>
  )
}

function BotMessage({ message, onAction }) {
  return (
    <div className="flex items-end gap-2">
      <DuckAvatar className="size-7" />
      <div className="msg-in max-w-[85%] rounded-2xl rounded-bl-md bg-background px-3.5 py-2.5 text-sm leading-relaxed text-ink">
        <p>{message.text}</p>
        {message.list && (
          <ul className="mt-2 space-y-1">
            {message.list.map((item) => (
              <li key={item} className="flex gap-2">
                <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-marigold" />
                {item}
              </li>
            ))}
          </ul>
        )}
        {message.after && <p className="mt-2 text-muted-foreground">{message.after}</p>}
        {message.actions && (
          <div className="mt-3 flex flex-wrap gap-2">
            {message.actions.map((action) => (
              <button
                key={action.label}
                type="button"
                onClick={() => onAction(action)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                  action.type === "whatsapp"
                    ? "bg-whatsapp text-white hover:bg-whatsapp/90"
                    : "border border-border bg-surface text-ink hover:border-ink/30"
                )}
              >
                {action.type === "whatsapp" && <WhatsAppIcon className="size-3.5" />}
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// "Ask the duck": a scripted assistant that answers from the site's own content
// and hands off to WhatsApp. It also replaces the floating WhatsApp button.
export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [chat, setChat] = useState(load)
  const [typing, setTyping] = useState(false)
  const [input, setInput] = useState("")
  const [nudge, setNudge] = useState(false)
  const [nearFooter, setNearFooter] = useState(false)
  const listRef = useRef(null)
  const inputRef = useRef(null)
  const launcherRef = useRef(null)
  const timers = useRef([])

  useEffect(() => save(chat), [chat])

  useEffect(() => {
    const list = listRef.current
    if (list) list.scrollTop = list.scrollHeight
  }, [chat.messages, typing, open])

  // A one-time, gentle nudge after a while on the page.
  useEffect(() => {
    let seen = false
    try {
      seen = sessionStorage.getItem(NUDGE_KEY) === "1"
    } catch {
      seen = false
    }
    if (seen || chat.messages.length) return
    const show = setTimeout(() => setNudge(true), 25000)
    const hide = setTimeout(() => setNudge(false), 34000)
    return () => {
      clearTimeout(show)
      clearTimeout(hide)
    }
  }, [chat.messages.length])

  // The footer has its own WhatsApp button; step aside there unless the chat is open.
  useEffect(() => {
    const footer = document.getElementById("site-footer")
    if (!footer) return
    const observer = new IntersectionObserver(([entry]) => setNearFooter(entry.isIntersecting), {
      rootMargin: "0px 0px -15% 0px",
    })
    observer.observe(footer)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === "Escape") close()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  // Other parts of the page (like the FAQ) can open the chat.
  const openRef = useRef(null)
  useEffect(() => {
    openRef.current = openChat
  })
  useEffect(() => {
    const onOpen = () => openRef.current?.()
    window.addEventListener("chat:open", onOpen)
    return () => window.removeEventListener("chat:open", onOpen)
  }, [])

  function later(fn, ms) {
    timers.current.push(setTimeout(fn, ms))
  }

  function addBotReplies(replies, flow) {
    setTyping(true)
    let delay = 450
    replies.forEach((reply, i) => {
      delay += 350 + Math.min((reply.text?.length ?? 0) * 6, 700)
      later(() => {
        setChat((c) => ({ messages: [...c.messages, { id: Date.now() + i, from: "bot", ...reply }], flow: flow ?? c.flow }))
        if (i === replies.length - 1) setTyping(false)
      }, delay)
    })
  }

  function openChat() {
    setOpen(true)
    setNudge(false)
    try {
      sessionStorage.setItem(NUDGE_KEY, "1")
    } catch {
      // ignore
    }
    if (!chat.messages.length) addBotReplies([greeting])
    setTimeout(() => inputRef.current?.focus(), 60)
  }

  function close() {
    setOpen(false)
    launcherRef.current?.focus()
  }

  function send(text) {
    const value = text.trim()
    if (!value || typing) return
    setInput("")
    const { replies, state } = respond(value, chat.flow)
    setChat((c) => ({ ...c, messages: [...c.messages, { id: Date.now(), from: "you", text: value }] }))
    addBotReplies(replies, state)
  }

  function onAction(action) {
    if (action.type === "say") return send(action.value)
    if (action.type === "whatsapp") {
      window.open(whatsappLink(action.value), "_blank", "noopener,noreferrer")
      return
    }
    if (action.type === "link") {
      window.location.href = action.value
      return
    }
    const target = action.type === "prefill" ? "contact" : action.value
    if (action.type === "prefill") {
      window.dispatchEvent(new CustomEvent("enquiry:prefill", { detail: { pkg: action.pkg, message: action.value } }))
    }
    document.getElementById(target)?.scrollIntoView({ behavior: "smooth" })
    if (isSmallScreen()) setOpen(false)
  }

  const last = chat.messages[chat.messages.length - 1]
  const quick = !typing && last?.from === "bot" ? last.quick : null
  const hidden = nearFooter && !open

  return (
    <div
      className={cn(
        "fixed right-4 bottom-4 z-40 flex flex-col items-end gap-3 transition-[opacity,scale] duration-300 sm:right-6 sm:bottom-6",
        hidden && "pointer-events-none scale-90 opacity-0"
      )}
    >
      {open && (
        <section
          role="dialog"
          aria-label="Ask the duck"
          className="chat-in flex h-[min(600px,calc(100dvh-7rem))] w-[min(390px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl shadow-plum/20 dark:shadow-black/50"
        >
          <header className="flex items-center gap-3 bg-band px-4 py-3.5 text-white">
            <DuckAvatar className="size-10" />
            <div className="min-w-0 flex-1">
              <p className="text-base leading-tight font-semibold tracking-tight">Ask the duck</p>
              <p className="text-xs text-white/65">Instant answers · humans on WhatsApp</p>
            </div>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with a human on WhatsApp"
              title="Chat with a human on WhatsApp"
              className="grid size-9 place-items-center rounded-full bg-whatsapp text-white transition-transform hover:scale-105"
            >
              <WhatsAppIcon className="size-4" />
            </a>
            <button
              type="button"
              onClick={close}
              aria-label="Close chat"
              className="grid size-9 place-items-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            >
              <XIcon className="size-4" />
            </button>
          </header>

          <div ref={listRef} aria-live="polite" className="flex-1 space-y-3 overflow-y-auto overscroll-contain p-4">
            {chat.messages.map((m) =>
              m.from === "bot" ? (
                <BotMessage key={m.id} message={m} onAction={onAction} />
              ) : (
                <p
                  key={m.id}
                  className="msg-in ml-auto w-fit max-w-[80%] rounded-2xl rounded-br-md bg-primary px-3.5 py-2.5 text-sm text-primary-foreground"
                >
                  {m.text}
                </p>
              )
            )}
            {typing && <Typing />}
          </div>

          {quick && (
            <div className="flex flex-wrap gap-2 px-4 pb-3">
              {quick.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => send(q)}
                  className="msg-in rounded-full border border-ink/15 bg-background px-3 py-1.5 text-xs font-medium text-ink transition-colors hover:border-marigold hover:bg-glow/50"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault()
              send(input)
            }}
            className="flex items-center gap-2 border-t border-border p-3"
          >
            <label htmlFor="duck-input" className="sr-only">
              Ask the duck a question
            </label>
            <input
              id="duck-input"
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={300}
              autoComplete="off"
              placeholder={chat.flow?.flow === "quote" ? "Type your answer…" : "Ask about prices, timelines…"}
              className="h-10 min-w-0 flex-1 rounded-full border border-input bg-background px-4 text-sm text-ink outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40"
            />
            <button
              type="submit"
              disabled={!input.trim() || typing}
              aria-label="Send"
              className="grid size-10 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground transition-opacity disabled:opacity-40"
            >
              <ArrowUpIcon className="size-4" />
            </button>
          </form>
        </section>
      )}

      {nudge && !open && (
        <button
          type="button"
          onClick={openChat}
          className="fade-up max-w-[220px] rounded-2xl rounded-br-md bg-surface px-4 py-2.5 text-left text-sm text-ink shadow-lg ring-1 ring-border"
        >
          Questions about prices or timelines? Ask the duck.
        </button>
      )}

      <button
        ref={launcherRef}
        type="button"
        onClick={open ? close : openChat}
        aria-expanded={open}
        aria-label={open ? "Close chat" : "Ask the duck: open chat"}
        tabIndex={hidden ? -1 : undefined}
        style={{ "--d": "1600ms" }}
        className="fade-up group inline-flex h-14 items-center gap-2.5 rounded-full bg-band p-1.5 font-medium text-white shadow-xl shadow-plum/30 transition-transform duration-300 hover:-translate-y-0.5 sm:pr-5 dark:ring-1 dark:ring-white/10"
      >
        {open ? (
          <span className="grid size-11 place-items-center">
            <XIcon className="size-5" />
          </span>
        ) : (
          <>
            <span className="relative">
              <DuckAvatar className="size-11 transition-transform duration-300 group-hover:rotate-[-8deg]" />
              <span className="absolute -top-0.5 -right-0.5 size-3 rounded-full bg-whatsapp ring-2 ring-band" />
            </span>
            <span className="hidden sm:inline">Ask the duck</span>
          </>
        )}
      </button>
    </div>
  )
}
