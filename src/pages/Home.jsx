import DotField from "@/components/common/DotField"
import Footer from "@/components/layout/Footer"
import Header from "@/components/layout/Header"
import ChatWidget from "@/components/chat/ChatWidget"
import Contact from "@/components/sections/Contact"
import Estimator from "@/components/sections/Estimator"
import Faq from "@/components/sections/Faq"
import StudioNote from "@/components/sections/StudioNote"
import Hero from "@/components/sections/Hero"
import Inbox from "@/components/sections/Inbox"
import Marquee from "@/components/sections/Marquee"
import Pricing from "@/components/sections/Pricing"
import Process from "@/components/sections/Process"
import Promises from "@/components/sections/Promises"
import LivePreview from "@/components/sections/LivePreview"
import Work from "@/components/sections/Work"
import { useScrollTone } from "@/hooks/useScrollTone"

export default function Home() {
  useScrollTone()
  return (
    <>
      <DotField />
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Inbox />
        <Work />
        <LivePreview />
        <Promises />
        <Pricing />
        <Estimator />
        <Process />
        <StudioNote />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <ChatWidget />
    </>
  )
}
