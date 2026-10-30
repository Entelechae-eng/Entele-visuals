import React, { useState, useRef, useEffect } from 'react';
import {
  Menu,
  X,
  SlidersHorizontal,
  Bot,
  ChevronDown
} from 'lucide-react';
import { SortOption } from '../types';

interface TopBarProps {
  totalCount: number;
  selectedCategoryLabel: string;
  selectedCategory: string;
  onClearCategory: () => void;
  searchQuery: string;
  onClearSearch: () => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  onOpenMcpModal: () => void;
  onOpenMobileMenu: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  totalCount,
  selectedCategoryLabel,
  selectedCategory,
  onClearCategory,
  searchQuery,
  onClearSearch,
  sortBy,
  onSortChange,
  onOpenMcpModal,
  onOpenMobileMenu,
}) => {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const hasActiveFilters = selectedCategory !== 'all' || searchQuery.trim() !== '';

  const sortLabels: Record<SortOption, string> = {
    default: 'Default Order',
    featured: 'Featured',
    popular: 'Most Popular',
    newest: 'Newest',
    alphabetical: 'A-Z',
  };

  return (
    <div className="sticky top-0 z-30 flex min-h-12 w-full flex-col border-b border-white/[0.08] bg-[#09090b]/90 backdrop-blur-xl px-3.5 sm:px-6">
      <div className="flex h-12 items-center justify-between gap-3">
        {/* Left Side: Mobile Menu Button + Discover Count / Active Filter Chips */}
        <div className="flex min-w-0 flex-1 items-center gap-2.5">
          <button
            type="button"
            onClick={onOpenMobileMenu}
            aria-label="Open navigation menu"
            className="flex size-7 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-neutral-400 hover:text-white lg:hidden"
          >
            <Menu className="size-3.5" />
          </button>

          {/* If filtering: Show active removable filter tags */}
          {hasActiveFilters ? (
            <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto no-scrollbar">
              {selectedCategory !== 'all' && (
                <span className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.06] px-2 py-0.5 text-xs text-white">
                  <span className="capitalize">{selectedCategoryLabel}</span>
                  <button
                    type="button"
                    onClick={onClearCategory}
                    aria-label={`Remove ${selectedCategoryLabel} filter`}
                    className="text-neutral-400 hover:text-white"
                  >
                    <X className="size-3" />
                  </button>
                </span>
              )}

              {searchQuery.trim() !== '' && (
                <span className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.06] px-2 py-0.5 text-xs text-white">
                  <span className="truncate max-w-[120px]">“{searchQuery.trim()}”</span>
                  <button
                    type="button"
                    onClick={onClearSearch}
                    aria-label="Remove search filter"
                    className="text-neutral-400 hover:text-white"
                  >
                    <X className="size-3" />
                  </button>
                </span>
              )}

              <button
                type="button"
                onClick={() => {
                  onClearCategory();
                  onClearSearch();
                }}
                className="text-xs text-neutral-500 hover:text-white underline decoration-dotted transition-colors"
              >
                Clear all
              </button>
            </div>
          ) : (
            <p className="min-w-0 truncate text-xs font-normal tracking-tight text-neutral-400">
              <span className="text-white font-medium">{totalCount.toLocaleString()}</span> Assets
            </p>
          )}
        </div>

        {/* Right Side: Sorting Dropdown & MCP Modal Trigger */}
        <div className="flex shrink-0 items-center gap-2">
          {/* Sort Dropdown */}
          <div className="relative" ref={sortRef}>
            <button
              type="button"
              onClick={() => setIsSortOpen((prev) => !prev)}
              aria-label="Sort components"
              className="ui-press flex h-7 sm:h-8 items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] px-2.5 text-xs font-medium text-neutral-300 hover:bg-white/[0.06] hover:text-white transition-colors"
            >
              <SlidersHorizontal className="size-3 text-neutral-400" />
              <span>{sortLabels[sortBy]}</span>
              <ChevronDown className="size-3 text-neutral-400" />
            </button>

            {isSortOpen && (
              <div className="absolute right-0 top-full mt-1 w-44 rounded-xl border border-white/[0.1] bg-[#111113] p-1 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-100 backdrop-blur-2xl">
                {(Object.keys(sortLabels) as SortOption[]).map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => {
                      onSortChange(key);
                      setIsSortOpen(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-xs text-left transition-colors ${
                      sortBy === key
                        ? 'bg-white/15 text-white font-medium'
                        : 'text-neutral-400 hover:bg-white/[0.04] hover:text-white'
                    }`}
                  >
                    <span>{sortLabels[key]}</span>
                    {sortBy === key && <span className="size-1 rounded-full bg-white" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Connect MCP Button */}
          <button
            type="button"
            onClick={onOpenMcpModal}
            className="ui-press flex h-7 sm:h-8 items-center gap-1.5 rounded-lg bg-white hover:bg-neutral-200 px-3 text-xs font-semibold text-black transition-colors shadow-sm"
          >
            <Bot className="size-3.5 text-black" />
            <span className="hidden sm:inline">MCP</span>
          </button>
        </div>
      </div>
    </div>
  );
};
