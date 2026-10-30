import React, { useState, useEffect } from 'react';
import { Search, X, Check } from 'lucide-react';
import { PlatformType } from '../types';
import {
  PLATFORM_STATS,
  TEMPLATE_CATEGORIES,
  TEMPLENS_EXAMPLE_PROMPTS,
  TOTAL_TEMPLATES_COUNT,
  TOTAL_FREE_TEMPLATES_COUNT,
} from '../data/templates';

interface TemplensHeroProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedPlatform: PlatformType;
  onSelectPlatform: (platform: PlatformType) => void;
  onlyFree: boolean;
  onToggleFree: () => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
}

export const TemplensHero: React.FC<TemplensHeroProps> = ({
  searchQuery,
  onSearchChange,
  selectedPlatform,
  onSelectPlatform,
  onlyFree,
  onToggleFree,
  selectedCategory,
  onSelectCategory,
}) => {
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [displayedPlaceholder, setDisplayedPlaceholder] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  // Cycling animated placeholder typewriter effect
  useEffect(() => {
    let currentPrompt = TEMPLENS_EXAMPLE_PROMPTS[placeholderIndex];
    let charIndex = 0;
    let timer: NodeJS.Timeout;

    if (isTyping) {
      timer = setInterval(() => {
        if (charIndex <= currentPrompt.length) {
          setDisplayedPlaceholder(currentPrompt.slice(0, charIndex));
          charIndex++;
        } else {
          clearInterval(timer);
          setTimeout(() => setIsTyping(false), 2600);
        }
      }, 35);
    } else {
      timer = setInterval(() => {
        if (charIndex >= 0) {
          setDisplayedPlaceholder(currentPrompt.slice(0, charIndex));
          charIndex--;
        } else {
          clearInterval(timer);
          setPlaceholderIndex((prev) => (prev + 1) % TEMPLENS_EXAMPLE_PROMPTS.length);
          setIsTyping(true);
        }
      }, 15);
    }

    return () => clearInterval(timer);
  }, [placeholderIndex, isTyping]);

  return (
    <div className="relative border-b border-white/[0.08] bg-[#09090b] px-3.5 py-6 sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        {/* Monochromatic Pill Header */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 mb-3 shadow-sm">
          <span className="text-xs font-medium text-neutral-300">
            Templens Template Directory
          </span>
          <span className="size-1 rounded-full bg-white/20" />
          <span className="font-mono text-[11px] text-neutral-400">
            {TOTAL_TEMPLATES_COUNT.toLocaleString()} Templates
          </span>
        </div>

        {/* Hero Title */}
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white mb-2">
          Describe your site. We’ll find the template.
        </h1>

        <p className="mx-auto max-w-2xl text-xs sm:text-sm text-neutral-400 mb-5 leading-relaxed">
          Over <span className="text-white font-medium">28,047</span> web templates across Framer, Webflow, Shopify, Next.js, React, Astro and Nuxt.
        </p>

        {/* Minimal Search Input Box */}
        <div className="relative mx-auto max-w-2xl mb-4">
          <div className="relative flex items-center rounded-xl border border-white/10 bg-[#111113] p-1.5 shadow-sm focus-within:border-white/30 transition-colors">
            <Search className="size-4 text-neutral-400 ml-3 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={displayedPlaceholder || 'Describe your website, niche or tech stack…'}
              className="w-full bg-transparent px-3 py-1.5 text-xs sm:text-sm text-white placeholder:text-neutral-500 focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="p-1 text-neutral-400 hover:text-white mr-1 transition-colors"
                aria-label="Clear search"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
        </div>

        {/* Monochromatic Platform Selection Pills */}
        <div className="flex items-center justify-start sm:justify-center gap-1.5 overflow-x-auto no-scrollbar pb-1.5 sm:pb-0 mb-3">
          {PLATFORM_STATS.map((stat) => {
            const isSelected = selectedPlatform === stat.id;
            return (
              <button
                key={stat.id}
                type="button"
                onClick={() => onSelectPlatform(stat.id)}
                className={`ui-press shrink-0 flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-white text-black font-semibold'
                    : 'bg-white/[0.03] text-neutral-400 hover:text-white hover:bg-white/[0.06] border border-white/[0.06]'
                }`}
              >
                <span>{stat.label}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                    isSelected ? 'bg-black/10 text-black' : 'bg-white/[0.06] text-neutral-400'
                  }`}
                >
                  {stat.count >= 1000 ? `${(stat.count / 1000).toFixed(1)}k` : stat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Minimal Sub-Filters: Free Only Toggle & Niches */}
        <div className="flex flex-wrap items-center justify-start sm:justify-center gap-2 pt-2 border-t border-white/[0.06]">
          {/* Free Only Toggle Pill (Monochrome) */}
          <button
            type="button"
            onClick={onToggleFree}
            className={`ui-press flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
              onlyFree
                ? 'bg-white/15 text-white border border-white/30'
                : 'bg-white/[0.02] text-neutral-400 hover:text-white border border-white/[0.06]'
            }`}
          >
            <div
              className={`size-3.5 rounded border flex items-center justify-center transition-colors ${
                onlyFree ? 'border-white bg-white text-black' : 'border-neutral-500'
              }`}
            >
              {onlyFree && <Check className="size-2.5 text-black stroke-[3]" />}
            </div>
            <span>Free Only</span>
            <span className="text-[10px] font-mono opacity-60">
              ({TOTAL_FREE_TEMPLATES_COUNT.toLocaleString()})
            </span>
          </button>

          {/* Categories */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
            {TEMPLATE_CATEGORIES.slice(1).map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(selectedCategory === cat.id ? 'all' : cat.id)}
                className={`ui-press shrink-0 rounded-lg px-2 py-0.5 text-[11px] font-medium transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-white/15 text-white border border-white/20'
                    : 'text-neutral-400 hover:text-white hover:bg-white/[0.03]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
