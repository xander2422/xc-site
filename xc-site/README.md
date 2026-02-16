# Xander Cayetano — Personal Website

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Your Logo

Replace the logo file in `/public/`:

- **`logo-cream.png`** — Your cream XC logo (used on nav + footer against dark background)

The current file is your uploaded logo. If you want a higher-res version or different format, just replace it with the same filename.

## Customizing Copy

All the text content is in **`src/app/page.js`**. Search for the section you want to edit:

- **Hero** — Your name, tagline, subtitle
- **Marquee** — Brand names in the scrolling ticker
- **Journey** — Timeline milestones (phase, title, description)
- **Services** — The 4 service cards (number, title, description)
- **Results** — Stats (number, label, sub-description)
- **FAQ** — Questions and answers
- **Consult** — "Pick My Brain" section (price, duration, benefits)
- **Contact** — Left-side copy

## Booking Embed

In the Consult section, find the comment:
```
{/* BOOKING EMBED - Replace this div with your Calendly embed */}
```

Replace that `<div>` with your Calendly or Cal.com embed code.

## Social Links

In the Footer component, update the `href="#"` on each social link with your actual URLs.

## Deploy to Vercel

### Option A: Via GitHub
1. Push this project to a GitHub repo
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project" → Import your repo
4. Vercel auto-detects Next.js — just click Deploy
5. Add your custom domain in Project Settings → Domains

### Option B: Via CLI
```bash
npm i -g vercel
vercel
```

Follow the prompts. Then add your domain:
```bash
vercel domains add xandercayetano.com
```

## Colors Reference

| Variable   | Hex       | Usage                     |
|-----------|-----------|---------------------------|
| CREAM     | #EDE8D0   | Primary text, buttons      |
| BLACK     | #0A0A0A   | Background                 |
| DARK_CARD | #131313   | Card backgrounds           |
| CREAM_DIM | #8A8578   | Labels, subtle text        |
| CREAM_MID | #B5B0A0   | Body text, descriptions    |

## Tech Stack

- Next.js 14 (App Router)
- React 18
- Playfair Display + DM Sans (Google Fonts)
- CSS-in-JS (inline styles)
- No external dependencies besides Next.js
