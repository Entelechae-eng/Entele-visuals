# Entelechae Visuals: Technical SEO Deep-Dive Audit
**Document ID:** `docs/seo/01-technical-audit.md`  
**Execution Stage:** STAGE A — Technical Audit  
**Author:** Autonomous SEO Engineering Organization (via `claude-seo` v2.5.0)  
**Target:** `https://entele-visuals.vercel.app/`  

---

## 1. Technical Health & Architecture Assessment

### 1.1 Crawlability & Indexability
| Check | Status | Evidence | Impact |
|---|:---:|---|---|
| **HTTP Status Code** | PASS | HTTP 200 OK via Vercel Edge Cache | Fast initial response from CDN node. |
| **Robots.txt Directives** | FAIL | Requesting `/robots.txt` returns `text/html` (HTTP 200 index.html) | Bots receive no valid crawling rules; fall back to default behavior. |
| **Sitemap Discovery** | FAIL | `/sitemap.xml` returns `text/html` with DOCTYPE | XML parsers throw fatal errors; zero URLs discovered. |
| **Canonical URL** | FAIL | `<link rel="canonical">` missing from `<head>` | Risk of split authority between root domain and preview URLs. |
| **Meta Robots** | WARN | No `<meta name="robots">` defined | Defaults to `index, follow`, but lacks explicit crawler parameters. |
| **Soft 404 Behavior** | WARN | Unknown paths return HTTP 200 with HTML shell | Crawlers treat nonexistent routes as duplicate thin content. |

### 1.2 Rendering Strategy Analysis
- **Current State:** Single Page Application (SPA) driven by React 18, bundled by Vite into client JavaScript chunks:
  - `dist/assets/index-xditYe8W.js`
  - `dist/assets/vendor-icons-BRLo_NIX.js`
  - `dist/assets/vendor-react-CDp4ADPd.js`
- **Hydration Bottleneck:** The root HTML served to clients has only `<div id="root"></div>`.
- **Search Engine Impact:**
  - Googlebot has a headless web rendering service (WRS) that can execute JavaScript, but it operates on a deferred rendering queue, creating an indexation lag of several days.
  - Secondary engines (Bing, DuckDuckGo, Baidu) and social platforms (Twitter, LinkedIn, Discord, Slack, iMessage) do not execute heavy JS when generating link unfurls.
  - AI Answer Engines (Perplexity, ChatGPT, Claude) frequently use lightweight raw HTML fetchers that extract only the initial text payload (verified: `words_without_js: 8`).
- **Required Solution:** Inject pre-rendered semantic HTML fallback markup directly into `index.html` inside `<div id="root">` (with noscript and initial semantic structure) so that crawlers immediately consume platform descriptions, top categories, and asset highlights without waiting for React execution.

### 1.3 Security Headers & Transport
The live Vercel environment demonstrates best-in-class transport security:
```http
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```
- **Evaluation:** 100% compliant with enterprise HTTPS and HTTP security standards.

### 1.4 Structured Data (Schema.org) Evaluation
`render_page.py` verified **0 JSON-LD blocks** in the live application.
To qualify for Google Search Knowledge Panels, Rich Snippets, and AI Engine Entity Extraction, the platform requires:
1. `WebSite` Schema: Identifies Entelechae Visuals, alternative names, and search potential action.
2. `WebApplication` / `SoftwareApplication` Schema: Identifies the catalog as a free developer tool for Framer Motion, React, and web frameworks.
3. `Organization` Schema: Connects the platform to the parent company (Entelechae).
4. `BreadcrumbList` Schema: Contextual category hierarchy.

### 1.5 Agentic & AI Crawler Infrastructure
`agentic_check.py` evaluated the platform against RFC 9309 and modern AI search crawler standards:
- **`GPTBot` (OpenAI):** Unrestricted by default, but lacks dedicated sitemap path.
- **`ClaudeBot` / `Claude-User` (Anthropic):** Allowed, but cannot access structured Markdown.
- **`PerplexityBot` (Perplexity):** Needs clear entity descriptions for citation generation.
- **`llms.txt`:** Absent (returns soft 404 HTML). Lighthouse 13.5 agentic check failed.
- **`ai-catalog.json` (ARD 1.0):** Absent (returns soft 404 HTML).

---

## 2. Technical Deficiency Remediation Matrix

| Defect ID | Category | Severity | Technical Remedy | Effort |
|---|---|:---:|---|:---:|
| **TECH-01** | Indexing | **Critical** | Create static `public/robots.txt` with clear user-agent rules and sitemap URL | 15 min |
| **TECH-02** | Indexing | **Critical** | Create static `public/sitemap.xml` with indexable routes and lastmod timestamps | 20 min |
| **TECH-03** | Indexing | **Critical** | Add `<link rel="canonical" href="https://entele-visuals.vercel.app/" />` to `index.html` | 5 min |
| **TECH-04** | Schema | **High** | Inject multi-entity JSON-LD graph (`WebSite`, `WebApplication`, `Organization`) | 30 min |
| **TECH-05** | Social | **High** | Add Open Graph (`og:*`) and Twitter Card (`summary_large_image`) tags | 15 min |
| **TECH-06** | GEO/AI | **High** | Deploy standard `public/llms.txt` following `llmstxt.org` specification | 20 min |
| **TECH-07** | Rendering | **Medium** | Pre-render semantic fallback HTML and noscript block in `index.html` | 45 min |
| **TECH-08** | Navigation | **Medium** | Ensure category navigation elements contain crawlable `<a href="...">` links | 60 min |

---
*End of Stage A Technical Audit Report.*

