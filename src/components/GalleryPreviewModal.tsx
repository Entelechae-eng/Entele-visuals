import React, { useEffect, useRef, useState, useMemo } from 'react';
import { ComponentItem } from '../types';
import {
  Eye,
  Copy,
  Check,
  Play,
  Pause,
  RotateCcw,
  Maximize2,
  Minimize2,
  X,
  ChevronLeft,
  ChevronRight,
  Code2,
  Monitor,
  Laptop,
  Tablet,
  Smartphone,
  Share2,
  Link2
} from 'lucide-react';

interface GalleryPreviewModalProps {
  component: ComponentItem | null;
  allComponents: ComponentItem[];
  onSelectComponent: (component: ComponentItem) => void;
  onClose: () => void;
  onOpenCode: (component: ComponentItem) => void;
}

type ViewportMode = 'full' | 'laptop' | 'tablet' | 'mobile';

export const GalleryPreviewModal: React.FC<GalleryPreviewModalProps> = ({
  component,
  allComponents,
  onSelectComponent,
  onClose,
  onOpenCode,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [viewportMode, setViewportMode] = useState<ViewportMode>('full');
  const videoRef = useRef<HTMLVideoElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const componentUrl = component
    ? `https://entele-visuals.vercel.app/components?component=${encodeURIComponent(component.name)}`
    : 'https://entele-visuals.vercel.app/components';

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(componentUrl).then(() => {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
      });
    }
  };

  const handleShareX = () => {
    if (!component) return;
    const tweetText = `Just discovered "${component.displayName}" on Entele-Visuals — free copy-paste animated React & Tailwind component:`;
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(componentUrl)}&hashtags=react,tailwind,webdev,frontend`;
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  const currentIndex = useMemo(() => {
    if (!component) return -1;
    return allComponents.findIndex((c) => c.name === component.name);
  }, [component, allComponents]);

  // Navigate relative index
  const handleNavigate = (delta: number) => {
    if (currentIndex === -1 || allComponents.length === 0) return;
    const nextIdx = (currentIndex + delta + allComponents.length) % allComponents.length;
    onSelectComponent(allComponents[nextIdx]);
  };

  // Keyboard navigation
  useEffect(() => {
    if (!component) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        handleNavigate(1);
      } else if (e.key === 'ArrowLeft') {
        handleNavigate(-1);
      } else if (e.key === ' ' && e.target === document.body) {
        e.preventDefault();
        togglePlayPause();
      }
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [component, currentIndex, allComponents]);

  // Reset playback when switching component
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = component?.galleryVideoStart || 0;
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }, [component?.name]);

  if (!component) return null;

  const togglePlayPause = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleReload = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = component.galleryVideoStart || 0;
    videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
  };

  const toggleFullscreen = () => {
    if (!stageRef.current) return;
    if (!document.fullscreenElement) {
      stageRef.current.requestFullscreen?.().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen?.().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const handleCopyInstall = (e: React.MouseEvent) => {
    e.stopPropagation();
    const command = `npx entele-visuals add ${component.name}`;
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatCount = (n: number) => {
    if (!n) return '0';
    if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
    if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
    return String(n);
  };

  // Filmstrip offsets for adjacent components: [0, -1, 1, -2, 2, -3, 3]
  const filmstripOffsets = [0, -1, 1, -2, 2, -3, 3];
  const carouselItems = filmstripOffsets
    .map((offset) => {
      const idx = (currentIndex + offset + allComponents.length) % allComponents.length;
      return {
        item: allComponents[idx],
        offset,
      };
    })
    .sort((a, b) => a.offset - b.offset);

  const viewportWidthClasses: Record<ViewportMode, string> = {
    full: 'w-full',
    laptop: 'max-w-[1024px]',
    tablet: 'max-w-[768px]',
    mobile: 'max-w-[390px]',
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${component.displayName} preview stage`}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-between gap-2.5 overflow-hidden bg-black/95 p-2.5 sm:p-4 backdrop-blur-2xl transition-all duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Top Stage Bar */}
      <div className="flex w-full max-w-[1180px] shrink-0 items-center justify-between gap-2 sm:gap-4">
        {/* Left: Component Name & Stats */}
        <div className="flex min-w-0 items-center gap-2">
          {/* Name Pill */}
          <div className="relative flex items-center rounded-xl bg-white/[0.04] px-3 py-1.5 border border-white/[0.08] shadow-sm">
            <h2 className="truncate text-sm sm:text-base font-semibold tracking-tight text-white">
              {component.displayName}
            </h2>
          </div>

          {/* Stats Pill */}
          <div className="hidden md:flex items-center rounded-xl bg-white/[0.04] border border-white/[0.08] overflow-hidden text-xs">
            <button
              type="button"
              onClick={handleCopyInstall}
              className="flex items-center gap-1.5 border-r border-white/[0.08] px-2.5 py-1.5 text-neutral-400 hover:text-white transition-colors"
              title="Click to copy CLI command"
            >
              {copied ? (
                <Check className="size-3.5 text-white" />
              ) : (
                <Copy className="size-3.5" />
              )}
              <span>{formatCount(component.copyCount)} CLI</span>
            </button>
            <span className="flex items-center gap-1 px-2.5 py-1.5 text-neutral-400 font-mono">
              <Eye className="size-3.5" />
              <span>{formatCount(component.views)}</span>
            </span>
          </div>
        </div>

        {/* Center: Responsive Viewport Switcher */}
        <div className="hidden lg:flex items-center rounded-xl bg-white/[0.04] border border-white/[0.08] p-1 gap-1">
          <button
            type="button"
            onClick={() => setViewportMode('full')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
              viewportMode === 'full' ? 'bg-white/15 text-white' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Monitor className="size-3.5" />
            <span>Full</span>
          </button>
          <button
            type="button"
            onClick={() => setViewportMode('laptop')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
              viewportMode === 'laptop' ? 'bg-white/15 text-white' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Laptop className="size-3.5" />
            <span>1024px</span>
          </button>
          <button
            type="button"
            onClick={() => setViewportMode('tablet')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
              viewportMode === 'tablet' ? 'bg-white/15 text-white' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Tablet className="size-3.5" />
            <span>Tablet</span>
          </button>
          <button
            type="button"
            onClick={() => setViewportMode('mobile')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
              viewportMode === 'mobile' ? 'bg-white/15 text-white' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Smartphone className="size-3.5" />
            <span>Mobile</span>
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex shrink-0 items-center gap-2">
          {/* Share on X */}
          <button
            type="button"
            onClick={handleShareX}
            title="Share on X / Twitter"
            className="ui-press hidden sm:flex items-center gap-1.5 rounded-xl bg-white/[0.05] hover:bg-white/10 border border-white/[0.08] px-3 py-1.5 text-xs sm:text-sm font-medium text-neutral-300 hover:text-white transition-colors"
          >
            <Share2 className="size-3.5" />
            <span className="hidden md:inline">Share</span>
          </button>

          {/* Copy Direct Link */}
          <button
            type="button"
            onClick={handleCopyLink}
            title="Copy direct shareable link"
            className="ui-press flex items-center gap-1.5 rounded-xl bg-white/[0.05] hover:bg-white/10 border border-white/[0.08] px-3 py-1.5 text-xs sm:text-sm font-medium text-neutral-300 hover:text-white transition-colors"
          >
            {copiedLink ? (
              <>
                <Check className="size-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Link2 className="size-3.5" />
                <span className="hidden sm:inline">Copy Link</span>
              </>
            )}
          </button>

          {/* Open Code Button */}
          <button
            type="button"
            onClick={() => onOpenCode(component)}
            className="ui-press flex items-center gap-1.5 rounded-xl bg-white hover:bg-neutral-200 px-3 py-1.5 text-xs sm:text-sm font-semibold text-black transition-colors shadow-sm"
          >
            <Code2 className="size-4 text-black" />
            <span>View Code</span>
          </button>

          {/* Close Modal Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close preview"
            className="ui-press flex size-8 sm:size-9 items-center justify-center rounded-xl bg-white/[0.05] border border-white/[0.08] text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="size-4 sm:size-5" />
          </button>
        </div>
      </div>

      {/* Main Interactive Stage Container */}
      <div
        ref={stageRef}
        className={`group/stage relative flex flex-1 items-center justify-center overflow-hidden rounded-2xl border border-white/[0.08] bg-[#050607] transition-all duration-300 ${viewportWidthClasses[viewportMode]}`}
      >
        {/* Stage Media Viewport */}
        {component.galleryMedia ? (
          <video
            ref={videoRef}
            src={component.galleryMedia}
            poster={component.galleryPoster}
            autoPlay
            loop
            muted
            playsInline
            controls={false}
            className="size-full object-contain pointer-events-auto"
          />
        ) : component.galleryPoster ? (
          <img
            src={component.galleryPoster}
            alt={component.displayName}
            className="size-full object-contain pointer-events-auto"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-neutral-400">
            <Eye className="size-10 opacity-30 mb-2" />
            <p className="text-xs">Live stage preview rendering</p>
          </div>
        )}

        {/* Top-Right Floating Controls (Play, Reload, Fullscreen) */}
        <div className="pointer-events-none absolute right-3 top-3 z-[100] flex items-center gap-1.5 [&>*]:pointer-events-auto">
          <button
            type="button"
            onClick={togglePlayPause}
            aria-label={isPlaying ? 'Pause preview' : 'Play preview'}
            title={isPlaying ? 'Pause' : 'Play'}
            className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-black/75 backdrop-blur-md border border-white/10 text-neutral-300 hover:text-white hover:bg-black transition-colors"
          >
            {isPlaying ? <Pause className="size-3.5" /> : <Play className="size-3.5 ml-0.5" />}
          </button>

          <button
            type="button"
            onClick={handleReload}
            aria-label="Reload preview"
            title="Replay from start"
            className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-black/75 backdrop-blur-md border border-white/10 text-neutral-300 hover:text-white hover:bg-black transition-colors"
          >
            <RotateCcw className="size-3.5" />
          </button>

          <button
            type="button"
            onClick={toggleFullscreen}
            aria-label="Toggle fullscreen"
            title="Fullscreen"
            className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-black/75 backdrop-blur-md border border-white/10 text-neutral-300 hover:text-white hover:bg-black transition-colors"
          >
            {isFullscreen ? <Minimize2 className="size-3.5" /> : <Maximize2 className="size-3.5" />}
          </button>
        </div>

        {/* Mobile/Tablet Prev & Next Chevron Overlays */}
        <button
          type="button"
          onClick={() => handleNavigate(-1)}
          aria-label="Previous component"
          className="ui-press absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 flex size-9 items-center justify-center rounded-full bg-black/60 border border-white/10 text-white/80 hover:text-white hover:bg-black/90 backdrop-blur-md transition-all"
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          type="button"
          onClick={() => handleNavigate(1)}
          aria-label="Next component"
          className="ui-press absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 flex size-9 items-center justify-center rounded-full bg-black/60 border border-white/10 text-white/80 hover:text-white hover:bg-black/90 backdrop-blur-md transition-all"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>

      {/* Bottom Filmstrip Carousel Strip (Desktop / Tablet) */}
      <div className="hidden sm:flex w-full max-w-[1180px] shrink-0 items-center justify-center gap-2 overflow-x-auto py-1 no-scrollbar">
        {carouselItems.map(({ item, offset }) => {
          const isSelected = offset === 0;
          return (
            <button
              key={`${item.name}-${offset}`}
              type="button"
              onClick={() => onSelectComponent(item)}
              className={`ui-press relative aspect-[709/418] h-14 shrink-0 overflow-hidden rounded-lg border transition-all ${
                isSelected
                  ? 'border-white ring-2 ring-white/20 scale-105 z-10'
                  : 'border-white/[0.08] opacity-50 hover:opacity-100 hover:border-white/30'
              }`}
            >
              {item.galleryPoster ? (
                <img
                  src={item.galleryPoster}
                  alt={item.displayName}
                  className="size-full object-cover"
                />
              ) : (
                <div className="size-full bg-black" />
              )}
              {isSelected && (
                <div className="absolute inset-x-0 bottom-0 bg-black/80 px-1 py-0.5 text-center">
                  <span className="truncate text-[9px] font-medium text-white block">
                    {item.displayName}
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
