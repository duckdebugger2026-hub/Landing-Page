import { WhatsAppIcon } from "@/components/common/Icons"
import { promises } from "@/data/story"
import { useInView } from "@/hooks/useInView"
import { cn } from "@/lib/utils"
import SectionHeading from "./SectionHeading"
import { Em } from "@/components/common/Type"

const tilts = [-8, 5, -4, 7]

// A round rubber stamp: text around the rim, a big mark in the middle.
function Stamp({ id, ring, mark }) {
  return (
    <svg viewBox="0 0 160 160" className="size-36 sm:size-40" aria-hidden>
      <defs>
        <path id={id} d="M80,80 m-58,0 a58,58 0 1,1 116,0 a58,58 0 1,1 -116,0" />
      </defs>
      <circle cx="80" cy="80" r="76" fill="none" stroke="currentColor" strokeWidth="3" />
      <circle cx="80" cy="80" r="70" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="80" cy="80" r="44" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <text fill="currentColor" fontSize="11" fontWeight="700" className="font-sans">
        <textPath href={`#${id}`} textLength="362" lengthAdjust="spacing">
          {ring}
        </textPath>
      </text>
      {mark === "wa" ? (
        <foreignObject x="56" y="56" width="48" height="48">
          <WhatsAppIcon className="size-12" strokeWidth={2.2} />
        </foreignObject>
      ) : (
        <text x="80" y="80" textAnchor="middle" dominantBaseline="central" fill="currentColor" fontSize="46" className="font-serif">
          {mark}
        </text>
      )}
    </svg>
  )
}

export default function Promises() {
  const [ref, inView] = useInView({ rootMargin: "0px 0px -20% 0px" })

  return (
    <section id="promises" data-tone="cream" className="px-4 py-20 sm:px-6 sm:py-28">
      <SectionHeading
        eyebrow="In writing"
        title={<>Four promises, <Em>stamped</Em></>}
        intro="Every project starts with a one-page agreement. These four lines are always on it."
      />
      <ul ref={ref} className="mx-auto mt-16 grid max-w-6xl gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
        {promises.map((p, i) => (
          <li key={p.title} className="flex flex-col items-center text-center">
            <div
              className={cn("stamp text-[#a35c12] dark:text-marigold", inView && "is-stamped")}
              style={{ "--tilt": `${tilts[i]}deg`, "--d": `${i * 180}ms` }}
            >
              <Stamp id={`stamp-ring-${i}`} ring={p.ring} mark={p.mark} />
            </div>
            <h3 className="mt-6 text-xl text-ink sm:text-2xl">{p.title}</h3>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">{p.body}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
