# Entelechae Visuals: Comprehensive SEO Implementation Roadmap
**Document ID:** `docs/seo/07-implementation-roadmap.md`  
**Execution Stage:** STAGE B — Implementation Roadmap  
**Author:** Autonomous SEO Engineering Organization  

---

## 1. Phased Engineering Matrix

```
┌────────────────────────────────────────────────────────────────────────┐
│ PHASE 1: Critical Technical Foundations & Crawler Gateways (Immediate) │
│ - Deploy public/robots.txt with AI agent rules                         │
│ - Deploy public/sitemap.xml with indexable URLs & categories           │
│ - Deploy public/llms.txt (Lighthouse Agentic / LLM spec)               │
│ - Inject Canonical URL, Open Graph & Twitter Cards into index.html     │
│ - Inject Multi-Entity Schema.org JSON-LD Graph into index.html         │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│ PHASE 2: Rendering & Client Navigation SEO (Weeks 2–3)                 │
│ - Inject Semantic Fallback HTML inside <div id="root"> for non-JS bots │
│ - Implement URL Sync Helper for ?mode=, ?category=, ?platform=         │
│ - Convert Sidebar & Category Buttons into crawlable <a href="...">     │
│ - Add Dynamic Page Title & Meta Tag updater upon modal preview open    │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│ PHASE 3: Programmatic Category Landing Pages & Content (Month 2)       │
│ - Programmatic XML Sitemap expansion for all 20 component categories   │
│ - Detailed Category Landing Introductions with FAQ Schema              │
│ - Social Sharing Image Asset (og-image.png)                            │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Action Items with Strict Engineering Criteria

### ACTION-01: Deploy `public/robots.txt`
- **Finding:** Currently returns `index.html` (HTTP 200 text/html).
- **Evidence:** `fetch_page.py https://entele-visuals.vercel.app/robots.txt` returned an HTML document.
- **SEO Impact:** Critical. Crawlers do not receive legitimate crawl parameters.
- **Action:** Create `public/robots.txt` containing explicit directives for Googlebot, Bingbot, GPTBot, ClaudeBot, and PerplexityBot, pointing directly to `https://entele-visuals.vercel.app/sitemap.xml`.
- **Priority:** P0 (Critical) | **Effort:** 10 minutes | **Dependencies:** None
- **Validation:** Test with curl/fetch: `GET /robots.txt` must return `Content-Type: text/plain` with valid RFC 9309 rules.

### ACTION-02: Deploy `public/sitemap.xml`
- **Finding:** `/sitemap.xml` returns HTML with DOCTYPE, breaking sitemap parsers.
- **Evidence:** `sitemap_discovery.py` threw `"DOCTYPE is not allowed in sitemap XML"`.
- **SEO Impact:** Critical. Search engines cannot discover internal pages.
- **Action:** Create `public/sitemap.xml` declaring the root domain and all primary category and platform landing routes.
- **Priority:** P0 (Critical) | **Effort:** 15 minutes | **Dependencies:** ACTION-01
- **Validation:** Run `sitemap_discovery.py`: must pass with valid XML validation.

### ACTION-03: Deploy `public/llms.txt`
- **Finding:** Requesting `/llms.txt` returns soft-404 HTML.
- **Evidence:** `agentic_check.py` failed the `llms-txt` Lighthouse check.
- **SEO Impact:** High. Blocks AI answer engine ingestion and agentic discovery.
- **Action:** Create `public/llms.txt` adhering to `llmstxt.org` standards (H1 header, blockquote summary, categorized Markdown links).
- **Priority:** P1 (High) | **Effort:** 15 minutes | **Dependencies:** None
- **Validation:** Run `agentic_check.py`: `llms-txt` check must pass.

### ACTION-04: Canonical URL, Social Metadata & Headings in `index.html`
- **Finding:** Missing canonical tag, 0 Open Graph tags, 0 Twitter Card tags.
- **Evidence:** `parse_html.py` reported `canonical: null`, `open_graph: {}`, `twitter_card: {}`.
- **SEO Impact:** Critical. Prevents duplicate content indexing and enables rich social previews on Slack, X, Discord, and LinkedIn.
- **Action:** Add `<link rel="canonical">`, `<meta property="og:*">`, and `<meta name="twitter:*">` tags into `<head>` in `index.html`.
- **Priority:** P0 (Critical) | **Effort:** 15 minutes | **Dependencies:** None
- **Validation:** Run `parse_html.py`: must verify canonical and social tags.

### ACTION-05: Multi-Entity Structured Data (Schema.org JSON-LD)
- **Finding:** Zero structured data blocks in DOM.
- **Evidence:** `parse_html.py` reported `"schema": []`.
- **SEO Impact:** Critical. Deprives the platform of rich results, breadcrumbs, and Knowledge Graph inclusion.
- **Action:** Inject structured JSON-LD into `<head>` in `index.html` declaring `@type: WebSite`, `@type: WebApplication`, and `@type: Organization`.
- **Priority:** P0 (Critical) | **Effort:** 20 minutes | **Dependencies:** None
- **Validation:** Schema validator check: verify zero syntax errors.

### ACTION-06: Pre-Rendered Semantic Crawler Fallback in `index.html`
- **Finding:** Raw HTML has only `<div id="root"></div>` (8 words).
- **Evidence:** `agentic_check.py` reported `words_without_js: 8` and `server-rendered: fail`.
- **SEO Impact:** High. Non-JS bots and fast preview fetchers receive an empty page.
- **Action:** Inject a semantic fallback inside `<div id="root">` containing an H1, H2 category headings, descriptive text, and noscript guidance that React replaces seamlessly upon hydration.
- **Priority:** P1 (High) | **Effort:** 30 minutes | **Dependencies:** None
- **Validation:** `agentic_check.py`: raw HTML must contain primary content before JavaScript execution.

### ACTION-07: Dynamic Browser URL Sync & Deep-Link Metadata Updater
- **Finding:** All category, mode, and platform switches rely on local React state; URLs never update.
- **Evidence:** `src/App.tsx` inspection confirmed zero URL sync or HTML5 History API integration.
- **SEO Impact:** High. Users cannot bookmark or share specific categories or components via URL.
- **Action:** Implement lightweight, zero-dependency URL search param synchronization (`window.history.replaceState`) and dynamic document title updating in `src/App.tsx`.
- **Priority:** P1 (High) | **Effort:** 45 minutes | **Dependencies:** None
- **Validation:** Verify URL updates to `?category=background-animation` or `?platform=framer` and reloading preserves the active view.

---
*End of Stage B Implementation Roadmap. Ready for Stage C Execution.*

