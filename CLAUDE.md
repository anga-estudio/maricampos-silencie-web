# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` - Start development server (http://localhost:3000)
- `npm run build` - Production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

No test suite exists in this repo.

Required env vars (in `.env.local`, gitignored): `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`. They point at the same Supabase project as `maricampos-web` and `maricampos-naya-web`.

## Architecture

Next.js 16 App Router, React 19, Tailwind CSS 4, TypeScript strict. All UI text is Portuguese (pt-BR). Path alias `@/*` maps to the project root.

### Content is CMS-driven, not hardcoded

The page copy lives in Supabase and is edited from the **`/panel/silencie` CMS in the `maricampos-web` repo** — not here. This repo only reads it.

[app/page.tsx](app/page.tsx) is an async **Server Component** with `export const dynamic = "force-dynamic"`. It calls `getSiteContent("silencie")` from [lib/supabase.ts](lib/supabase.ts), which reads the shared `site_content (site, key, value jsonb)` table with the anon key and `cache: "no-store"`. Together those two settings are what make a panel edit show up on the next request — do not add caching or static rendering to this route.

Keys consumed, and the shape each one must keep in sync with the panel editor:

| Key | Shape | Drives |
|---|---|---|
| `general` | `{header_title, header_description, price, start_date, payment_link, whatsapp_number}` | hero text, price, start date, both CTAs, WhatsApp link |
| `program_includes` | `{meditation[], meetings[], bonus[]}` | the three "você vai receber" cards |
| `rewards` | `string[]` | premiações grid |
| `daily_training` | `string[]` | "treino diário" green section |
| `faq` | `[{question, answer}]` | FAQ accordion |

`price` is a number formatted to pt-BR at render; `start_date` is `YYYY-MM-DD` formatted to a long pt-BR date.

**Testimonials are deliberately not CMS-driven.** They live in the `TESTIMONIALS` constant in `page.tsx`, with photos served from `public/photos/`, so the carousel keeps working with no external dependency. The `site_content` row for `silencie/testimonials` still exists and the panel still has a Depoimentos tab, but nothing reads either one — editing that tab has no effect on the site. Change the constant instead, or wire the key back up if the CMS becomes the source of truth again.

Sections **not** in the panel stay hardcoded in `page.tsx`: "O que é o Silencie", "Mesmo que você", the instructor bio, the pull quote, and the footer. The three program card titles and images are also fixed — only their bullet lists come from the CMS.

Every section driven by a list renders nothing when that list is empty, so a cleared key hides its section rather than showing stale copy.

### Client/server split

The page is a Server Component so it can fetch. Interactive pieces are isolated client components under `app/components/`: `Hero.tsx` (background video, ambient-audio toggle), `TestimonialsCarousel.tsx`, `Faq.tsx`. `BoldSilencie.tsx` is a shared helper that bolds the word "Silencie" inside CMS-authored strings. Keep new interactivity in a leaf client component rather than making the page `"use client"`, which would break the data fetching.

### Known drift

The JSON-LD `FAQPage` block in [app/layout.tsx](app/layout.tsx) is still hardcoded and does not track the CMS `faq` key. Update it by hand when the FAQ changes materially.

## Styling

Tailwind v4 via `@tailwindcss/postcss`; no `tailwind.config` file. Brand tokens are CSS custom properties in [app/globals.css](app/globals.css) — use the semantic classes (`text-green`, `bg-green`, `bg-background`) rather than raw hex. Fonts are Geist Sans and Geist Mono via `next/font`.
