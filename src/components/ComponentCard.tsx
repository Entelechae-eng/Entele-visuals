import React, { useRef, useState, useMemo } from 'react';
import { ComponentItem } from '../types';
import { sanitizeUrl } from '../utils/security';
import { Eye, Code2 } from 'lucide-react';

interface ComponentCardProps {
  component: ComponentItem;
  onPreview: (component: ComponentItem) => void;
  onOpenCode: (component: ComponentItem) => void;
}

export const ComponentCard: React.FC<ComponentCardProps> = ({
  component,
  onPreview,
  onOpenCode,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasVideoError, setHasVideoError] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const safePoster = useMemo(() => sanitizeUrl(component.galleryPoster), [component.galleryPoster]);
  const safeMedia = useMemo(() => sanitizeUrl(component.galleryMedia), [component.galleryMedia]);

  const handleMouseEnter = () => {
    if (videoRef.current && !hasVideoError) {
      videoRef.current.currentTime = component.galleryVideoStart || 0;
      videoRef.current.play().then(() => {
        setIsVideoPlaying(true);
      }).catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    }
  };

  const formatCount = (n: number) => {
    if (!n) return '0';
    if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
    if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
    return String(n);
  };

  const isNew = (() => {
    if (!component.createdAt) return false;
    const date = new Date(component.createdAt).getTime();
    const now = new Date('2026-10-31').getTime();
    return now - date < 30 * 24 * 60 * 60 * 1000;
  })();

  return (
    <div
      id={`gallery-card-${component.name}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group/card relative block w-full shrink-0 break-inside-avoid isolate mb-3.5 transition-all duration-200"
    >
      <div className="overflow-hidden rounded-xl border border-white/[0.08] bg-[#111113] transition-all duration-200 ease-out hover:border-white/[0.2] hover:bg-[#141417] hover:shadow-cursor-card">
        {/* Media Preview Box */}
        <div
          onClick={() => onPreview(component)}
          className="relative isolate aspect-[709/418] w-full cursor-pointer overflow-hidden rounded-t-[11px] border-b border-white/[0.06] bg-black"
        >
          {/* Static Poster */}
          {safePoster && (
            <img
              src={safePoster}
              alt={component.displayName}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 size-full object-cover transition-transform duration-500 ease-out group-hover/card:scale-[1.02]"
            />
          )}

          {/* Smooth Video on Hover with Cross-Dissolve */}
          {safeMedia && !hasVideoError && (
            <video
              ref={videoRef}
              src={safeMedia}
              poster={safePoster}
              loop
              muted
              playsInline
              preload="none"
              onError={() => setHasVideoError(true)}
              onPlaying={() => setIsVideoPlaying(true)}
              className={`absolute inset-0 size-full object-cover transition-opacity duration-300 ease-out ${
                isVideoPlaying ? 'opacity-100' : 'opacity-0'
              }`}
            />
          )}

          {/* New Release Badge */}
          {isNew && (
            <span className="pointer-events-none absolute left-2.5 top-2.5 z-10 rounded-md border border-white/10 bg-black/80 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-white backdrop-blur-md">
              NEW
            </span>
          )}

          {/* Floating Hover Action Pills */}
          <div className="absolute right-2.5 top-2.5 z-20 flex items-center gap-1.5 opacity-0 transition-opacity duration-150 group-hover/card:opacity-100">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onPreview(component);
              }}
              aria-label={`Preview ${component.displayName}`}
              className="group/preview flex items-center rounded-lg border border-white/15 bg-black/80 px-2 py-1.5 text-white backdrop-blur-md transition-all hover:bg-black hover:border-white/30"
              title="Preview Stage"
            >
              <Eye className="size-4 shrink-0 text-white" />
              <span className="grid grid-cols-[0fr] opacity-0 transition-[grid-template-columns,opacity,margin] duration-200 ease-out group-hover/preview:ml-1.5 group-hover/preview:grid-cols-[1fr] group-hover/preview:opacity-100">
                <span className="min-w-0 overflow-hidden whitespace-nowrap text-xs font-medium tracking-tight">
                  Stage
                </span>
              </span>
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpenCode(component);
              }}
              aria-label={`View code for ${component.displayName}`}
              className="flex items-center justify-center rounded-lg border border-white/15 bg-black/80 p-1.5 text-white/80 backdrop-blur-md transition-all hover:bg-black hover:text-white hover:border-white/30"
              title="Get Code"
            >
              <Code2 className="size-4" />
            </button>
          </div>
        </div>

        {/* Card Footer Metadata */}
        <div className="flex items-center justify-between gap-2 p-2.5 sm:p-3">
          <div className="flex min-w-0 items-center gap-2">
            <p
              onClick={() => onPreview(component)}
              className="cursor-pointer truncate text-sm font-medium tracking-tight text-neutral-200 hover:text-white transition-colors"
            >
              {component.displayName}
            </p>
          </div>

          {/* Views count badge */}
          <span className="flex shrink-0 items-center gap-1 rounded-md border border-white/[0.06] bg-white/[0.03] px-2 py-0.5 text-[11px] font-mono text-neutral-400">
            <Eye className="size-3 shrink-0 text-neutral-500" />
            <span>{formatCount(component.views)}</span>
          </span>
        </div>
      </div>
    </div>
  );
};
