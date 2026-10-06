import LegalLayout from "@/components/layout/LegalLayout"
import { site } from "@/data/site"

export default function Privacy() {
  return (
    <LegalLayout title="Privacy policy" updated="6 October 2026">
      <p>
        This policy explains what {site.name} collects when you use this website and how we use it.
        We keep it short because we collect very little.
      </p>
      <h2>What we collect</h2>
      <p>When you send an enquiry, we receive the details you type into the form:</p>
      <ul>
        <li>Your name and business name</li>
        <li>Your WhatsApp number</li>
        <li>The package you are interested in and your message</li>
      </ul>
      <p>We do not use advertising trackers, and we do not sell or share your details.</p>
      <h2>How we use it</h2>
      <p>
        We use your details only to reply to your enquiry, send you a quote and, if you choose to work
        with us, deliver your project. Enquiries are stored in a private Google Sheet that only our team
        can access.
      </p>
      <h2>How long we keep it</h2>
      <p>
        We keep enquiries for up to 12 months, or for as long as we are working together. You can ask us
        to delete your details at any time.
      </p>
      <h2>Your choices</h2>
      <p>
        To see, correct or delete the details we hold about you, email{" "}
        <a className="underline" href={`mailto:${site.email}`}>{site.email}</a> or message us on WhatsApp
        at {site.whatsappDisplay}.
      </p>
    </LegalLayout>
  )
}
