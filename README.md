# Duck Debugger website

Landing page for pitching website design to small businesses. Built from design
direction **B, Plum & Marigold**: DM Serif Display + DM Sans, deep plum with
marigold accents, a centred hero with fanned phones, and a dark pricing band.

React 19 (JavaScript/JSX) · Vite · Tailwind CSS v4 · shadcn/ui · React Router

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:5173.

## Make it yours

Almost everything a visitor reads is in **`src/data/site.js`**:

- Brand name, email, WhatsApp number and Instagram handle
- Portfolio projects, pricing packages, process steps and FAQs

Also update the page title, description and business details in **`index.html`**
(used by Google and by link previews on WhatsApp and Instagram), and the domain in
`public/robots.txt` and `public/sitemap.xml`.

Estimator prices (pages, features, rush delivery, care plan) are in
**`src/data/estimator.js`**. The live preview's sample copy for each business
type, and its colour palettes, are in **`src/data/previewPresets.js`**. The DM
inbox, the four promise stamps, the WhatsApp chat in "How it works" and the
duck's lines are in **`src/data/story.js`**. The hero's availability line is in
`src/data/site.js`, along with your working hours (`hours`), which drive the
footer's live "Online now" status.

The "Ask the duck" chat assistant is scripted, so it's free and works on static
hosting. Its topics, trigger words and replies are in **`src/data/chatbot.js`**;
answers about prices, timelines and FAQs are pulled from the rest of the site's
data, so they stay in sync. Anything it can't answer goes to WhatsApp with the
visitor's question pre-filled.

Colours live at the top of `src/index.css` (`--plum`, `--marigold`, `--petal`,
`--lilac`, `--haldi`). Components use semantic tokens (`ink`, `surface`, `subtle`,
`band`, `glow`) that switch in dark mode; the dark palette is in the `.dark` block
in the same file.

Each homepage section has a `data-tone` (petal, cream, lilac, blush or plum),
and the page background glides between them as you scroll. The tone colours are
the `--tone-*` variables in `src/index.css`. The interactive dot grid behind the
page is `src/components/common/DotField.jsx`, and the slowly drifting colour
glows behind it are `src/components/common/Aurora.jsx` (their colours per mood
are the `--b-*` variables in `src/index.css`). Legal pages are in `src/pages/`.

## Enquiry form

Enquiries are saved to a Google Sheet through a free Google Apps Script web app.
Follow `google-apps-script/README.md`, then set `VITE_SHEET_ENDPOINT` in
`.env.local`. Until then, the form opens WhatsApp with the enquiry pre-filled.

## Deploy

```bash
npm run build
```

This writes a static site to `dist/`. Deploy it to Vercel or Netlify (free tier),
and add `VITE_SHEET_ENDPOINT` to the host's environment variables.
`vercel.json` and `public/_redirects` make sure `/privacy`, `/terms` and
`/refunds` load correctly when opened directly.

## Project layout

```
index.html                  page title, SEO meta tags, structured data
src/
  main.jsx                  entry point
  App.jsx                   routes
  index.css                 Tailwind setup and brand colours
  pages/                    Home, Privacy, Terms, Refunds
  components/
    layout/                 Header, Footer, Logo, LegalLayout, WhatsAppButton
    hero/                   Instagram-to-website morphing phone
    sections/               Hero, Marquee, Inbox, Work, LivePreview, Promises,
                            Pricing, Estimator, Process, StudioNote, Faq, Contact
    common/                 Icons, Reveal, DotField, Aurora, Type, mockups
    preview/                live preview site and phone/desktop frames
    footer/                 live studio status, wordmark, duck pond
    chat/                   "Ask the duck" chat widget
    ui/                     shadcn/ui components
  data/
    site.js                 all content and contact details
    estimator.js            estimator questions and prices
    previewPresets.js       live preview copy and colour palettes
    story.js                DMs, promises, WhatsApp chat script, duck lines
    chatbot.js              chat assistant topics and replies
    mockupThemes.js         colours for the portfolio mockups
  hooks/                    useInView, useScrolled, useActiveSection, useCountUp,
                            useTheme, useScrollTone, useScrollProgress
  lib/                      class names, rupee formatting, studio hours,
                            chat engine
google-apps-script/         enquiry form backend
```
