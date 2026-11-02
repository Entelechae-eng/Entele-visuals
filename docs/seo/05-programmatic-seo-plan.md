# Entelechae Visuals: Programmatic SEO Architecture & Scaling Plan
**Document ID:** `docs/seo/05-programmatic-seo-plan.md`  
**Execution Stage:** STAGE B — Programmatic SEO  
**Author:** Autonomous SEO Engineering Organization  

---

## 1. Programmatic Scaling Strategy

The objective of Programmatic SEO at Entelechae Visuals is to systematically index high-value, verified assets without creating low-quality or duplicative thin pages.

The catalog contains:
- **897 verified motion components** in `src/data/components.json` with code implementations, categories, tags, and properties.
- **28,047 web templates** accessible across Framer, Webflow, Shopify, Next.js, React, Astro, and Nuxt.

---

## 2. Multi-Tier Programmatic Taxonomy

### Tier 1: Platform & Category Hubs (Highest Authority — Direct Indexing)
- `/components` (Master Component Hub)
- `/components/:category` (20 Dedicated Component Category Hubs, e.g. `/components/background-animation`, `/components/hero`, `/components/interactive-elements`)
- `/templates` (Master Template Hub)
- `/templates/:platform` (7 Dedicated Platform Hubs: `/templates/framer`, `/templates/webflow`, `/templates/shopify`, `/templates/nextjs`, `/templates/react`, `/templates/astro`, `/templates/nuxt`)

### Tier 2: Curated Topic & Use-Case Collections (High Intent)
- `/templates?category=saas` (SaaS Landing Page Templates)
- `/templates?category=portfolio` (Designer & Developer Portfolios)
- `/templates?category=agency` (Creative & Digital Agency Websites)
- `/templates?category=ecommerce` (Store & Product Showcase Templates)

### Tier 3: Individual Resource Landing Modals & Deep Links
- Previews and detail views with shareable deep links (e.g. `?component=:id` and `?template=:id`).
- When a user or bot accesses a resource URL with query ID, the page dynamically updates document `<title>`, `<meta name="description">`, canonical URL, and Open Graph tags.

---

## 3. Dynamic Metadata Formula Matrix

### For Category Hubs:
- **Formula:** `{Category Name} ({Count} Components) — Entele-Visuals`
- **Example:** `295 Animated Backgrounds & Canvas Effects — Entele-Visuals`
- **Description Formula:** `Browse {Count} interactive {Category Name} UI components for React, Tailwind CSS, and Framer Motion with live previews and copy-ready code.`

### For Platform Template Hubs:
- **Formula:** `Best {Platform} Website Templates ({Count}+) — Entele-Visuals`
- **Example:** `Best Framer Website Templates (10,000+ Demos) — Entele-Visuals`
- **Description Formula:** `Explore verified {Platform} website templates for agencies, SaaS, portfolios, and e-commerce with live interactive demos and responsive previews.`

### For Individual Motion Components:
- **Formula:** `{Component Name} — Animated React Component — Entele-Visuals`
- **Example:** `Grid Pattern Shader — Animated React Component — Entele-Visuals`
- **Description Formula:** `{Component Name} interactive UI component for React and Tailwind CSS. Live preview, customizable parameters, and instant copy-paste code.`

---

## 4. Anti-Thin-Content & Crawl Budget Safeguards

1. **Parameter Stripping in Canonicals:**
   - Any URL containing sorting (`?sort=popular`, `?sort=newest`) or pagination (`?offset=24`) MUST declare its canonical URL as the clean root category URL.
2. **Dynamic Search Query Indexing Policy:**
   - Raw internal search query URLs (e.g. `/?q=xyz`) are excluded from sitemaps and injected with `<meta name="robots" content="noindex, follow" />` to prevent crawler trap loops and duplicate thin SERPs.
3. **Quality Gate Thresholds:**
   - Any category containing fewer than 3 verified assets is consolidated into a parent cluster (e.g., `stats`, `cta`, `faq` are categorized under `/components/sections`).

---

## 5. Automated Structured Data Schema Rules

Every programmatically generated landing page injects a contextual JSON-LD block:
```json
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Animated Backgrounds & Canvas Effects",
  "description": "295 interactive canvas, WebGL, particle, and gradient background animations for modern web applications.",
  "url": "https://entele-visuals.vercel.app/components/background-animation",
  "numberOfItems": 295,
  "itemListOrder": "https://schema.org/ItemListOrderDescending",
  "isPartOf": {
    "@type": "WebSite",
    "name": "Entele-Visuals",
    "url": "https://entele-visuals.vercel.app/"
  }
}
```

---
*End of Stage B Programmatic SEO Plan.*

