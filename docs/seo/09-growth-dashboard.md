# Entelechae Visuals: Continuous Organic Growth & SEO Dashboard
**Document ID:** `docs/seo/09-growth-dashboard.md`  
**Execution Stage:** STAGE E — Growth & Continuous Optimization  
**Author:** Autonomous SEO Engineering Organization  

---

## 1. 30 / 60 / 90-Day Organic Growth Engineering Plan

### Days 1–30: Indexing Ignition & Foundation Activation
- **Task 1.1:** Submit `https://entele-visuals.vercel.app/sitemap.xml` to Google Search Console and Bing Webmaster Tools immediately after deployment.
- **Task 1.2:** Trigger manual URL Inspection in Google Search Console for root `/` and top category hubs (`/components/background-animation`, `/templates/framer`, `/templates/nextjs`).
- **Task 1.3:** Verify live Open Graph cards using Facebook Sharing Debugger, Twitter Card Validator, and LinkedIn Post Inspector.
- **Task 1.4:** Monitor GSC Coverage report daily to confirm zero 404, redirect, or sitemap DOCTYPE parsing errors.
- **Milestone:** All 20 sitemap URLs indexed by Google and Bing with rich snippet eligibility.

### Days 31–60: Programmatic Expansion & Developer Authority
- **Task 2.1:** Deploy dedicated individual component landing pages for the top 50 most searched components (e.g., 3D Card Hover, Particle Mesh Canvas, Kinetic Typography, Magnetic Button).
- **Task 2.2:** Publish comparison guides (`/comparisons/react-bits-alternative`, `/comparisons/magic-ui-alternative`) to capture competitor migration traffic.
- **Task 2.3:** Launch Entelechae Visuals on developer platforms (Product Hunt, Daily.dev, Hacker News Show HN, `r/reactjs`, `r/webdev`).
- **Task 2.4:** Implement automatic XML sitemap pinging upon new component release.
- **Milestone:** First 1,000 non-branded organic clicks and top 10 rankings for long-tail component queries.

### Days 61–90: AI Search (GEO) Dominance & Link Building
- **Task 3.1:** Monitor Perplexity, ChatGPT Search, and Google AI Overviews for brand entity citations when users ask for "best animated react components" or "free framer templates".
- **Task 3.2:** Reach out to curated frontend newsletters (Bytes.dev, React Status, Web Design Weekly, UI Movement) offering free featured motion components.
- **Task 3.3:** Release the Entele-Visuals MCP (Model Context Protocol) server allowing AI IDEs (Cursor, Windsurf, Claude Code) to directly fetch and inject components into developer projects.
- **Milestone:** Top 3 organic ranking for core category queries ("background animation react", "free framer templates", "animated hero sections react").

---

## 2. Organic Performance Measurement Dashboard

| Measurement Dimension | Key Performance Indicator (KPI) | Measurement Tool | Target Baseline (30-Day) | Target Scale (90-Day) |
|---|---|---|:---:|:---:|
| **Search Visibility** | Total Organic Impressions | Google Search Console | 10,000 / mo | 150,000+ / mo |
| **Search Visibility** | Total Organic Clicks | Google Search Console | 500 / mo | 7,500+ / mo |
| **Search Visibility** | Average Ranking Position | Google Search Console | < 25.0 | < 8.5 |
| **Search Visibility** | Number of Ranking Keywords | Ahrefs / Moz / GSC | 100+ keywords | 1,200+ keywords |
| **Indexation Integrity** | Valid Indexed Sitemap URLs | Google Search Console | 100% of sitemap | 100% of sitemap |
| **Indexation Integrity** | Crawl Errors (Soft-404 / 5xx) | Google Search Console | **0 errors** | **0 errors** |
| **Core Web Vitals** | Largest Contentful Paint (LCP) | PageSpeed Insights / CrUX | < 2.0s | < 1.5s |
| **Core Web Vitals** | Interaction to Next Paint (INP) | Chrome UX Report (CrUX) | < 150ms | < 80ms |
| **Core Web Vitals** | Cumulative Layout Shift (CLS) | PageSpeed Insights | < 0.05 | < 0.01 |
| **AI Answer Engines (GEO)** | AI Overviews / Perplexity Citations | Manual queries / Brand search | 5+ queries | 50+ queries |
| **Developer Engagement** | Component Code Copies | Custom GA4 Event (`copy_code`) | 1,000 copies | 15,000+ copies |
| **Developer Engagement** | External Template Visits | Custom GA4 Event (`visit_template`) | 500 visits | 8,000+ visits |

---

## 3. Google Search Console & GA4 Setup Protocols

When connecting external analytics accounts, use the following configuration:
1. **Google Search Console Verification:**
   - Add DNS TXT record or HTML meta tag in `<head>`:
     ```html
     <meta name="google-site-verification" content="[VERIFICATION_KEY]" />
     ```
2. **Google Analytics 4 (GA4):**
   - Inject minimal, asynchronous Google Tag (`gtag.js`):
     ```html
     <script async src="https://www.googletagmanager.com/gtag/js?id=G-[MEASUREMENT_ID]"></script>
     <script>
       window.dataLayer = window.dataLayer || [];
       function gtag(){dataLayer.push(arguments);}
       gtag('js', new Date());
       gtag('config', 'G-[MEASUREMENT_ID]', { send_page_view: true });
     </script>
     ```
3. **Custom Event Tracking Specification:**
   - `copy_component_code`: Triggered when developer clicks "Copy React" or "Copy CSS". Parameters: `{ component_id, component_name, category }`.
   - `preview_template`: Triggered when developer opens live template iframe preview. Parameters: `{ template_id, template_name, platform }`.
   - `filter_platform`: Triggered when switching platform pill. Parameters: `{ platform }`.

---
*End of Stage E Continuous Growth & Dashboard Report.*

