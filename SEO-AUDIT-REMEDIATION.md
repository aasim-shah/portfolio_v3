# SEO / GEO / AEO Audit — Remediation

Worked against the audit artifact for aasimshah.com. The audit was run on a stale
deployment, so a large share of its findings (per-page metadata, OG tags, Person /
Service / FAQ / Breadcrumb JSON-LD) were **already implemented** in the codebase.
This pass fixed the genuine gaps and hardened what existed.

## Done (code)

### Technical SEO
- **Removed the broken global canonical.** `app/layout.tsx` hard-coded
  `<link rel="canonical" href="https://aasimshah.com">` in `<head>`, so *every*
  page also declared the homepage as its canonical (in addition to its real one).
  Now each route emits exactly one, correct canonical.
- **`/blogs` duplicate title fixed.** The blog index had no `metadata` export and
  inherited the homepage title. It now has its own title, description, canonical,
  and OG tags.
- **Real Open Graph / Twitter images.** `OG image` pointed at `/profile.png`,
  which did not exist in `public/`. Added generated 1200×630 cards:
  `app/opengraph-image.tsx`, `app/twitter-image.tsx`, and per-article
  `app/(pages)/blogs/[slug]/opengraph-image.tsx` (shared renderer in
  `lib/ogImage.tsx`). Copied a real portrait to `public/profile.png` for schema.
- **Sitemap `lastmod`.** Every URL previously shared one build-time timestamp.
  Now each route has a distinct, hand-maintained date and blog posts use their
  own publish/updated dates (`app/sitemap.ts`).
- **ISO 8601 dates.** Blog data carried only `"March 12, 2025"`-style strings;
  added a real `date` (and optional `updated`) field used by schema + sitemap
  (`types/index.ts`, `data/index.tsx`).
- Added `Strict-Transport-Security` (HSTS) header (`next.config.ts`).
- Added metadata + canonicals to `/privacy`, `/terms`, `/refund`; `noindex` on 404.

### On-page SEO
- **Missing H1s added.** `/services`, `/about`, `/blogs` rendered their page title
  through `SectionHeading` as an `<h2>` with no `<h1>`. `SectionHeading` now takes
  `titleAs="h1"` and those three pages use it. `/services` H1 is now
  "Full-Stack & Cloud Development Services".
- **Homepage H1** now includes the role ("Senior Full-Stack Engineer & Solution
  Architect") alongside the name.
- **Alt text.** Decorative icons (`SectionHeading`, `MyServices`, `MyStack`,
  services page) set to `alt=""` + `aria-hidden`; experience logos get
  `"<company> logo"`; side-nav avatar alt changed from "Avatar" to a descriptive
  label.
- Nested `<main>` on `/contact` collapsed to a `<div>` (one landmark per page).

### GEO
- Consolidated all sitewide JSON-LD into one `@graph` (`WebSite`, `Person`,
  `Organization` for CoreByte Studio, `ProfessionalService`) with stable `@id`s
  and cross-references. Added the previously missing **Organization** node.
- **`BlogPosting` + `BreadcrumbList` JSON-LD on each article page** (was only a
  list on the index) — `author`/`publisher` linked to the Person `@id`,
  `datePublished`, `dateModified`, `mainEntityOfPage`, `image`, `articleSection`.
- `AboutPage` schema + breadcrumb on `/about`; homepage `WebPage` now references
  the graph by `@id`.

### AEO
- FAQ answers now render **in the DOM at all times** (crawlable) instead of being
  mounted only on click; question row is a real `<button>` with
  `aria-expanded`/`aria-controls`; questions are `<h3>` under the section `<h2>`.
- Blog articles: in-page **table of contents** with anchor links, `id` on every
  section, `<time datetime>`, visible breadcrumb, question-phrased `<h2>`
  headings, an **answer-first lead paragraph** per section, a **Related reading**
  block, and internal links to `/services` and `/contact`.

## Second pass — now also done

- **Blog depth.** Added 4 grounded articles (`data/index.tsx` +
  `articleContent` in `app/(pages)/blogs/[slug]/page.tsx`), dated Apr–Aug 2026 so
  the freshness signal recovers: WireGuard fleet operations, payment-gateway
  abstraction (Stripe/MAIB), Socket.io real-time messaging, and the eEagle VPN
  Chrome extension. **Marked `TODO(content)` — owner-review drafts** built from
  documented experience; edit voice/details freely. Blog total is now 7.
- **External citations.** Every article (old and new) now renders a **References**
  list of authoritative sources (official docs, OWASP, Google SRE book, etc.) and
  emits them as `citation` in the `BlogPosting` JSON-LD.
- **`WebSite` `SearchAction`.** Built a real server-side blog search
  (`/blogs?q=…` filters by title/excerpt/category, with a `role="search"` form)
  and wired the matching `SearchAction` into the `WebSite` node.
- **Homepage is now a Server Component.** `app/page.tsx` dropped `"use client"`
  (the widget moved to `components/HomeChatbot.tsx`), exports its own metadata,
  and keeps its JSON-LD. Less client JS on the largest page.
- **`next/image` for project screenshots.** Raw `<img>` in
  `components/ProjectsCasebook.tsx` replaced with `next/image` (`fill` + `sizes`).
- **`worksFor`.** Resolved in the graph: Appworks is `worksFor` (current
  employer); the CoreByte Studio `Organization` node carries `founder` +
  `Person.affiliation`. Comment added in `app/layout.tsx`.
- **Testimonials plumbing.** `components/Testimonials.tsx` rewritten to be
  data-driven, semantic (`<blockquote>`/`<figure>`), render nothing while empty,
  and emit `Review` JSON-LD per entry. Wired into `/` and `/services`.

## Still needs you — cannot be done without real information

1. **Real testimonials.** Left deliberately empty. Placeholder quotes exist in
   `training-data/` (Sarah Thompson, John Anderson, …) — those are generic stock
   personas, not verifiable clients; publishing them (especially with
   `Review`/`AggregateRating` schema) would be fabricated reviews and a real
   Google penalty risk. Add attributable quotes (name + role + company, ideally a
   link) to the `testimonials` array in `data/index.tsx` and the section renders
   automatically. Added an honest interim line on `/services`: "Client references
   available on request."
2. **Stronger certifications.** Only Coursera/Udemy are listed. If AWS / CKA /
   GCP / etc. exist, add them to `hasCredential` in `app/layout.tsx` with the
   issuer and a verification URL. I won't invent credentials.
3. **Review the 4 new blog drafts + the question-headings/summaries** on the 3
   original posts (all `TODO(content)` in `app/(pages)/blogs/[slug]/page.tsx`).
   Facts are grounded in your experience data, but the phrasing is mine.
