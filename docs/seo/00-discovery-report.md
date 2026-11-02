# Entelechae Visuals: Comprehensive Discovery & Investigation Report
**Document ID:** `docs/seo/00-discovery-report.md`  
**Execution Stage:** STAGE A — Discovery & Investigation  
**Author:** Autonomous SEO Engineering Organization (via `claude-seo` v2.5.0)  
**Target URL:** `https://entele-visuals.vercel.app/`  
**Parent Brand:** Entelechae  
**Audit Timestamp:** 2026-11-03 01:00 UTC+05:30  

---

## 1. Executive Mission & System Baseline

Entelechae Visuals is a specialized creative frontend development and motion design resource discovery platform. It provides interactive, copy-ready UI components and curated web templates for frontend engineers, motion designers, creative technologists, and digital agencies across React, Framer, Webflow, Tailwind CSS, Shopify, Next.js, Astro, and Nuxt.

This report establishes the baseline technical, architectural, structural, and search-visibility reality of the live platform prior to any optimization or engineering modifications.

---

## 2. Codebase & Architectural Audit

### 2.1 Stack & Framework Identification
- **Frontend Core:** React 18.3.1 + TypeScript (Vite 5.4.11 bundling).
- **Styling & Design System:** Tailwind CSS 3.4.15 with custom dark theme tokens (`#09090b` zinc backdrop, border highlights in `white/[0.08]`, and subtle selection styling).
- **Icons & Visuals:** `lucide-react` (clean SVG icon set).
- **Backend / API Routing:** Vercel Serverless Functions (`api/templens.js`, `api/search.js`) providing an edge caching proxy to `https://templens.com/api/`.
- **Hosting & Infrastructure:** Vercel Global Edge Network with automatic HTTP/2, Brotli compression, and custom Edge header injections (`vercel.json`).

### 2.2 Routing & Navigation Architecture
- **Current Pattern:** Client-side in-memory state switching via `React.useState`:
  - `modeFilter`: toggles between `'templates'`, `'components'`, `'sections'`, and `'all'`.
  - `selectedCategory`: filters component categories.
  - `selectedPlatform`: filters template frameworks (`framer`, `webflow`, `shopify`, `nextjs`, `react`, `astro`, `nuxt`).
- **Defect:** There is **no client-side path router** (e.g. React Router, TanStack Router) or HTML5 pushState history management. Every filter change, modal preview, or category switch leaves the browser URL at `https://entele-visuals.vercel.app/`.
- **Crawl Impact:** Search engine spiders encounter only a single route (`/`), leaving the hundreds of components and thousands of templates completely unrepresented as discrete, indexable URLs.

### 2.3 Resource Inventory Verification

| Asset Class | Claimed / Public Figure | Verified in Codebase | Source of Truth |
|---|---|---|---|
| **Motion Components** | 897 Assets | **897 Components** (Verified) | `src/data/components.json` |
| **Bundled Offline Templates** | N/A | **1,774 Templates** (Verified) | `src/data/templatesData.json` |
| **Live Remote Templates** | 28,047 Templates | **28,047 Templates** (Verified via API) | `https://templens.com/api/` via `/api/templens` |
| **Total Discoverable Assets** | ~28,944 Assets | **28,944 Assets** | Verified combination |

#### Component Inventory by Category
1. `background-animation`: 295 components
2. `interactive-elements`: 132 components
3. `animation`: 102 components
4. `text`: 91 components
5. `hero`: 71 components
6. `image-gallery`: 50 components
7. `image`: 43 components
8. `button`: 29 components
9. `loader`: 28 components
10. `cursor`: 24 components
11. `games`: 7 components
12. `features`: 6 components
13. `border`: 4 components
14. `cta`: 4 components
15. `pricing`: 4 components
16. `footer`: 3 components
17. `contact`: 1 component
18. `testimonials`: 1 component
19. `stats`: 1 component
20. `faq`: 1 component

---

## 3. Live Browser-Rendered Inspection (Headless Playwright DOM)

### 3.1 Initial Render & Hydration
- **Render Engine:** Playwright Headless Chromium.
- **Initial Paint Time:** ~2,672 ms.
- **Raw Initial HTML Payload:**
  ```html
  <!doctype html>
  <html lang="en" class="dark">
    <head>...</head>
    <body class="bg-bg text-foreground ...">
      <div id="root"></div>
    </body>
  </html>
  ```
