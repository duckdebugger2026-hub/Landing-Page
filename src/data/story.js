// Copy for the storytelling sections: the DM inbox, the four promises and the
// WhatsApp chat in "How it works". Edit freely; the components read from here.

export const dms = [
  { name: "priya.eats", question: "price for the thali?", answer: "Menu page with prices", time: "2m" },
  { name: "rahul_k", question: "where exactly are you?", answer: "Map and directions", time: "9m" },
  { name: "the.foodie.diaries", question: "open on sunday??", answer: "Opening hours, always current", time: "14m" },
  { name: "ananya.r", question: "can i book for 6 people", answer: "Table booking on WhatsApp", time: "31m" },
  { name: "meera_s", question: "do you deliver to salt lake?", answer: "Delivery areas, listed", time: "1h" },
]

export const promises = [
  {
    ring: "FIXED PRICE · NO SURPRISES · AGREED UPFRONT · ",
    mark: "₹",
    title: "One price, agreed upfront",
    body: "You see the full price before we start. If we scoped it wrong, that's on us, not you.",
  },
  {
    ring: "LIVE IN FIVE DAYS · ON TIME · EVERY TIME · ",
    mark: "5",
    title: "Live in five days",
    body: "Most one-page sites go live within a working week of getting your photos and text.",
  },
  {
    ring: "YOURS FROM DAY ONE · NO LOCK-IN · EVER · ",
    mark: "∞",
    title: "Yours from day one",
    body: "Your domain, your Google Sheet, your files. Leave whenever you like and take it all.",
  },
  {
    ring: "WHATSAPP · NOT TICKETS · REAL PEOPLE · ",
    mark: "wa",
    title: "WhatsApp, not tickets",
    body: "Message the people who actually build your site. Replies usually within the hour.",
  },
]

// One group of messages per step in data/site.js `steps`.
// `from: "you"` is the business owner, `from: "us"` is the studio.
export const chat = [
  [
    { from: "you", text: "Hi! I run a home bakery in Delhi 🎂 Can you make us a website?" },
    { from: "us", text: "Hi Sana! We'd love to. Send us your Instagram and we'll take a look." },
  ],
  [
    { from: "us", text: "Lovely page! Free for a 15-minute call tomorrow at 11?" },
    { from: "you", text: "Perfect, talk then 👍" },
  ],
  [
    { from: "us", preview: true, text: "Here's your homepage. What would you change?" },
    { from: "you", text: "Love it! Can the cakes be bigger? 😄" },
  ],
  [
    { from: "us", text: "Done, and tested on six phones. butterandbloom.in is live 🎉" },
    { from: "you", text: "😍😍😍" },
  ],
  [
    { from: "us", text: "Add the link to your Instagram bio. Every order lands in your Google Sheet." },
    { from: "you", text: "First cake order already came in!" },
  ],
]

export const duckLines = [
  "Quack. Tell me about your business.",
  "Explaining it out loud helps. Promise.",
  "Have you tried WhatsApp? They reply fast.",
  "Psst. The price estimator is just above.",
  "I've heard every website idea. Try me.",
]
