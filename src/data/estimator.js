// Prices for the "Build your package" estimator. All amounts are in rupees.
// Change any number here and the estimator updates everywhere.

export const businessTypes = [
  { id: "food", label: "Café or restaurant", recommends: ["booking", "gallery", "instagram"] },
  { id: "retail", label: "Shop or boutique", recommends: ["catalogue", "instagram", "gallery"] },
  { id: "services", label: "Salon, clinic or studio", recommends: ["booking", "reviews", "gbp"] },
  { id: "education", label: "Coaching or classes", recommends: ["booking", "reviews", "blog"] },
  { id: "events", label: "Wedding or events", recommends: ["gallery", "instagram", "reviews"] },
  { id: "other", label: "Something else", recommends: [] },
]

export const sizes = [
  { id: "one", label: "One page", detail: "Everything on a single, scrolling page", price: 6999, package: "Starter" },
  { id: "five", label: "Up to 5 pages", detail: "Home, about, services, gallery and contact", price: 11999, package: "Business" },
  { id: "ten", label: "Up to 10 pages", detail: "Room for menus, collections or courses", price: 17999, package: "Growth" },
]

export const features = [
  { id: "booking", label: "Bookings or appointments", detail: "Customers pick a time, you get it on WhatsApp", price: 2500 },
  { id: "catalogue", label: "Product catalogue", detail: "Browse products and order on WhatsApp", price: 3000 },
  { id: "gallery", label: "Photo gallery", detail: "Show off your space, food or work", price: 1000 },
  { id: "instagram", label: "Instagram feed", detail: "Your latest posts, always up to date", price: 800 },
  { id: "reviews", label: "Google reviews", detail: "Your best reviews, front and centre", price: 800 },
  { id: "gbp", label: "Google Business Profile", detail: "Show up on Google Maps and Search", price: 1500 },
  { id: "bilingual", label: "Hindi + English", detail: "Two languages with a simple switch", price: 3500 },
  { id: "blog", label: "Blog or updates", detail: "Share news, offers and results", price: 2500 },
]

export const contentOptions = [
  { id: "ready", label: "I have photos and text", detail: "Send them over and we'll arrange them", price: 0 },
  { id: "copy", label: "Write the text for me", detail: "We write clear copy from a short call", price: 2000 },
  { id: "full", label: "Text and photos", detail: "We write the copy and source photos", price: 4000 },
]

export const logo = { label: "Design a simple logo", detail: "A clean wordmark and icon in your colours", price: 2500 }

export const timelines = [
  { id: "standard", label: "Standard", detail: "Live in 7 to 10 days", surcharge: 0 },
  { id: "rush", label: "Rush", detail: "Live in 5 days", surcharge: 0.25 },
]

export const carePlans = [
  { id: "none", label: "No thanks", detail: "Changes billed when you need them", monthly: 0 },
  { id: "care", label: "Care plan", detail: "Monthly updates, backups and support", monthly: 999 },
]
