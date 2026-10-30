import { PlatformStat } from '../types';

export const TOTAL_TEMPLATES_COUNT = 28047;
export const TOTAL_FREE_TEMPLATES_COUNT = 8190;

export const PLATFORM_STATS: PlatformStat[] = [
  { id: 'all', label: 'All Platforms', count: 28047, freeCount: 8190 },
  { id: 'framer', label: 'Framer', count: 13189, freeCount: 7886 },
  { id: 'webflow', label: 'Webflow', count: 11658, freeCount: 193 },
  { id: 'shopify', label: 'Shopify', count: 1486, freeCount: 23 },
  { id: 'nextjs', label: 'Next.js', count: 812, freeCount: 32 },
  { id: 'react', label: 'React', count: 522, freeCount: 21 },
  { id: 'astro', label: 'Astro', count: 240, freeCount: 15 },
  { id: 'nuxt', label: 'Nuxt', count: 140, freeCount: 20 },
];

export const TEMPLATE_CATEGORIES = [
  { id: 'all', label: 'All Templates' },
  { id: 'portfolio', label: 'Portfolio & Personal' },
  { id: 'saas', label: 'SaaS & AI Startups' },
  { id: 'ecommerce', label: 'E-Commerce & Store' },
  { id: 'agency', label: 'Agency & Studio' },
  { id: 'blog', label: 'Blog & Editorial' },
  { id: 'landing', label: 'Landing & Waitlist' },
  { id: 'app', label: 'Mobile App Showcase' },
];

export const TEMPLENS_EXAMPLE_PROMPTS = [
  "Find me a minimal portfolio for a designer…",
  "Something modern for my AI startup…",
  "Need a clean Framer template under $50…",
  "Looking for a colorful personal portfolio…",
  "Minimal black-and-white website…",
  "High-converting SaaS landing page with dark mode…",
  "E-commerce Shopify theme for luxury watch brand…",
  "Next.js doc and blog template with Tailwind…",
];
