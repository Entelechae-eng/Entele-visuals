# Claude SEO Action Plan: entele-visuals.vercel.app

**Priority Roadmap (Sorted by Impact & Dependencies)**

---

### Phase 1: Critical Technical & Crawler Fixes (Week 1)
- [ ] **Create `public/robots.txt`**: Serve plain text robots file with explicit crawler permissions for Googlebot, GPTBot, ClaudeBot, and PerplexityBot, plus sitemap reference.
- [ ] **Create `public/sitemap.xml`**: Publish valid XML sitemap eliminating the DOCTYPE HTML catch-all error.
- [ ] **Add Canonical Tag**: Add `<link rel="canonical" href="https://entele-visuals.vercel.app/" />` to `<head>` in `index.html`.
- [ ] **Add Structured Data (JSON-LD)**: Inject `WebSite` and `WebApplication` schema blocks into `index.html`.
- [ ] **Add `public/llms.txt`**: Publish markdown documentation for AI search engines and Lighthouse Agentic compliance.

### Phase 2: Social Media & Semantic Linking (Weeks 2-3)
- [ ] **Add Open Graph & Twitter Cards**: Add `og:image`, `og:title`, `og:description`, and `twitter:card` tags to `index.html`.
- [ ] **Generate OG Image**: Create a branded 1200x630 preview image (`public/og-image.png`).
- [ ] **Semantic Anchor Links**: Refactor top navigation and framework filters to include valid `href` attributes so spiders can crawl categories.

### Phase 3: Content Architecture & Indexation Scale (Month 2)
- [ ] **Static Pre-rendered Fallback**: Add pre-rendered semantic headings and popular component descriptions inside `<div id="root">` for non-JS bots before React hydrates.
- [ ] **Dedicated Framework Category Landing Pages**: Setup routing for `/templates/framer`, `/templates/nextjs`, `/templates/shopify` with framework-specific metadata.

---

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Built by agricidaniel. Join the AI Marketing Hub community
🆓 Free  → https://www.skool.com/ai-marketing-hub
⚡ Pro   → https://www.skool.com/ai-marketing-hub-pro
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

