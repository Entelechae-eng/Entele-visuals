# Entele-Visuals

> High-performance, production-grade motion design system and web template discovery engine. Housing all **897 interactive motion components** (805 components + 92 landing sections across 20 categories) and **28,047 web templates** (Framer, Webflow, Shopify, Next.js, React, Astro, Nuxt) with Cursor-style monochrome dark aesthetics, live responsive device emulation, hardened security sandboxing, and sub-second dynamic loading.

---

## ⚡ Platform Architecture & Catalogs

### 1. Motion Components Catalog (897 Total Items)
Exact taxonomic and ordering parity matching OriginKit:
- **805 Interactive Components**: Image galleries, Navier-Stokes fluid trails, 3D gravitational attraction, WebGL shaders, ASCII art, retro canvas games, smoky text typography, variable kinetic buttons, and cursor effects.
- **92 Full Landing Sections**: High-impact animated heroes, interactive bento grids, pricing matrices, testimonial marquees, KPI tally stats, FAQ accordions, and animated footers.

### 2. Templens Template Discovery Suite (28,047 Total Templates)
Curated directory of full-site templates arranged in exact reference sequence:
| Platform | Total Templates | Free Templates |
|:---|:---|:---|
| **All Platforms** | **28,047** | **8,190** |
| **Framer** | 13,189 | 7,886 |
| **Webflow** | 11,658 | 193 |
| **Shopify** | 1,486 | 23 |
| **Next.js** | 812 | 32 |
| **React** | 522 | 21 |
| **Astro** | 240 | 15 |
| **Nuxt** | 140 | 20 |

---

## 🛡️ Security & Hardening

1. **Protocol & URL Sanitization (`src/utils/security.ts`)**:
   - Every external URL (iframe sources, marketplace listings, CDN media covers) is strictly sanitized via `sanitizeUrl()`, filtering out `javascript:`, `data:`, or `vbscript:` vectors.
2. **Iframe Isolation**:
   - Live template previews run under restricted sandbox flags: `sandbox="allow-scripts allow-forms allow-popups allow-modals"`.
   - Prevented cross-origin privilege escalation by decoupling `allow-same-origin` from iframe execution.
   - Enforced `referrerPolicy="no-referrer"` on all embedded previews.
3. **HTTP Security Headers (`vercel.json` & `netlify.toml`)**:
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

---

## 💻 Development & Deployment

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
- **Vercel**: Deploy with zero configuration; rewrites and headers are configured in `vercel.json`.
- **Netlify**: Deploy with `netlify.toml` for automatic SPA routing and proxying.
