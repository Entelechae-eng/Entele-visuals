import React from 'react';
import { ImmersiveCategory } from '../types';
import { IMMERSIVE_CATEGORIES } from '../data/immersiveCategories';
import {
  Sparkles,
  Layout,
  Box,
  Image,
  Palette,
  Layers,
  Search,
  ArrowUpDown
} from 'lucide-react';

interface ImmersiveHeroProps {
  selectedCategory: ImmersiveCategory;
  onSelectCategory: (cat: ImmersiveCategory) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedTier: 'all' | 'Free' | 'Premium';
  onTierChange: (tier: 'all' | 'Free' | 'Premium') => void;
  sortBy: 'popular' | 'newest' | 'alphabetical';
  onSortChange: (sort: 'popular' | 'newest' | 'alphabetical') => void;
  totalResults: number;
}

const getCategoryIcon = (key: ImmersiveCategory) => {
  switch (key) {
    case 'template':
      return <Layout className="w-3.5 h-3.5" />;
    case '3d_scene':
      return <Box className="w-3.5 h-3.5" />;
    case 'section':
      return <Sparkles className="w-3.5 h-3.5" />;
    case 'background':
      return <Image className="w-3.5 h-3.5" />;
    case 'gradient':
      return <Palette className="w-3.5 h-3.5" />;
    default:
      return <Layers className="w-3.5 h-3.5" />;
  }
};

export const ImmersiveHero: React.FC<ImmersiveHeroProps> = ({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  selectedTier,
  onTierChange,
  sortBy,
  onSortChange,
  totalResults
}) => {
  const currentMeta = IMMERSIVE_CATEGORIES.find((c) => c.key === selectedCategory) || IMMERSIVE_CATEGORIES[0];

  return (
    <div className="w-full mb-8 pt-4">
      {/* Top Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#141414] to-[#0a0a0a] border border-white/10 p-6 sm:p-10 mb-6">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-white/[0.03] rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-neutral-300 mb-4">
            <Sparkles className="w-3 h-3 text-white" />
            <span>{currentMeta.eyebrow}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-3">
            {currentMeta.heading}
          </h1>

          <p className="text-sm sm:text-base text-neutral-400 leading-relaxed max-w-2xl">
            {currentMeta.lede}
          </p>
        </div>
      </div>

      {/* 5 Categories Navigation Tabs Bar */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 mb-5">
        {IMMERSIVE_CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.key;
          return (
            <button
              key={cat.key}
              type="button"
              onClick={() => onSelectCategory(cat.key)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-200 border ${
                isActive
                  ? 'bg-white text-black border-white shadow-lg shadow-white/10'
                  : 'bg-[#0f0f0f] text-neutral-400 hover:text-white border-white/10 hover:border-white/20 hover:bg-[#151515]'
              }`}
            >
              {getCategoryIcon(cat.key)}
              <span>{cat.label}</span>
              <span
                className={`ml-1 px-1.5 py-0.5 rounded text-[10px] font-mono ${
                  isActive ? 'bg-black/20 text-black' : 'bg-white/10 text-neutral-400'
                }`}
              >
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Filter and Search Control Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-2 bg-[#0a0a0a] border border-white/10 rounded-xl">
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search prompts, shaders, tags..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-black/60 border border-white/10 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-white/30 transition-colors"
          />
        </div>

        {/* Right Controls: Tier & Sort */}
        <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-2">
          {/* Tier Filter */}
          <div className="flex items-center gap-1 bg-black/60 p-1 rounded-lg border border-white/10 text-xs">
            <button
              type="button"
              onClick={() => onTierChange('all')}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                selectedTier === 'all' ? 'bg-white text-black' : 'text-neutral-400 hover:text-white'
              }`}
            >
              All Tiers
            </button>
            <button
              type="button"
              onClick={() => onTierChange('Free')}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                selectedTier === 'Free' ? 'bg-emerald-500 text-black font-semibold' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Free
            </button>
            <button
              type="button"
              onClick={() => onTierChange('Premium')}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                selectedTier === 'Premium' ? 'bg-white text-black' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Premium
            </button>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-1.5 text-xs text-neutral-400 bg-black/60 border border-white/10 px-2.5 py-1.5 rounded-lg">
            <ArrowUpDown className="w-3.5 h-3.5 text-neutral-500" />
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as any)}
              className="bg-transparent text-white text-xs focus:outline-none cursor-pointer"
            >
              <option value="popular" className="bg-[#111] text-white">Popular</option>
              <option value="newest" className="bg-[#111] text-white">Newest</option>
              <option value="alphabetical" className="bg-[#111] text-white">Name</option>
            </select>
          </div>

          {/* Result Count */}
          <span className="hidden md:inline-block text-[11px] font-mono text-neutral-500 pl-2">
            {totalResults} items
          </span>
        </div>
      </div>
    </div>
  );
};
