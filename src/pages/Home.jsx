import Footer from "@/components/layout/Footer"
import Header from "@/components/layout/Header"
import WhatsAppButton from "@/components/layout/WhatsAppButton"
import Contact from "@/components/sections/Contact"
import Estimator from "@/components/sections/Estimator"
import Faq from "@/components/sections/Faq"
import Hero from "@/components/sections/Hero"
import Marquee from "@/components/sections/Marquee"
import Pricing from "@/components/sections/Pricing"
import Process from "@/components/sections/Process"
import LivePreview from "@/components/sections/LivePreview"
import Work from "@/components/sections/Work"

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Work />
        <LivePreview />
        <Pricing />
        <Estimator />
        <Process />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
