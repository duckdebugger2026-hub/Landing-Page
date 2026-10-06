import { Badge } from "@/components/ui/badge"
import BrowserMockup from "@/components/common/BrowserMockup"
import Reveal from "@/components/common/Reveal"
import { projects } from "@/data/site"
import { cn } from "@/lib/utils"
import SectionHeading from "./SectionHeading"

export default function Work() {
  return (
    <section id="work" className="bg-background px-4 py-20 sm:px-6 sm:py-28">
      <SectionHeading
        eyebrow="Portfolio"
        title="Selected work"
        intro="Websites with the warmth of a handwritten sign and the speed of a modern app."
      />
      <ul className="mx-auto mt-16 max-w-5xl divide-y">
        {projects.map((project, i) => {
          const flipped = i % 2 === 1
          return (
            <li
              key={project.name}
              className="group grid items-center gap-8 py-12 first:pt-0 last:pb-0 md:grid-cols-2 md:gap-14"
            >
              <Reveal x={flipped ? 48 : -48} y={0} className={cn(flipped && "md:order-2")}>
                <BrowserMockup
                  theme={project.theme}
                  brand={project.brand}
                  headline={project.headline}
                  className="transition duration-500 ease-out group-hover:-translate-y-1.5 group-hover:shadow-xl group-hover:shadow-plum/10"
                />
              </Reveal>
              <Reveal delay={120}>
                <p className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="font-serif text-base text-marigold">{String(i + 1).padStart(2, "0")}</span>
                  <span aria-hidden className="h-px w-6 bg-border" />
                  {project.type}, {project.city}
                </p>
                <h3 className="mt-2 text-2xl text-ink sm:text-3xl">{project.name}</h3>
                <p className="mt-3 max-w-md text-muted-foreground">{project.summary}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="rounded-full bg-surface px-2.5 font-normal">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </Reveal>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
