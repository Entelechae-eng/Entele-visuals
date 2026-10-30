import React, { useState, useEffect, useMemo } from 'react';
import { TemplateItem } from '../types';
import { sanitizeUrl } from '../utils/security';
import {
  X,
  ExternalLink,
  Monitor,
  Tablet,
  Smartphone,
  Gauge,
  ShoppingBag,
  Image as ImageIcon,
  Globe
} from 'lucide-react';

interface TemplatePreviewModalProps {
  template: TemplateItem | null;
  onClose: () => void;
}

type DeviceMode = 'desktop' | 'tablet' | 'mobile';
type ViewMode = 'frame' | 'screenshot';

export const TemplatePreviewModal: React.FC<TemplatePreviewModalProps> = ({
  template,
  onClose,
}) => {
  const [device, setDevice] = useState<DeviceMode>('desktop');
  const [viewMode, setViewMode] = useState<ViewMode>('frame');
  const [isIframeLoading, setIsIframeLoading] = useState<boolean>(true);

  // Close on Escape key
  useEffect(() => {
    if (!template) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [template, onClose]);

  const safeUrl = useMemo(() => sanitizeUrl(template?.url), [template?.url]);
  const safeListing = useMemo(() => sanitizeUrl(template?.listing), [template?.listing]);
  const safeCover = useMemo(() => sanitizeUrl(template?.cover), [template?.cover]);

  if (!template) return null;

  const deviceWidths: Record<DeviceMode, string> = {
    desktop: 'w-full',
    tablet: 'w-full max-w-[768px]',
    mobile: 'w-full max-w-[375px]',
  };

  const perf = template.pagespeed?.desktop || template.pagespeed?.mobile;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${template.name} preview`}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-between gap-2 overflow-hidden bg-black/95 p-2 sm:p-4 backdrop-blur-2xl transition-all duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Top Header Bar */}
      <div className="flex w-full max-w-[1280px] shrink-0 flex-wrap items-center justify-between gap-2">
        {/* Left: Template Name, Platform & Pricing */}
        <div className="flex min-w-0 items-center gap-2">
          <div className="relative flex items-center gap-2 rounded-lg bg-white/[0.04] px-3 py-1.5 border border-white/[0.08]">
            <h2 className="truncate text-sm sm:text-base font-semibold text-white">
              {template.name}
            </h2>
            <span className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-mono uppercase text-neutral-300">
              {template.source}
            </span>
            <span className="rounded bg-white/10 text-white border border-white/15 px-1.5 py-0.5 text-[10px] font-mono">
              {template.price ? `$${template.price}` : 'Free'}
            </span>
          </div>

          {perf && (
            <div className="hidden lg:flex items-center gap-1.5 rounded-lg bg-white/[0.04] px-2.5 py-1.5 border border-white/[0.08] text-xs font-mono text-neutral-400">
              <Gauge className="size-3.5 text-neutral-400" />
              <span>Perf: {perf.performance}</span>
              <span className="opacity-40">·</span>
              <span>SEO: {perf.seo}</span>
            </div>
          )}
        </div>

        {/* Center: Device Viewport & Mode Switchers */}
        <div className="flex items-center gap-2">
          {/* View Mode Toggle */}
          <div className="hidden sm:flex items-center rounded-lg bg-white/[0.04] border border-white/[0.08] p-1 gap-1">
            <button
              type="button"
              onClick={() => setViewMode('frame')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                viewMode === 'frame'
                  ? 'bg-white/15 text-white'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Globe className="size-3.5" />
              <span>Live Frame</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('screenshot')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                viewMode === 'screenshot'
                  ? 'bg-white/15 text-white'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <ImageIcon className="size-3.5" />
              <span>Screenshot</span>
            </button>
          </div>

          {/* Device Viewport Switcher */}
          <div className="hidden md:flex items-center rounded-lg bg-white/[0.04] border border-white/[0.08] p-1 gap-1">
            <button
              type="button"
              onClick={() => setDevice('desktop')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                device === 'desktop'
                  ? 'bg-white/15 text-white'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Monitor className="size-3.5" />
              <span>Desktop</span>
            </button>
            <button
              type="button"
              onClick={() => setDevice('tablet')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                device === 'tablet'
                  ? 'bg-white/15 text-white'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Tablet className="size-3.5" />
              <span>768px</span>
            </button>
            <button
              type="button"
              onClick={() => setDevice('mobile')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                device === 'mobile'
                  ? 'bg-white/15 text-white'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Smartphone className="size-3.5" />
              <span>375px</span>
            </button>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex shrink-0 items-center gap-2">
          {safeUrl && (
            <a
              href={safeUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="ui-press hidden sm:flex items-center gap-1.5 rounded-lg bg-white/[0.05] hover:bg-white/10 border border-white/[0.08] px-3 py-1.5 text-xs font-medium text-white transition-colors"
            >
              <span>Open Demo</span>
              <ExternalLink className="size-3.5" />
            </a>
          )}

          {safeListing && (
            <a
              href={safeListing}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="ui-press flex items-center gap-1.5 rounded-lg bg-white hover:bg-neutral-200 px-3.5 py-1.5 text-xs font-semibold text-black transition-colors shadow-sm"
            >
              <ShoppingBag className="size-3.5" />
              <span>Get</span>
            </a>
          )}

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="ui-press flex size-8 items-center justify-center rounded-lg bg-white/[0.05] border border-white/[0.08] text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="size-4" />
          </button>
        </div>
      </div>

      {/* Main Preview Stage Container */}
      <div className="relative flex flex-1 w-full max-w-[1280px] items-center justify-center overflow-hidden rounded-xl border border-white/[0.08] bg-black">
        <div
          className={`h-full transition-all duration-300 flex flex-col items-center justify-center ${deviceWidths[device]} ${
            device !== 'desktop'
              ? 'rounded-xl border border-white/[0.15] shadow-2xl overflow-hidden my-auto'
              : ''
          }`}
        >
          {viewMode === 'frame' && safeUrl ? (
            <div className="relative size-full">
              {isIframeLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#09090b] z-10">
                  <div className="flex flex-col items-center gap-2">
                    <div className="size-6 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                    <p className="text-xs font-mono text-neutral-400">Loading secure preview…</p>
                  </div>
                </div>
              )}
              {/* Hardened Sandbox Attributes to Prevent XSS / Escapes */}
              <iframe
                src={safeUrl}
                title={template.name}
                sandbox="allow-scripts allow-forms allow-popups allow-modals"
                referrerPolicy="no-referrer"
                loading="lazy"
                onLoad={() => setIsIframeLoading(false)}
                className="size-full bg-white border-0"
              />
            </div>
          ) : (
            <div className="relative size-full overflow-y-auto bg-black flex flex-col items-center p-4 no-scrollbar">
              {safeCover ? (
                <img
                  src={safeCover}
                  alt={template.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full max-w-4xl object-contain rounded-lg shadow-2xl border border-white/[0.06]"
                />
              ) : (
                <div className="flex items-center justify-center h-64 text-neutral-500 font-mono text-xs">
                  No preview available
                </div>
              )}
              <div className="mt-4 flex items-center gap-3 pb-6">
                {safeUrl && (
                  <a
                    href={safeUrl}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="ui-press flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-black text-xs font-semibold hover:bg-neutral-200 transition-colors"
                  >
                    <span>Open Live Site in New Window</span>
                    <ExternalLink className="size-3.5" />
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
