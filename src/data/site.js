// Everything a client-facing visitor reads lives here.
// Swap these placeholders for your real details before going live.

export const site = {
  name: "Duck Debugger",
  initial: "D",
  url: "https://duckdebugger.in",
  tagline: "Websites for small businesses, beyond the Instagram grid.",
  description:
    "We turn your Instagram following into a fast, mobile-first website. Customers find your prices, book on WhatsApp, and every enquiry lands in your Google Sheet.",
  // Shown in the hero status line. Update it as your calendar fills up.
  availability: "Booking projects for November",
  // Working hours (24-hour clock) for the live "Online now" status in the footer.
  hours: { opens: 10, closes: 20, timeZone: "Asia/Kolkata", place: "India" },
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

// Portfolio. `theme` picks colours from data/mockupThemes.js, `preset` is the
// matching business type in the live preview ("Try this style").
export const projects = [
  {
    name: "Chai Adda Café",
    brand: "Chai Adda",
    headline: "Fresh chai, every evening",
    type: "Café",
    city: "Kolkata",
    theme: "chai",
    preset: "cafe",
    brief:
      "Regulars kept asking for the menu in DMs, and weekend tables were booked over the phone. They wanted the menu online and bookings on WhatsApp.",
    palette: [
      { name: "Milk", hex: "#fdf3e6" },
      { name: "Chai", hex: "#e0a46b" },
      { name: "Clay", hex: "#8c5634" },
      { name: "Kettle", hex: "#5a3420" },
    ],
    font: { name: "Instrument Serif", className: "font-serif" },
    built: ["Menu with prices", "Table booking on WhatsApp", "Instagram feed", "Google Maps"],
    scope: { package: "Starter", pages: "1 page", time: "5 days" },
  },
  {
    name: "Riya Ethnic Boutique",
    brand: "Riya Ethnic",
    headline: "The festive edit is here",
    type: "Fashion",
    city: "Jaipur",
    theme: "rose",
    preset: "boutique",
    brief:
      "Every new collection meant hundreds of “price?” comments. They needed a lookbook that sells, with ordering straight to WhatsApp.",
    palette: [
      { name: "Blush", hex: "#fcedf1" },
      { name: "Gulabi", hex: "#eea0bb" },
      { name: "Rani", hex: "#a8456c" },
      { name: "Wine", hex: "#7a2145" },
    ],
    font: { name: "Instrument Serif Italic", className: "font-serif italic" },
    built: ["Lookbook gallery", "WhatsApp ordering", "Size guide", "Festive offers banner"],
    scope: { package: "Business", pages: "5 pages", time: "9 days" },
  },
  {
    name: "SmileCare Dental",
    brand: "SmileCare Dental",
    headline: "Healthy smiles start here",
    type: "Clinic",
    city: "Pune",
    theme: "sky",
    preset: "clinic",
    brief:
      "Patients couldn't find timings or prices, so the front desk phone rang all day. The clinic wanted calm, clear pages and online appointment requests.",
    palette: [
      { name: "Mist", hex: "#ebf3f9" },
      { name: "Sky", hex: "#8cc2e3" },
      { name: "Ocean", hex: "#2f6f9a" },
      { name: "Navy", hex: "#173e5e" },
    ],
    font: { name: "Geist Bold", className: "font-sans font-bold tracking-tight" },
    built: ["Treatments and prices", "Appointment requests", "Google reviews", "Hindi + English"],
    scope: { package: "Business", pages: "4 pages", time: "8 days" },
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
    when: "Day 0",
    body: "Send an enquiry or message us on WhatsApp.",
  },
  {
    title: "Free consultation",
    when: "Day 1",
    body: "A 15-minute call to understand your business and goals.",
  },
  {
    title: "Design preview",
    when: "Day 3",
    body: "See your homepage design within 3 days and request changes.",
  },
  {
    title: "Build and launch",
    when: "Day 5",
    body: "We build, test on real phones and take your site live.",
  },
  {
    title: "Grow on Instagram",
    when: "Week 2 onwards",
    body: "Add the link to your bio and start tracking enquiries.",
  },
]

// Grouped by topic for the FAQ tabs. The chatbot reuses some of these answers,
// matched by the opening words of the question, so keep those openings stable.
export const faqTopics = ["Pricing", "Process", "Features", "After launch"]

export const faqs = [
  {
    topic: "Pricing",
    q: "How much does a website cost?",
    a: "Packages start at ₹6,999 for a one-page site, ₹12,999 for up to 5 pages and ₹19,999 for up to 10 pages. Every price is fixed and agreed before we start. For something in between, the estimator builds a custom quote in a minute.",
  },
  {
    topic: "Pricing",
    q: "How do payments work?",
    a: "50% to start and 50% before launch, by UPI or bank transfer. If you cancel before seeing the design preview, the advance is refunded in full.",
  },
  {
    topic: "Pricing",
    q: "Are there any monthly fees?",
    a: "Not from us. You pay once for the website. The only yearly cost is your domain at actual price, usually under ₹1,000. An optional care plan is there if you'd like ongoing updates.",
  },
  {
    topic: "Process",
    q: "How long does a website take?",
    a: "Most Starter sites go live in 5 days. Business and Growth sites usually take 1 to 2 weeks, depending on how quickly we receive your photos and content.",
  },
  {
    topic: "Process",
    q: "What do I need to get started?",
    a: "Just a WhatsApp message. Bring your Instagram handle, a few photos and anything you like the look of. If you don't have text or photos ready, we can write the copy and source images for you.",
  },
  {
    topic: "Process",
    q: "Can I see the design before you build it?",
    a: "Always. You get a homepage design preview within 3 days and can ask for changes before a single page is built. Nothing goes live until you're happy with it.",
  },
  {
    topic: "Features",
    q: "Where do my enquiries go?",
    a: "Every enquiry is added as a new row in a Google Sheet that you own, with name, phone, package and message. You can also get an email alert for each one.",
  },
  {
    topic: "Features",
    q: "Can customers book or order on WhatsApp?",
    a: "Yes. Booking, ordering and enquiry buttons open WhatsApp with a message already written, so customers reach you in one tap and you reply from the app you already use.",
  },
  {
    topic: "Features",
    q: "Will my website show up on Google?",
    a: "Every site ships with page titles, descriptions, a sitemap and local business details. We also set up Google Search Console and your Google Business Profile on Business and Growth.",
  },
  {
    topic: "After launch",
    q: "Can I change the website later?",
    a: "Yes. Small text and photo changes are included for the period in your package. After that, changes are billed per request at a simple fixed rate.",
  },
  {
    topic: "After launch",
    q: "Do I need to buy a domain and hosting?",
    a: "We help you pick and register a domain. Hosting runs on a free tier, so you only pay the domain cost at actual price, usually under ₹1,000 a year.",
  },
  {
    topic: "After launch",
    q: "Do you also manage Instagram?",
    a: "The Growth package includes a 12-post content plan to get you started. We can also set up your bio link and highlights so traffic flows to your site.",
  },
  {
    topic: "After launch",
    q: "Who owns the website?",
    a: "You do, completely. The domain is registered in your name, enquiries go to your own Google Sheet, and you can take everything with you whenever you like.",
  },
]
