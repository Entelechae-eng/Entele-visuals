import React, { useMemo } from 'react';
import { TemplateItem } from '../types';
import { sanitizeUrl } from '../utils/security';
import { Eye, ExternalLink, Gauge } from 'lucide-react';

interface TemplateCardProps {
  template: TemplateItem;
  onPreview: (template: TemplateItem) => void;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({ template, onPreview }) => {
  const isFree =
    !template.price ||
    template.price === '0' ||
    (template.pricing && template.pricing.toLowerCase().includes('free'));

  const safeCover = useMemo(() => sanitizeUrl(template.cover), [template.cover]);
  const safeListing = useMemo(() => sanitizeUrl(template.listing), [template.listing]);

  const perfScore =
    template.pagespeed?.desktop?.performance || template.pagespeed?.mobile?.performance;

  return (
    <div className="group/card relative block w-full shrink-0 break-inside-avoid isolate mb-3.5 transition-all duration-200">
      <div className="overflow-hidden rounded-xl border border-white/[0.08] bg-[#111113] transition-all duration-200 ease-out hover:border-white/[0.2] hover:bg-[#141417] hover:shadow-cursor-card">
        {/* Cover Preview Container */}
        <div
          onClick={() => onPreview(template)}
          className="relative isolate aspect-[709/418] w-full cursor-pointer overflow-hidden rounded-t-[11px] border-b border-white/[0.06] bg-black"
        >
          {safeCover ? (
            <img
              src={safeCover}
              alt={template.name}
              loading="lazy"
              decoding="async"
              className="size-full object-cover transition-transform duration-500 ease-out group-hover/card:scale-[1.02]"
            />
          ) : (
            <div className="size-full flex items-center justify-center bg-black text-neutral-500 text-xs font-mono">
              {template.name}
            </div>
          )}

          {/* Top-Left: Minimal Platform Tag */}
          <div className="absolute left-2.5 top-2.5 z-10 flex items-center">
            <span className="rounded-md border border-white/10 bg-black/80 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-neutral-300 backdrop-blur-md">
              {template.source}
            </span>
          </div>

          {/* Top-Right: Minimal Price Pill */}
          <div className="absolute right-2.5 top-2.5 z-10">
            <span className="rounded-md border border-white/10 bg-black/80 px-2 py-0.5 text-[11px] font-mono font-medium text-white backdrop-blur-md">
              {isFree ? 'Free' : `$${template.price || template.pricing}`}
            </span>
          </div>

          {/* Floating Hover Actions */}
          <div className="absolute inset-0 z-20 flex items-center justify-center gap-2 bg-black/60 backdrop-blur-[2px] opacity-0 transition-opacity duration-150 group-hover/card:opacity-100">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onPreview(template);
              }}
              className="ui-press flex items-center gap-1.5 rounded-lg bg-white px-3.5 py-1.5 text-xs font-semibold text-black hover:bg-neutral-200 transition-colors"
            >
              <Eye className="size-3.5" />
              <span>Preview</span>
            </button>

            {safeListing && (
              <a
                href={safeListing}
                target="_blank"
                rel="noopener noreferrer nofollow"
                onClick={(e) => e.stopPropagation()}
                className="ui-press flex items-center justify-center rounded-lg border border-white/15 bg-white/10 p-1.5 text-white hover:bg-white/20 transition-colors"
                title="Open Marketplace Page"
              >
                <ExternalLink className="size-4" />
              </a>
            )}
          </div>
        </div>

        {/* Footer Metadata */}
        <div className="flex flex-col gap-2 p-2.5 sm:p-3">
          <div className="flex items-center justify-between gap-2">
            <h3
              onClick={() => onPreview(template)}
              className="cursor-pointer truncate text-sm font-medium tracking-tight text-neutral-200 hover:text-white transition-colors"
            >
              {template.name}
            </h3>

            {perfScore ? (
              <span
                className="flex items-center gap-1 text-[11px] font-mono text-neutral-400 shrink-0"
                title={`PageSpeed Performance: ${perfScore}/100`}
              >
                <Gauge className="size-3 text-neutral-400" />
                <span>{perfScore}</span>
              </span>
            ) : null}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-1">
            {(template.best_for && template.best_for.length > 0
              ? template.best_for
              : [template.site_type || 'template']
            )
              .slice(0, 3)
              .map((tag) => (
                <span
                  key={tag}
                  className="rounded bg-white/[0.04] border border-white/[0.05] px-1.5 py-0.5 text-[10px] font-mono text-neutral-400 truncate max-w-[130px]"
                >
                  #{tag}
                </span>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
