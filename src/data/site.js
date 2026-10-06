// Everything a client-facing visitor reads lives here.
// Swap these placeholders for your real details before going live.

export const site = {
  name: "Duck Debugger",
  initial: "D",
  url: "https://duckdebugger.in",
  tagline: "Websites for small businesses, beyond the Instagram grid.",
  description:
    "We design fast, mobile-first websites for small businesses. Enquiries land straight in your Google Sheet, and customers can reach you on WhatsApp in one tap.",
  about:
    "is a small web studio helping local businesses look as good online as they do in person.",
  city: "India",
  email: "hello@duckdebugger.in",
  // Country code + number, digits only. Used for wa.me links.
  whatsapp: "919000000000",
  whatsappDisplay: "+91 90000 00000",
  whatsappMessage: "Hi! I'd like a website for my business.",
  instagram: "duckdebugger",
  // Google Apps Script web app URL. See google-apps-script/README.md.
  // Leave empty and the form falls back to opening WhatsApp with the enquiry.
  sheetEndpoint: import.meta.env.VITE_SHEET_ENDPOINT ?? "",
}

export function whatsappLink(message = site.whatsappMessage) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`
}

export const instagramLink = `https://instagram.com/${site.instagram}`

export const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Try it", href: "#preview" },
  { label: "Pricing", href: "#pricing" },
  { label: "Process", href: "#process" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
]

// Shown in the scrolling band under the hero.
export const industries = [
  "Cafés",
  "Boutiques",
  "Salons",
  "Jewellers",
  "Clinics",
  "Coaching centres",
  "Bakeries",
  "Wedding planners",
  "Gyms",
  "Home chefs",
]

export const projects = [
  {
    name: "Chai Adda Café",
    brand: "Chai Adda",
    headline: "Fresh chai, every evening",
    type: "Café",
    city: "Kolkata",
    summary:
      "Menu, table bookings and Instagram feed. Designed to feel like the shop itself, with enquiries flowing into a shared Google Sheet.",
    tags: ["Starter", "Bookings"],
    theme: "chai",
  },
  {
    name: "Riya Ethnic Boutique",
    brand: "Riya Ethnic",
    headline: "The festive edit is here",
    type: "Fashion",
    city: "Jaipur",
    summary:
      "Lookbook with WhatsApp ordering. Designed to feel like the shop itself, with enquiries flowing into a shared Google Sheet.",
    tags: ["Business", "WhatsApp orders"],
    theme: "rose",
  },
  {
    name: "SmileCare Dental",
    brand: "SmileCare Dental",
    headline: "Healthy smiles start here",
    type: "Clinic",
    city: "Pune",
    summary:
      "Appointment enquiries and patient reviews. Designed to feel like the shop itself, with enquiries flowing into a shared Google Sheet.",
    tags: ["Business", "Google Sheets"],
    theme: "sky",
  },
]

export const packages = [
  {
    name: "Starter",
    blurb: "Get online fast with a single, polished page.",
    price: "₹6,999",
    popular: false,
    features: [
      "One-page website",
      "Mobile-friendly design",
      "Enquiry form to Google Sheets",
      "WhatsApp chat button",
      "Basic SEO setup",
      "Live in 5 days",
    ],
  },
  {
    name: "Business",
    blurb: "A complete website for a growing local business.",
    price: "₹12,999",
    popular: true,
    features: [
      "Up to 5 pages",
      "Everything in Starter",
      "Project and photo gallery",
      "Instagram feed and links",
      "Google Business Profile setup",
      "1 month of free changes",
    ],
  },
  {
    name: "Growth",
    blurb: "Website plus a running start on Instagram.",
    price: "₹19,999",
    popular: false,
    features: [
      "Up to 10 pages",
      "Everything in Business",
      "Instagram content plan (12 posts)",
      "Monthly enquiry report",
      "Priority WhatsApp support",
      "3 months of free changes",
    ],
  },
]

export const steps = [
  {
    title: "Say hello",
    body: "Send an enquiry or message us on WhatsApp.",
  },
  {
    title: "Free consultation",
    body: "A 15-minute call to understand your business and goals.",
  },
  {
    title: "Design preview",
    body: "See your homepage design within 3 days and request changes.",
  },
  {
    title: "Build and launch",
    body: "We build, test on real phones and take your site live.",
  },
  {
    title: "Grow on Instagram",
    body: "Add the link to your bio and start tracking enquiries.",
  },
]

export const faqs = [
  {
    q: "How long does a website take?",
    a: "Most Starter sites go live in 5 days. Business and Growth sites usually take 1 to 2 weeks, depending on how quickly we receive your photos and content.",
  },
  {
    q: "Where do my enquiries go?",
    a: "Every enquiry is added as a new row in a Google Sheet that you own, with name, phone, package and message. You can also get an email alert for each one.",
  },
  {
    q: "Do I need to buy a domain and hosting?",
    a: "We help you pick and register a domain. Hosting runs on a free tier, so you only pay the domain cost at actual price, usually under ₹1,000 a year.",
  },
  {
    q: "Can I change the website later?",
    a: "Yes. Small text and photo changes are included for the period in your package. After that, changes are billed per request at a simple fixed rate.",
  },
  {
    q: "Do you also manage Instagram?",
    a: "The Growth package includes a 12-post content plan to get you started. We can also set up your bio link and highlights so traffic flows to your site.",
  },
  {
    q: "Will my website show up on Google?",
    a: "Every site ships with page titles, descriptions, a sitemap and local business details. We also set up Google Search Console and your Google Business Profile on Business and Growth.",
  },
]
