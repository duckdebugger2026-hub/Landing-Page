import LegalLayout from "@/components/layout/LegalLayout"
import { site } from "@/data/site"

export default function Terms() {
  return (
    <LegalLayout title="Terms of service" updated="6 October 2026">
      <p>
        These terms apply when you hire {site.name} to design and build a website. We confirm the scope,
        price and timeline for every project in writing on WhatsApp or email before work begins.
      </p>
      <h2>Payment</h2>
      <p>
        Projects are billed 50% upfront and 50% before launch. Domain and hosting costs are billed at
        actual cost and are paid by you or reimbursed to us.
      </p>
      <h2>Your content</h2>
      <p>
        You are responsible for the photos, text and logos you send us, and confirm you have the right to
        use them. We can suggest licensed stock photos where needed.
      </p>
      <h2>Ownership</h2>
      <p>
        Once the final payment is made, the website design and content belong to you. Your domain is
        registered in your name. We may show the finished site in our portfolio unless you ask us not to.
      </p>
      <h2>Changes and support</h2>
      <p>
        Each package includes a period of free changes, as listed on the pricing section. Larger changes,
        new pages or redesigns are quoted separately.
      </p>
      <h2>Contact</h2>
      <p>
        Questions about these terms? Email{" "}
        <a className="underline" href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </LegalLayout>
  )
}
