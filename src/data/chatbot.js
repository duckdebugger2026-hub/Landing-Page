// What "Ask the duck" knows. Each topic has trigger words and a reply.
// Replies are built from the rest of the site's data, so prices, timelines and
// FAQ answers stay in sync automatically. Edit the wording freely.
//
// A reply can include:
//   text     the message
//   list     bullet points under the text
//   after    a line after the list
//   actions  buttons: { label, type: "scroll" | "whatsapp" | "prefill" | "say", value }
//   quick    suggested replies shown as chips

import { businessTypes, sizes } from "@/data/estimator"
import { faqs, packages, site, steps } from "@/data/site"
import { studioStatus } from "@/lib/studioHours"

export const menu = ["See prices", "How long does it take?", "Get a quote", "Talk to a human"]

export const greeting = {
  text: `Quack! 👋 I'm the ${site.name} duck. Ask me about prices, timelines or how it works, or tell me about your shop.`,
  quick: menu,
}

const faq = (start) => faqs.find((f) => f.q.toLowerCase().startsWith(start))?.a ?? ""

const toWhatsApp = (label = "Chat on WhatsApp", value) => ({ label, type: "whatsapp", value })

function packageFor(index, intro) {
  const pkg = packages[index]
  return {
    text: `${intro} The ${pkg.name} package fits: ${pkg.price}, one-time.`,
    list: pkg.features.slice(0, 4),
    quick: ["Get a quote", "Build a custom quote", "See all prices"],
  }
}

