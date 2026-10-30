export interface ComponentItem {
  id: string;
  name: string;
  displayName: string;
  kind?: 'component' | 'section';
  category: string;
  categoryLabel: string;
  description: string;
  galleryMedia?: string;
  galleryPoster?: string;
  galleryVideoStart?: number;
  galleryMediaWidth?: number;
  galleryMediaHeight?: number;
  featured: boolean;
  copyCount: number;
  views: number;
  createdAt: string;
  tags: string[];
  keyFeatures?: string[];
  dependencies?: string[];
  installSnippet: string;
  framerInstall: string;
}

export interface Category {
  id: string;
  label: string;
  count: number;
  icon: string;
  description: string;
}

export type Framework = 'react' | 'nextjs' | 'vite' | 'framer';
export type Styling = 'tailwind' | 'css' | 'cssmodules';
export type SortOption = 'default' | 'featured' | 'popular' | 'newest' | 'alphabetical';
export type ModeFilter = 'all' | 'components' | 'sections' | 'templates';

export type PlatformType =
  | 'all'
  | 'framer'
  | 'webflow'
  | 'shopify'
  | 'nextjs'
  | 'react'
  | 'astro'
  | 'nuxt';

export interface TemplatePagespeedScore {
  performance: number;
  accessibility: number;
  best_practices: number;
  seo: number;
}

export interface TemplatePagespeed {
  mobile?: TemplatePagespeedScore;
  desktop?: TemplatePagespeedScore;
  checked?: string;
}

export interface TemplateItem {
  id: string;
  name: string;
  path?: string;
  url: string;
  listing?: string;
  cover: string;
  source: 'framer' | 'webflow' | 'shopify' | 'nextjs' | 'react' | 'astro' | 'nuxt';
  price: string | null;
  pricing?: string;
  market?: string;
  category?: string | null;
  site_type?: string;
  description?: string;
  pages?: string[];
  sections?: string[];
  features?: string[];
  best_for?: string[];
  pagespeed?: TemplatePagespeed;
}

export interface PlatformStat {
  id: PlatformType;
  label: string;
  count: number;
  freeCount: number;
}
