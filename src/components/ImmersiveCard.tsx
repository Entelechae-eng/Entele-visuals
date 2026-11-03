import React, { useState, useRef } from 'react';
import { ImmersiveItem } from '../types';
import { Copy, Check, Play, Sparkles, Box, Layout, Image, Palette, Eye } from 'lucide-react';

interface ImmersiveCardProps {
  item: ImmersiveItem;
  onSelect: (item: ImmersiveItem) => void;
  onCopyPrompt?: (item: ImmersiveItem) => void;
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'template':
      return <Layout className="w-3 h-3" />;
    case '3d_scene':
      return <Box className="w-3 h-3" />;
    case 'section':
      return <Sparkles className="w-3 h-3" />;
    case 'background':
      return <Image className="w-3 h-3" />;
    case 'gradient':
      return <Palette className="w-3 h-3" />;
    default:
      return <Sparkles className="w-3 h-3" />;
  }
};

export const ImmersiveCard: React.FC<ImmersiveCardProps> = ({
  item,
  onSelect,
  onCopyPrompt
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current && (item.posterVideoPreview || item.posterVideo)) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleCopyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(item.prompt).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
    if (onCopyPrompt) {
      onCopyPrompt(item);
    }
  };

  const videoSource = item.posterVideoPreview || item.posterVideo;

  return (
    <div
      onClick={() => onSelect(item)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative flex flex-col bg-[#0a0a0a] border border-white/10 hover:border-white/25 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-black/60 cursor-pointer"
    >
      {/* Media Canvas / Poster */}
      <div className="relative aspect-[16/10] w-full bg-[#111] overflow-hidden">
        {/* Cover Poster Image */}
        {item.image && (
          <img
            src={item.image}
            alt={item.title}
            loading="lazy"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              isHovered && isVideoLoaded ? 'opacity-0' : 'opacity-100'
            }`}
          />
        )}

        {/* Looping Preview Video */}
        {videoSource && (
          <video
            ref={videoRef}
            src={videoSource}
            muted
            loop
            playsInline
            preload="none"
            onLoadedData={() => setIsVideoLoaded(true)}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
              isHovered && isVideoLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {/* Top Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none z-10">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium bg-black/60 backdrop-blur-md text-white/90 border border-white/10 uppercase tracking-wider">
            {getCategoryIcon(item.category)}
            {item.categoryLabel}
          </span>
          <span
            className={`px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider uppercase backdrop-blur-md ${
              item.tier === 'Free'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'bg-white/10 text-white/70 border border-white/10'
            }`}
          >
            {item.tier}
          </span>
        </div>

        {/* Quick Action Button on Hover */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2.5 z-20 pointer-events-none">
          <button
            onClick={handleCopyClick}
            type="button"
            className="pointer-events-auto inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white text-black text-xs font-semibold hover:bg-neutral-200 transition-colors shadow-lg active:scale-95"
            title="Copy AI Prompt"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Prompt</span>
              </>
            )}
          </button>
          <div className="pointer-events-auto inline-flex items-center justify-center w-8 h-8 rounded-lg bg-black/70 text-white/90 hover:text-white border border-white/20 hover:border-white/40 transition-colors">
            <Eye className="w-4 h-4" />
          </div>
        </div>

        {/* Play indicator on cards with video */}
        {videoSource && !isHovered && (
          <div className="absolute bottom-2.5 right-2.5 w-6 h-6 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/70 pointer-events-none">
            <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
          </div>
        )}
      </div>

      {/* Card Info */}
      <div className="p-3.5 flex flex-col flex-grow justify-between bg-[#0a0a0a]">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1">
            <h3 className="text-sm font-semibold text-white/95 group-hover:text-white transition-colors truncate">
              {item.title}
            </h3>
            {item.likes > 0 && (
              <span className="text-[11px] text-neutral-400 font-mono">
                ★ {item.likes}
              </span>
            )}
          </div>
          <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Tags / Stack */}
        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-white/5">
            {item.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-neutral-400 hover:text-neutral-300 transition-colors"
              >
                #{tag}
              </span>
            ))}
            {item.tags.length > 3 && (
              <span className="text-[10px] font-mono text-neutral-500 self-center">
                +{item.tags.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

