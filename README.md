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
type, and its colour palettes, are in **`src/data/previewPresets.js`**.

Colours live at the top of `src/index.css` (`--plum`, `--marigold`, `--petal`,
`--lilac`, `--haldi`). Components use semantic tokens (`ink`, `surface`, `subtle`,
`band`, `glow`) that switch in dark mode; the dark palette is in the `.dark` block
in the same file. Legal pages are in `src/pages/`.

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
    sections/               Hero, Marquee, Work, LivePreview, Pricing, Estimator,
                            Process, Faq, Contact
    common/                 Icons, Reveal, mockups
    preview/                live preview site and phone/desktop frames
    ui/                     shadcn/ui components
  data/
    site.js                 all content and contact details
    estimator.js            estimator questions and prices
    previewPresets.js       live preview copy and colour palettes
    mockupThemes.js         colours for the portfolio mockups
  hooks/                    useInView, useScrolled, useActiveSection, useCountUp,
                            useTheme
  lib/                      class name helper, rupee formatting
google-apps-script/         enquiry form backend
```
