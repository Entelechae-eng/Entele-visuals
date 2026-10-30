import { TemplateItem, PlatformType } from '../types';
import { sanitizeUrl, sanitizeSearchQuery } from './security';

let cachedLocalTemplates: TemplateItem[] | null = null;

async function getLocalTemplates(): Promise<TemplateItem[]> {
  if (!cachedLocalTemplates) {
    const data = await import('../data/templatesData.json');
    cachedLocalTemplates = (data.default || data) as TemplateItem[];
  }
  return cachedLocalTemplates;
}

interface SearchTemplatesParams {
  query?: string;
  platform?: PlatformType;
  onlyFree?: boolean;
  offset?: number;
  limit?: number;
}

interface SearchTemplatesResponse {
  items: TemplateItem[];
  total: number;
  hasMore: boolean;
}

export async function fetchTemplates({
  query = '',
  platform = 'all',
  onlyFree = false,
  offset = 0,
  limit = 24,
}: SearchTemplatesParams): Promise<SearchTemplatesResponse> {
  const cleanQ = sanitizeSearchQuery(query);
  const sourceParam = platform === 'all' ? '' : platform;

  // 1. Try proxied /api/templens/search (works in Vite dev/preview and Vercel/Netlify rewrites)
  try {
    let res: Response;
    if (cleanQ) {
      res = await fetch('/api/templens/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          q: cleanQ,
          source: sourceParam,
          onlyFree: onlyFree,
          offset: offset,
        }),
      });
    } else {
      const url = new URL('/api/templens/search', window.location.origin);
      url.searchParams.set('offset', String(offset));
      if (sourceParam) url.searchParams.set('source', sourceParam);
      if (onlyFree) url.searchParams.set('only', 'free');

      res = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });
    }

    if (res.ok) {
      const data = await res.json();
      const rawList = data.results || data.featured || [];
      if (Array.isArray(rawList) && rawList.length > 0) {
        const liveItems: TemplateItem[] = rawList.map((x: any) => ({
          id: String(x.id || ''),
          name: String(x.name || 'Untitled Template'),
          path: String(x.path || ''),
          url: sanitizeUrl(x.url),
          listing: sanitizeUrl(x.listing),
          cover: sanitizeUrl(x.cover),
          source: (x.source || 'framer') as any,
          price: x.price,
          pricing: x.pricing || (x.price ? `$${x.price}` : 'Free'),
          market: String(x.market || ''),
          category: x.category || null,
          site_type: x.site_type || '',
          description: x.description || '',
          pages: Array.isArray(x.pages) ? x.pages : [],
          sections: Array.isArray(x.sections) ? x.sections : [],
          features: Array.isArray(x.features) ? x.features : [],
          best_for: Array.isArray(x.best_for) ? x.best_for : [],
          pagespeed: x.pagespeed,
        }));

        const totalItems = data.total || 28047;
        return {
          items: liveItems,
          total: totalItems,
          hasMore: offset + liveItems.length < totalItems,
        };
      }
    }
  } catch {
    // Proxy not available or offline: fall through to local cached dataset
  }

  // 2. High-performance offline fallback with 1,774 curated templates in exact Templens order
  const localList = await getLocalTemplates();
  let localFiltered = localList;

  if (platform !== 'all') {
    localFiltered = localFiltered.filter((t) => t.source === platform);
  }

  if (onlyFree) {
    localFiltered = localFiltered.filter(
      (t) => !t.price || t.price === '0' || (t.pricing && t.pricing.toLowerCase().includes('free'))
    );
  }

  if (cleanQ) {
    const qLower = cleanQ.toLowerCase();
    localFiltered = localFiltered.filter(
      (t) =>
        t.name.toLowerCase().includes(qLower) ||
        (t.description && t.description.toLowerCase().includes(qLower)) ||
        (t.best_for && t.best_for.some((b) => b.toLowerCase().includes(qLower))) ||
        (t.site_type && t.site_type.toLowerCase().includes(qLower)) ||
        t.source.toLowerCase().includes(qLower)
    );
  }

  const paginated = localFiltered.slice(offset, offset + limit);

  return {
    items: paginated.map((t) => ({
      ...t,
      url: sanitizeUrl(t.url),
      listing: sanitizeUrl(t.listing),
      cover: sanitizeUrl(t.cover),
    })),
    total: cleanQ ? localFiltered.length : 28047,
    hasMore: offset + paginated.length < (cleanQ ? localFiltered.length : 28047),
  };
}
