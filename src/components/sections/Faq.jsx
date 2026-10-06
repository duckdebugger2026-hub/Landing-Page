import { useState } from "react"
import { Accordion } from "@base-ui/react/accordion"
import { PlusIcon } from "lucide-react"
import Duck from "@/components/common/Duck"
import { WhatsAppIcon } from "@/components/common/Icons"
import Reveal from "@/components/common/Reveal"
import { faqs, faqTopics, whatsappLink } from "@/data/site"
import { cn } from "@/lib/utils"
import { Eyebrow } from "./SectionHeading"

const tabs = ["All", ...faqTopics]

// Lets Google show these answers directly in search results.
const schema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
}

const inTopic = (topic) => (topic === "All" ? faqs : faqs.filter((f) => f.topic === topic))

export default function Faq() {
  const [topic, setTopic] = useState("All")
  const [open, setOpen] = useState([faqs[0].q])
  const items = inTopic(topic)

  function chooseTopic(next) {
    setTopic(next)
    setOpen([inTopic(next)[0].q])
  }

  return (
    <section id="faq" data-tone="petal" className="px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.4fr] lg:gap-16">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="mt-3 text-3xl text-ink sm:text-5xl">Questions, answered</h2>
          <p className="mt-4 max-w-sm text-pretty text-muted-foreground">
            Straight answers about price, timing and what happens after launch. If yours isn't here, just
            ask.
          </p>

          <div className="mt-8 rounded-2xl border border-border bg-surface p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-[#fbebcb]">
                <Duck className="w-[72%] translate-y-[4%]" />
              </span>
              <div>
                <p className="font-medium text-ink">Still have a question?</p>
                <p className="text-sm text-muted-foreground">The duck answers instantly. Humans reply within the hour.</p>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent("chat:open"))}
                className="inline-flex h-10 items-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Ask the duck
              </button>
              <a
                href={whatsappLink("Hi! I have a question about getting a website.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center gap-2 rounded-full border border-border bg-background px-5 text-sm font-medium text-ink transition-colors hover:border-ink/30"
              >
                <WhatsAppIcon className="size-4 text-whatsapp" />
                WhatsApp us
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={100} className="min-w-0">
          <div role="tablist" aria-label="FAQ topics" className="flex flex-wrap gap-2">
            {tabs.map((t) => {
              const selected = t === topic
              return (
                <button
                  key={t}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => chooseTopic(t)}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors duration-200",
                    selected ? "border-ink bg-primary text-primary-foreground" : "border-border bg-surface text-ink hover:border-ink/30"
                  )}
                >
                  {t}
                  <span className={cn("text-xs tabular-nums", selected ? "opacity-70" : "text-muted-foreground")}>
                    {inTopic(t).length}
                  </span>
                </button>
              )
            })}
          </div>

          <Accordion.Root
            key={topic}
            value={open}
            onValueChange={setOpen}
            className="tile-in mt-5 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface shadow-xl shadow-plum/5 dark:shadow-black/30"
          >
            {items.map((f, i) => (
              <Accordion.Item key={f.q} value={f.q} className="group/item relative transition-colors duration-300 data-[open]:bg-glow/30">
                <span
                  aria-hidden
                  className="absolute inset-y-0 left-0 w-[3px] origin-top scale-y-0 bg-marigold transition-transform duration-300 group-data-[open]/item:scale-y-100"
                />
                <Accordion.Header>
                  <Accordion.Trigger className="flex w-full items-center gap-4 px-5 py-5 text-left outline-none focus-visible:bg-background sm:gap-5 sm:px-6">
                    <span className="w-6 shrink-0 font-serif text-sm text-muted-foreground tabular-nums transition-colors group-data-[open]/item:text-marigold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 font-sans text-base font-medium tracking-normal text-ink sm:text-[17px]">{f.q}</span>
                    <span className="grid size-8 shrink-0 place-items-center rounded-full border border-border text-ink transition-all duration-300 group-hover/item:border-ink/40 group-data-[open]/item:rotate-45 group-data-[open]/item:border-primary group-data-[open]/item:bg-primary group-data-[open]/item:text-primary-foreground">
                      <PlusIcon className="size-4" />
                    </span>
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Panel className="h-(--accordion-panel-height) overflow-hidden transition-[height] duration-300 ease-out data-[ending-style]:h-0 data-[starting-style]:h-0">
                  <p className="pr-6 pb-6 pl-[3.75rem] text-[15px] leading-relaxed text-pretty text-muted-foreground sm:pr-16 sm:pl-[4.75rem]">
                    {f.a}
                  </p>
                </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </Reveal>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </section>
  )
}
