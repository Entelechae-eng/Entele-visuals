import React from 'react';
import { SortOption } from '../types';
import { SlidersHorizontal, ArrowUpDown } from 'lucide-react';

interface StatsBannerProps {
  totalVisible: number;
  selectedCategoryLabel: string;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export const StatsBanner: React.FC<StatsBannerProps> = ({
  totalVisible,
  selectedCategoryLabel,
  sortBy,
  onSortChange,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
      {/* Hero Headline */}
      <div className="relative mb-8 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          805 High-Performance Animated Components
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
          Motion Engineered for{' '}
          <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
            Modern Web Platforms
          </span>
        </h1>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
          WebGL shaders, fluid physics, kinetic typography, 3D carousels, and reactive micro-interactions.
          Copy code into React, Vite, Next.js, or install directly into Framer and AI workflows.
        </p>
      </div>

      {/* Control bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-3 border-b border-surface-border/60">
        <div className="flex items-center gap-2 text-sm text-slate-300">
          <SlidersHorizontal className="w-4 h-4 text-blue-400" />
          <span className="font-semibold text-white">{selectedCategoryLabel}</span>
          <span className="text-slate-500">·</span>
          <span className="text-xs text-slate-400 font-mono">
            Showing <strong className="text-blue-400">{totalVisible}</strong> component{totalVisible === 1 ? '' : 's'}
          </span>
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400 flex items-center gap-1">
            <ArrowUpDown className="w-3.5 h-3.5" /> Sort:
          </span>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="bg-surface-elevated border border-surface-border text-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-blue-500/50 text-xs"
          >
            <option value="popular">Most Popular</option>
            <option value="newest">Newest Releases</option>
            <option value="alphabetical">Alphabetical (A-Z)</option>
          </select>
        </div>
      </div>
    </div>
  );
};

