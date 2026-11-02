# Entele-Visuals

[![Live Production](https://img.shields.io/badge/Production-Live-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://entele-visuals.vercel.app/)
[![License](https://img.shields.io/badge/License-MIT-white?style=for-the-badge&logo=opensourceinitiative&logoColor=black)](LICENSE)
[![GitHub Repository](https://img.shields.io/badge/GitHub-Entelechae--eng%2FEntele--visuals-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Entelechae-eng/Entele-visuals)

> High-performance, production-grade motion design system and web template discovery engine. Housing all **897 interactive motion components** (805 components + 92 landing sections across 20 categories) and **28,047 web templates** (Framer, Webflow, Shopify, Next.js, React, Astro, Nuxt) with Cursor-style monochrome dark aesthetics, live responsive device emulation, hardened security sandboxing, and autonomous SEO & IndexNow infrastructure.

🌐 **Live Website:** [https://entele-visuals.vercel.app/](https://entele-visuals.vercel.app/)

---

## ⚡ Platform Architecture & Catalogs

### 1. Motion Components Catalog (897 Total Items)
Exact taxonomic and ordering parity matching OriginKit:
- **805 Interactive Components**: Image galleries, Navier-Stokes fluid trails, 3D gravitational attraction, WebGL shaders, ASCII art, retro canvas games, smoky text typography, variable kinetic buttons, and cursor effects.
- **92 Full Landing Sections**: High-impact animated heroes, interactive bento grids, pricing matrices, testimonial marquees, KPI tally stats, FAQ accordions, and animated footers.

### 2. Templens Template Discovery Suite (28,047 Total Templates)
Curated directory of full-site templates arranged in exact reference sequence:

| Platform | Total Templates | Free Templates | Direct Live Query |
|:---|:---|:---|:---|
| **All Platforms** | **28,047** | **8,190** | [`/?mode=templates`](https://entele-visuals.vercel.app/?mode=templates) |
| **Framer** | 13,189 | 7,886 | [`/?platform=framer`](https://entele-visuals.vercel.app/?platform=framer) |
| **Webflow** | 11,658 | 193 | [`/?platform=webflow`](https://entele-visuals.vercel.app/?platform=webflow) |
| **Shopify** | 1,486 | 23 | [`/?platform=shopify`](https://entele-visuals.vercel.app/?platform=shopify) |
| **Next.js** | 812 | 32 | [`/?platform=nextjs`](https://entele-visuals.vercel.app/?platform=nextjs) |
| **React** | 522 | 21 | [`/?platform=react`](https://entele-visuals.vercel.app/?platform=react) |
| **Astro** | 240 | 15 | [`/?platform=astro`](https://entele-visuals.vercel.app/?platform=astro) |
| **Nuxt** | 140 | 20 | [`/?platform=nuxt`](https://entele-visuals.vercel.app/?platform=nuxt) |

---

## 🔍 SEO & Search Engine Infrastructure

Entele-Visuals runs a state-of-the-art organic search and agentic discovery engine:

1. **RFC 9309 Crawler Directives (`/robots.txt`)**:
   - Explicit permissions for Googlebot, Bingbot, GPTBot, Claude-SearchBot, PerplexityBot, and Applebot.
   - Sitemap reference linked directly for continuous crawl discovery.
2. **Automated IndexNow Protocol (`/e7d4f82a1b9c3e5062a4d8f071b5e9ca.txt`)**:
   - Cryptographic host verification enabling immediate API-driven submissions across **Bing, Amazon, Naver, Seznam.cz, Yandex, and Yep**.
3. **XML Sitemap (`/sitemap.xml`)**:
   - 20 indexed category, template, and ecosystem routes with weekly change frequency and priority mapping.
4. **LLM Engine Discovery (`/llms.txt`)**:
   - Meets `llmstxt.org` and Lighthouse AI indexing specifications for citation in ChatGPT, Claude, Gemini, and Perplexity.
5. **Agentic Resource Discovery (`/.well-known/ai-catalog.json`)**:
   - ARD 1.0 specification with validated `urn:air:entelechae:visuals:catalog` identifiers.
6. **Multi-Entity Schema.org JSON-LD**:
   - Deep structured data graph declaring `WebSite`, `WebApplication`, and `Organization` entities.
7. **Semantic Crawler Pre-render Fallback**:
   - 274-word accessible `<header class="sr-only">` fallback inside `<div id="root">` ensuring bots index full taxonomy even without JavaScript execution.

---

## 🛡️ Security & Hardening

1. **Protocol & URL Sanitization (`src/utils/security.ts`)**:
   - Every external URL (iframe sources, marketplace listings, CDN media covers) is strictly sanitized via `sanitizeUrl()`, filtering out `javascript:`, `data:`, or `vbscript:` vectors.
2. **Iframe Isolation**:
   - Live template previews run under restricted sandbox flags: `sandbox="allow-scripts allow-forms allow-popups allow-modals"`.
   - Prevented cross-origin privilege escalation by decoupling `allow-same-origin` from iframe execution.
   - Enforced `referrerPolicy="no-referrer"` on all embedded previews.
3. **HTTP Security Headers (`vercel.json`)**:
   - `X-Content-Type-Options: nosniff`
   - `X-Frame-Options: SAMEORIGIN`
   - `Referrer-Policy: strict-origin-when-cross-origin`
   - `Permissions-Policy: camera=(), microphone=(), geolocation=()`
4. **Crash Resilience (`ErrorBoundary.tsx`)**:
   - React tree wrapped in an Error Boundary providing immediate one-click workspace recovery.

---

## 🚀 Performance & Production Bundling

- **Dynamic Lazy Chunking**: Heavy template data (`templatesData.json`) is dynamically imported on demand, dropping initial JavaScript payload from `4.8 MB` down to `208 kB` (gzipped).
- **Independent Vendor Chunking**: `vendor-react` and `vendor-icons` are separated for maximum browser HTTP/2 cache reuse.
- **Smooth Infinite Scrolling**: IntersectionObserver sentinel auto-loads the next batch of templates as users scroll near the bottom.
- **Debounced Search**: 250ms debouncing ensures butter-smooth 60fps input responsiveness during live searches.
- **Deep Linking & URL Sync**: Real-time URL query parameter synchronization (`?mode=`, `?category=`, `?platform=`, `?q=`, `?component=`) with automatic document `<title>` updates.

---

## 🛠️ Development & Deployment

### Local Development
```bash
npm install
npm run dev
```
Runs at `http://localhost:3000` with local reverse proxy forwarding `/api/templens` to prevent browser CORS blocks.

### Production Build
```bash
npm run build
```
Typechecked with `tsc` and compiled via modern `vite build` into `dist/`.

### Deployment
- **Vercel**: Configured with automatic SPA routing, explicit MIME types, and cache-control headers in `vercel.json`.
- **Repository**: Hosted at `https://github.com/Entelechae-eng/Entele-visuals.git`.
