import React from 'react';
import { 
  Images, 
  Sparkles, 
  Film, 
  Layers, 
  Gamepad2, 
  Type, 
  MousePointerClick, 
  Square, 
  Image as ImageIcon, 
  Pointer, 
  Loader2, 
  LayoutGrid 
} from 'lucide-react';
import { CATEGORIES } from '../data/categories';

interface CategoryNavProps {
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
  totalCount: number;
}

// Icon mapping helper
const getCategoryIcon = (id: string) => {
  switch (id) {
    case 'image-gallery':
      return <Images className="w-3.5 h-3.5" />;
    case 'interactive-elements':
      return <Sparkles className="w-3.5 h-3.5" />;
    case 'animation':
      return <Film className="w-3.5 h-3.5" />;
    case 'background-animation':
      return <Layers className="w-3.5 h-3.5" />;
    case 'games':
      return <Gamepad2 className="w-3.5 h-3.5" />;
    case 'text':
      return <Type className="w-3.5 h-3.5" />;
    case 'button':
      return <MousePointerClick className="w-3.5 h-3.5" />;
    case 'border':
      return <Square className="w-3.5 h-3.5" />;
    case 'image':
      return <ImageIcon className="w-3.5 h-3.5" />;
    case 'cursor':
      return <Pointer className="w-3.5 h-3.5" />;
    case 'loader':
      return <Loader2 className="w-3.5 h-3.5" />;
    default:
      return <Sparkles className="w-3.5 h-3.5" />;
  }
};

export const CategoryNav: React.FC<CategoryNavProps> = ({
  selectedCategory,
  onSelectCategory,
  totalCount,
}) => {
  return (
    <div className="w-full border-b border-surface-border bg-background/50 backdrop-blur-sm sticky top-16 z-30 py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth pb-1 -mb-1">
          {/* All button */}
          <button
            onClick={() => onSelectCategory('all')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
              selectedCategory === 'all'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 border border-blue-500'
                : 'bg-surface hover:bg-surface-elevated text-slate-400 hover:text-slate-200 border border-surface-border'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>All</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                selectedCategory === 'all'
                  ? 'bg-blue-800 text-blue-100'
                  : 'bg-surface-elevated text-slate-500'
              }`}
            >
              {totalCount}
            </span>
          </button>

          {/* 11 Specific Categories */}
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 border border-blue-500'
                    : 'bg-surface hover:bg-surface-elevated text-slate-400 hover:text-slate-200 border border-surface-border'
                }`}
              >
                {getCategoryIcon(cat.id)}
                <span>{cat.label}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                    isSelected
                      ? 'bg-blue-800 text-blue-100'
                      : 'bg-surface-elevated text-slate-500'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

