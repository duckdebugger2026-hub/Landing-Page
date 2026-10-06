import { industries } from "@/data/site"

function Row({ hidden = false }) {
  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {industries.map((name) => (
        <li key={name} className="flex items-center">
          <span className="px-6 font-serif text-[1.7rem] whitespace-nowrap text-petal italic sm:px-8 sm:text-4xl">
            {name}
          </span>
          <span aria-hidden className="size-1.5 rounded-full bg-marigold" />
        </li>
      ))}
    </ul>
  )
}

// Slow, endless ticker of the kinds of businesses we build for.
export default function Marquee() {
  return (
    <section aria-label="Businesses we build for" className="marquee band-flow relative overflow-hidden bg-band py-6 sm:py-7">
      <div className="marquee-track flex w-max">
        <Row />
        <Row hidden />
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-band sm:w-32" />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-band sm:w-32" />
    </section>
  )
}