export const topics = [
  {
    id: "greeting",
    words: ["hi", "hii", "hello", "hey", "namaste", "hola", "good morning", "good afternoon", "good evening"],
    reply: () => ({ text: "Hello! What would you like to know?", quick: menu }),
  },
  {
    id: "pricing",
    aliases: ["see prices", "see all prices"],
    words: ["price", "prices", "pricing", "cost", "costs", "how much", "kitna", "kitne", "rate", "rates", "charge", "charges", "budget", "package", "packages", "plan", "plans", "expensive", "cheap", "affordable"],
    reply: () => ({
      text: "Three fixed-price packages, all one-time:",
      list: packages.map((p) => `${p.name}: ${p.price} · ${p.features[0].toLowerCase()}`),
      after: "Domain and hosting are billed at actual cost. No monthly fees.",
      quick: ["Which one suits me?", "Build a custom quote", "Any monthly fees?"],
    }),
  },
  {
    id: "recommend",
    aliases: ["which one suits me?"],
    words: ["which one", "which package", "suits me", "suggest", "recommend", "best for", "right for", "should i choose"],
    reply: () => ({
      text: "Mostly it depends on how many pages you need. Roughly how big should your site be?",
      quick: ["Just one page", "Up to 5 pages", "Up to 10 pages", "Not sure yet"],
    }),
  },
  {
    id: "size-one",
    aliases: ["just one page"],
    words: ["one page", "single page", "1 page", "landing page"],
    reply: () => packageFor(0, "A single, polished page is perfect for getting online fast."),
  },
  {
    id: "size-five",
    aliases: ["up to 5 pages"],
    words: ["5 pages", "five pages", "few pages", "4 pages", "3 pages"],
    reply: () => packageFor(1, "Most cafés, salons and clinics land here."),
  },
  {
    id: "size-ten",
    aliases: ["up to 10 pages"],
    words: ["10 pages", "ten pages", "many pages", "big website", "large website"],
    reply: () => packageFor(2, "Room for menus, collections or courses, plus a head start on Instagram."),
  },
  {
    id: "unsure",
    aliases: ["not sure yet"],
    words: ["not sure", "dont know", "don't know", "no idea"],
    reply: () => ({
      text: "No problem, that's what the free call is for. Or answer five quick questions in the estimator and see a price straight away.",
      actions: [{ label: "Open the estimator", type: "scroll", value: "estimate" }],
      quick: ["Get a quote", "Talk to a human"],
    }),
  },
  {
    id: "estimator",
    aliases: ["build a custom quote"],
    words: ["custom", "estimate", "estimator", "calculator", "calculate", "customise", "customize"],
    reply: () => ({
      text: "The estimator builds a custom package as you pick pages and features, with a live price.",
      actions: [{ label: "Open the estimator", type: "scroll", value: "estimate" }],
      quick: ["Get a quote", "See prices"],
    }),
  },
  {
    id: "monthly",
    aliases: ["any monthly fees?"],
    words: ["monthly", "subscription", "recurring", "every month", "renewal", "hidden"],
    reply: () => ({
      text: "No monthly fees from us. You pay once for the website. The only yearly cost is your domain at actual price, usually under ₹1,000. An optional care plan is available if you want ongoing updates.",
      quick: ["Domain and hosting?", "See prices"],
    }),
  },
  {
    id: "hosting",
    aliases: ["domain and hosting?"],
    words: ["domain", "hosting", "host", "server", "url", "website address"],
    reply: () => ({ text: faq("do i need"), quick: ["Any monthly fees?", "Who owns the website?"] }),
  },
  {
    id: "timeline",
    aliases: ["how long does it take?"],
    words: ["how long", "time", "days", "weeks", "when", "deadline", "fast", "quick", "urgent", "soon", "timeline", "delivery", "kitna time", "kitne din", "kab tak", "lagega", "kab"],
    reply: () => ({
      text: faq("how long"),
      after: "In a hurry? Rush delivery gets a site live in 5 days.",
      quick: ["How does it work?", "Get a quote"],
    }),
  },
  {
    id: "process",
    aliases: ["how does it work?"],
    words: ["process", "steps", "how does it work", "how it works", "procedure", "what happens"],
    reply: () => ({
      text: "Five simple steps, all on WhatsApp:",
      list: steps.map((s) => `${s.title} (${s.when})`),
      actions: [{ label: "See how it works", type: "scroll", value: "process" }],
      quick: ["Get a quote", "How do I pay?"],
    }),
  },
  {
    id: "payment",
    aliases: ["how do i pay?"],
    words: ["pay", "payment", "payments", "advance", "upi", "installment", "instalment", "refund", "invoice", "gst"],
    reply: () => ({
      text: "50% to start and 50% before launch. UPI and bank transfer both work. If you cancel before seeing the design preview, the advance is refunded in full.",
      quick: ["How long does it take?", "Get a quote"],
    }),
  },
  {
    id: "enquiries",
    words: ["enquiry", "enquiries", "inquiry", "leads", "google sheet", "sheet", "form", "orders", "bookings"],
    reply: () => ({ text: faq("where do my"), quick: ["Get a quote", "See prices"] }),
  },
  {
    id: "changes",
    words: ["change", "changes", "edit", "update", "modify", "revision", "revisions", "later", "maintenance"],
    reply: () => ({ text: faq("can i change"), quick: ["Any monthly fees?", "Get a quote"] }),
  },
  {
    id: "instagram",
    words: ["instagram", "insta", "social", "social media", "posts", "reels", "facebook"],
    reply: () => ({ text: faq("do you also"), quick: ["See prices", "Get a quote"] }),
  },
  {
    id: "seo",
    words: ["google", "seo", "search", "maps", "ranking", "rank", "found online"],
    reply: () => ({ text: faq("will my website"), quick: ["See prices", "Get a quote"] }),
  },
  {
    id: "ownership",
    aliases: ["who owns the website?"],
    words: ["own", "owns", "ownership", "lock in", "lock-in", "my files", "source code", "code"],
    reply: () => ({
      text: "You do, completely. The domain is registered in your name, enquiries go to your own Google Sheet, and you can take everything with you whenever you like.",
      quick: ["Domain and hosting?", "Get a quote"],
    }),
  },
  {
    id: "work",
    words: ["portfolio", "work", "examples", "example", "samples", "sample", "previous", "clients", "projects", "show me"],
    reply: () => ({
      text: "Here's some recent work, and you can also see what your own site could look like with your name on it.",
      actions: [
        { label: "See the work", type: "scroll", value: "work" },
        { label: "Try the live preview", type: "scroll", value: "preview" },
      ],
      quick: ["See prices", "Get a quote"],
    }),
  },
  {
    id: "preview",
    words: ["preview", "demo", "see my site", "my website look", "try"],
    reply: () => ({
      text: "Type your business name in the live preview and watch your site come together, on a phone or a laptop.",
      actions: [{ label: "Open the live preview", type: "scroll", value: "preview" }],
      quick: ["See prices", "Get a quote"],
    }),
  },
  {
    id: "location",
    words: ["where are you", "location", "located", "city", "office", "visit", "near me", "outside", "other city"],
    reply: () => ({
      text: `We're based in ${site.city} and work with businesses anywhere, all online. Calls, previews and approvals happen on WhatsApp, so distance never matters.`,
      quick: ["How does it work?", "Talk to a human"],
    }),
  },
  {
    id: "human",
    aliases: ["talk to a human"],
    words: ["human", "person", "talk", "call", "phone", "number", "contact", "whatsapp", "email", "speak", "real person", "agent"],
    reply: () => {
      const status = studioStatus()
      return {
        text: status.open
          ? `We're online right now (${status.time} in ${status.place}) and usually reply within the hour.`
          : `It's ${status.time} in ${status.place}, so we're away. Leave a message and we'll reply from ${status.opensAt}.`,
        actions: [toWhatsApp(), { label: `Email ${site.email}`, type: "link", value: `mailto:${site.email}` }],
        quick: ["Get a quote", "See prices"],
      }
    },
  },
  {
    id: "duck",
    words: ["duck", "quack", "why duck", "name", "debugger", "rubber duck"],
    reply: () => ({
      text: "Rubber-duck debugging: when programmers are stuck, they explain the problem out loud to a rubber duck, and the answer turns up. Tell us about your business the same way, and we'll find the website in it. 🦆",
      quick: ["Get a quote", "See prices"],
    }),
  },
  {
    id: "thanks",
    words: ["thanks", "thank you", "thank", "thx", "great", "awesome", "cool", "ok thanks", "bye", "goodbye"],
    reply: () => ({
      text: "Happy to help! Whenever you're ready, we're one WhatsApp message away.",
      actions: [toWhatsApp()],
    }),
  },
]

// The guided "Get a quote" conversation.
export const quoteFlow = {
  start: {
    text: "Happy to help! Three quick questions and I'll draft it for you. What's your business called?",
    quick: ["Skip"],
  },
  askType: (name) => ({
    text: name ? `Lovely, ${name}. What kind of business is it?` : "No problem. What kind of business is it?",
    quick: businessTypes.map((b) => b.label),
  }),
  askSize: {
    text: "And roughly how big should the website be?",
    quick: [...sizes.map((s) => s.label), "Not sure yet"],
  },
  sizes,
  packages,
}