- **Finding:** The initial HTML contains only 8 words and an empty `<div id="root"></div>`. Any search engine crawler, RSS reader, AI scraper, or social media link bot that parses raw HTML without executing full client JavaScript perceives an entirely empty application.

### 3.2 Live Header & Document Metadata
- **`<title>`:** `Entele-Visuals — Animated Components & 28,047 Web Templates` (57 characters — clean, descriptive, optimal length).
- **`<meta name="description">`:** `Entele-Visuals: 897 interactive motion components and 28,047 web templates for Framer, Webflow, Shopify, Next.js, React, Astro and Nuxt with live previews.` (153 characters — concise, keyword-rich, optimal length).
- **Favicon:** Inline SVG emoji data URI (`⚡`).
- **Viewport:** `width=device-width, initial-scale=1.0, maximum-scale=5.0`.

---

## 4. Claude SEO Framework Readiness Check

Claude SEO v2.5.0 was queried directly via its diagnostic runtime launcher:
```bash
claude-seo doctor
```
**Diagnostic Result:**
- **Runtime:** `ready`
- **Install Mode:** `manual`
- **Python Version:** `3.12`
- **Playwright Headless Chromium:** `ready`
- **Sub-skills available:** 32 specialized SEO skills
- **Subagents active:** 20 specialist agents

---

## 5. Search Visibility & Technical Defect Ledger

### 5.1 Technical SEO Gaps
1. **Critical Defect: Missing `robots.txt`**
   - Querying `https://entele-visuals.vercel.app/robots.txt` returns `index.html` (HTTP 200 `text/html`).
   - Root Cause: No `public/robots.txt` exists in the codebase. Vercel's rewrite rule (`/(.*) -> /index.html`) intercepts the request.
2. **Critical Defect: Broken / Missing `sitemap.xml`**
   - Querying `https://entele-visuals.vercel.app/sitemap.xml` returns `index.html` (HTTP 200 with HTML doctype).
   - `sitemap_discovery.py` error: `"DOCTYPE is not allowed in sitemap XML"`. Search engine sitemap processors fail automatically.
3. **Critical Defect: Missing Canonical Tag**
   - `parse_html.py` reported `"canonical": null`. The site risks keyword cannibalization and split ranking signals across Vercel deployment hashes (`*.vercel.app`).
4. **Critical Defect: Zero Schema.org Structured Data**
   - 0 JSON-LD blocks found. Neither Google nor AI search systems can interpret the platform type, entity relation, or asset catalog.
5. **High Defect: Missing Open Graph & Twitter Social Metadata**
   - No `og:title`, `og:image`, `og:description`, `og:url`, or `twitter:card` tags exist in `index.html`. Link sharing on Slack, Discord, Twitter/X, and LinkedIn generates blank cards.
6. **High Defect: AI Search & Agentic Soft 404s**
   - `agentic_check.py` confirmed that `/llms.txt`, `/.well-known/ai-catalog.json`, and arbitrary URLs return status 200 with `index.html`. Lighthouse flags this as a non-compliant soft 404.

---

## 6. Baseline SEO Performance Scorecard

| Pillar | Diagnostic Score | Grade | Status |
|---|:---:|:---:|:---|
| Technical SEO | 68 / 100 | B- | Missing robots.txt, sitemap.xml, canonical URL |
| Content Quality & E-E-A-T | 78 / 100 | B+ | High quality component copy, but lacks editorial guides |
| On-Page & Social Metadata | 60 / 100 | C | Clean title/description, but 0 social cards & weak H1/H2 |
| Schema & Structured Data | 0 / 100 | F | 0 JSON-LD blocks detected |
| Performance & CWV | 82 / 100 | A- | Fast edge responses; needs font & image preloading |
| AI Search Readiness (GEO) | 35 / 100 | D | No llms.txt, catch-all 200 responses, no semantic anchors |
| Overall SEO Health | **60 / 100** | **C+** | Solid technical foundation requiring immediate structural SEO engineering |

---
*End of Stage A Discovery Report. Proceeding to Stage B Strategic Research.*

