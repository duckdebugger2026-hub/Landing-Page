import LegalLayout from "@/components/layout/LegalLayout"
import { site } from "@/data/site"

export default function Refunds() {
  return (
    <LegalLayout title="Refund policy" updated="6 October 2026">
      <p>We want you to be happy with your website. Here is how refunds work.</p>
      <h2>Before the design preview</h2>
      <p>
        If you cancel before we share your homepage design preview, we refund your advance in full.
      </p>
      <h2>After the design preview</h2>
      <p>
        If you are not happy with the preview, we revise it with you. If you still decide not to go ahead,
        we refund 50% of your advance.
      </p>
      <h2>After launch</h2>
      <p>
        Once your site is live, payments are non-refundable. Domain and hosting costs paid to third
        parties cannot be refunded by us.
      </p>
      <h2>How to request a refund</h2>
      <p>
        Email <a className="underline" href={`mailto:${site.email}`}>{site.email}</a> or message us on
        WhatsApp at {site.whatsappDisplay}. Approved refunds are sent within 7 working days.
      </p>
    </LegalLayout>
  )
}
