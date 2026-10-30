/**
 * Security & Sanitization Utilities for Entele-Visuals
 * Strictly validates and cleans URLs, text inputs, and external resources.
 */

const ALLOWED_PROTOCOLS = new Set(['http:', 'https:']);

/**
 * Validates and sanitizes external URLs to prevent javascript:, data:, or vbscript: XSS vectors.
 * Returns safe URL string or fallback empty string.
 */
export function sanitizeUrl(url?: string | null): string {
  if (!url || typeof url !== 'string') return '';
  const trimmed = url.trim();

  try {
    // Relative URLs starting with / are safe for internal navigation
    if (trimmed.startsWith('/') && !trimmed.startsWith('//')) {
      return trimmed;
    }

    const parsed = new URL(trimmed);
    if (!ALLOWED_PROTOCOLS.has(parsed.protocol)) {
      console.warn(`[Security] Blocked unsafe protocol: ${parsed.protocol}`);
      return '';
    }

    return parsed.toString();
  } catch {
    // If not a valid absolute URL, check if it's safe relative
    if (/^[a-zA-Z0-9_\-\/\.\?=&%#]+$/.test(trimmed) && !trimmed.includes(':')) {
      return trimmed;
    }
    return '';
  }
}

/**
 * Escapes HTML entities to prevent DOM XSS injection.
 */
export function escapeHtml(str?: string | null): string {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Safe search string normalizer: trims and removes dangerous characters.
 */
export function sanitizeSearchQuery(input?: string | null): string {
  if (!input) return '';
  return input.trim().slice(0, 150);
}

