import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { faqs } from "@/data/site"
import Reveal from "@/components/common/Reveal"
import SectionHeading from "./SectionHeading"

export default function Faq() {
  return (
    <section id="faq" className="bg-subtle px-4 py-20 sm:px-6 sm:py-28">
      <SectionHeading eyebrow="FAQ" title="Questions, answered" intro="Still unsure? Ask us anything on WhatsApp." />
      <Reveal delay={100} className="mx-auto mt-12 max-w-2xl">
      <Accordion defaultValue={[1]} className="border-t border-ink/10">
        {faqs.map((faq, i) => (
          <AccordionItem key={faq.q} value={i} className="border-b border-ink/10">
            <AccordionTrigger className="py-4 font-sans text-[15px] text-ink hover:no-underline">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="pb-5 text-[15px] leading-relaxed text-muted-foreground">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      </Reveal>
    </section>
  )
}
