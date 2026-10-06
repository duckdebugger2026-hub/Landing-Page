import { menu, quoteFlow, topics } from "@/data/chatbot"
import { businessTypes } from "@/data/estimator"

// Turns a visitor's message into the duck's reply. Pure function:
// respond(text, state) → { replies: [...], state }.

const QUOTE_WORDS = ["get a quote", "quote", "start", "hire", "interested", "book", "get started", "make a website", "need a website", "want a website", "build my", "new website"]
const CANCEL_WORDS = ["cancel", "stop", "never mind", "nevermind", "exit", "quit"]

function normalise(text) {
  return text
    .toLowerCase()
    .replace(/[’']/g, "'")
    .replace(/[^a-z0-9₹' ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

// Single words must match a whole word; phrases count double.
function score(text, words) {
  const tokens = new Set(text.split(" "))
  let total = 0
  for (const word of words) {
    if (word.includes(" ")) {
      if (text.includes(word)) total += 2
    } else if (tokens.has(word)) {
      total += 1
    }
  }
  return total
}

function matchTopic(text) {
  const exact = topics.find((t) => t.aliases?.some((alias) => normalise(alias) === text))
  if (exact) return exact
  let best = null
  let bestScore = 0
  for (const topic of topics) {
    const s = score(text, topic.words)
    if (s > bestScore) {
      best = topic
      bestScore = s
    }
  }
  return best
}

function fallback(original) {
  return {
    text: "Hmm, that one's beyond my duck brain. A human can definitely help, or try one of these:",
    actions: [{ label: "Ask on WhatsApp", type: "whatsapp", value: `Hi! I have a question: ${original}` }],
    quick: menu,
  }
}

function quoteSummary(data) {
  const size = quoteFlow.sizes.find((s) => s.label === data.size)
  const pkg = size ? quoteFlow.packages.find((p) => p.name === size.package) : null
  const lines = [
    data.name && `Name: ${data.name}`,
    `Type: ${data.type}`,
    `Size: ${data.size}`,
    pkg && `Suggested package: ${pkg.name} (${pkg.price})`,
  ].filter(Boolean)
  const message = ["Hi! I'd like a quote for a website.", ...lines].join("\n")
  return {
    text: pkg
      ? `Here's your quote request. ${pkg.name} looks like the right fit, from ${pkg.price}.`
      : "Here's your quote request. We'll suggest the right package on a quick call.",
    list: lines,
    actions: [
      { label: "Send on WhatsApp", type: "whatsapp", value: message },
      { label: "Add to enquiry form", type: "prefill", value: message, pkg: pkg?.name },
      { label: "Fine-tune in the estimator", type: "scroll", value: "estimate" },
    ],
  }
}

function runQuote(text, original, state) {
  if (score(text, CANCEL_WORDS) > 0 || CANCEL_WORDS.includes(text)) {
    return { replies: [{ text: "No problem. Anything else I can help with?", quick: menu }], state: {} }
  }
  const data = { ...state.data }
  if (state.step === "name") {
    data.name = text === "skip" ? "" : original.trim().slice(0, 40)
    return { replies: [quoteFlow.askType(data.name)], state: { flow: "quote", step: "type", data } }
  }
  if (state.step === "type") {
    const match = businessTypes.find((b) => normalise(b.label) === text)
    data.type = match ? match.label : original.trim().slice(0, 40)
    return { replies: [quoteFlow.askSize], state: { flow: "quote", step: "size", data } }
  }
  const match = quoteFlow.sizes.find((s) => normalise(s.label) === text)
  data.size = match ? match.label : original.trim().slice(0, 40) || "Not sure yet"
  return { replies: [quoteSummary(data)], state: {} }
}

export function respond(original, state = {}) {
  const text = normalise(original)
  if (!text) return { replies: [], state }

  if (state.flow === "quote") return runQuote(text, original, state)

  const topic = matchTopic(text)
  const quoteScore = score(text, QUOTE_WORDS)
  // Starting a quote wins when it's clearly what they asked for.
  if (text === "get a quote" || (quoteScore > 0 && (!topic || quoteScore >= score(text, topic.words)))) {
    return { replies: [quoteFlow.start], state: { flow: "quote", step: "name", data: {} } }
  }
  if (topic) return { replies: [topic.reply()], state }
  return { replies: [fallback(original)], state }
}
