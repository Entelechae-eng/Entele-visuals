import React from 'react';
import {
  Sparkles,
  Layers,
  CreditCard,
  MessageSquareQuote,
  BarChart3,
  Megaphone,
  HelpCircle,
  PanelBottom,
  Mail,
  LayoutGrid,
  Search,
  X,
  Bot,
  ExternalLink,
  Globe,
  Box,
  Image,
  Palette,
  Layout
} from 'lucide-react';
import { Category, ModeFilter, PlatformType, ImmersiveCategory } from '../types';
import { PLATFORM_STATS, TOTAL_TEMPLATES_COUNT } from '../data/templates';
import { IMMERSIVE_CATEGORIES } from '../data/immersiveCategories';

interface SidebarProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
  modeFilter: ModeFilter;
  onSelectMode: (mode: ModeFilter) => void;
  selectedPlatform: PlatformType;
  onSelectPlatform: (platform: PlatformType) => void;
  selectedImmersiveCategory?: ImmersiveCategory;
  onSelectImmersiveCategory?: (cat: ImmersiveCategory) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalComponentsCount: number;
  totalSectionsCount: number;
  totalImmersiveCount?: number;
  onOpenMcpModal: () => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

// Category icon mapper
const getCategoryIcon = (id: string) => {
  switch (id) {
    case 'hero':
      return <Sparkles className="size-3.5 shrink-0" />;
    case 'features':
      return <Layers className="size-3.5 shrink-0" />;
    case 'pricing':
      return <CreditCard className="size-3.5 shrink-0" />;
    case 'testimonials':
      return <MessageSquareQuote className="size-3.5 shrink-0" />;
    case 'stats':
      return <BarChart3 className="size-3.5 shrink-0" />;
    case 'cta':
      return <Megaphone className="size-3.5 shrink-0" />;
    case 'faq':
      return <HelpCircle className="size-3.5 shrink-0" />;
    case 'footer':
      return <PanelBottom className="size-3.5 shrink-0" />;
    case 'contact':
      return <Mail className="size-3.5 shrink-0" />;
    default:
      return <LayoutGrid className="size-3.5 shrink-0" />;
  }
};

const getImmersiveIcon = (key: ImmersiveCategory) => {
  switch (key) {
    case 'template':
      return <Layout className="size-3.5 shrink-0" />;
    case '3d_scene':
      return <Box className="size-3.5 shrink-0" />;
    case 'section':
      return <Sparkles className="size-3.5 shrink-0" />;
    case 'background':
      return <Image className="size-3.5 shrink-0" />;
    case 'gradient':
      return <Palette className="size-3.5 shrink-0" />;
    default:
      return <Layers className="size-3.5 shrink-0" />;
  }
};

export const Sidebar: React.FC<SidebarProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  modeFilter,
  onSelectMode,
  selectedPlatform,
  onSelectPlatform,
  selectedImmersiveCategory = 'all',
  onSelectImmersiveCategory,
  searchQuery,
  onSearchChange,
  totalComponentsCount,
  totalSectionsCount,
  totalImmersiveCount = 683,
  onOpenMcpModal,
  isOpenMobile,
  onCloseMobile,
}) => {
  const sectionCategoryIds = new Set([
    'hero',
    'features',
    'pricing',
    'testimonials',
    'stats',
    'cta',
    'faq',
    'footer',
    'contact',
  ]);

  const filteredCategories = categories.filter((cat) => {
    if (modeFilter === 'components') {
      return !sectionCategoryIds.has(cat.id);
    }
    if (modeFilter === 'sections') {
      return sectionCategoryIds.has(cat.id);
    }
    return true;
  });

  const totalFilteredCount =
    modeFilter === 'components'
      ? totalComponentsCount
      : modeFilter === 'sections'
      ? totalSectionsCount
      : modeFilter === 'templates'
      ? TOTAL_TEMPLATES_COUNT
      : modeFilter === 'immersive'
      ? totalImmersiveCount
      : totalComponentsCount + totalSectionsCount + TOTAL_TEMPLATES_COUNT + totalImmersiveCount;

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-md lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[260px] shrink-0 flex-col border-r border-white/[0.08] bg-[#09090b] transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Brand Header: Entele-Visuals */}
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-white/[0.08] px-4">
          <div className="flex items-center gap-2.5">
            <div className="relative flex size-7 items-center justify-center rounded-lg bg-white text-black shadow-sm">
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold tracking-tight text-white flex items-center gap-1.5">
                Entele-Visuals
                <span className="rounded bg-white/10 text-neutral-300 border border-white/15 px-1 py-0.2 text-[9px] font-mono">
                  v2.3
                </span>
              </span>
              <span className="text-[10px] text-neutral-400 leading-tight">
                29,627 Assets
              </span>
            </div>
          </div>

          {/* Close button on mobile */}
          <button
            onClick={onCloseMobile}
            className="flex size-7 items-center justify-center rounded-md text-neutral-400 hover:text-white lg:hidden"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="p-2 border-b border-white/[0.06]">
          <div className="grid grid-cols-2 gap-1 rounded-xl bg-black/50 p-1 border border-white/[0.06]">
            <a
              href="?mode=templates"
              onClick={(e) => {
                e.preventDefault();
                onSelectMode('templates');
              }}
              className={`rounded-lg py-1.5 text-center text-[11px] font-medium transition-all ${
                modeFilter === 'templates'
                  ? 'bg-white/15 text-white shadow-sm font-semibold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Templates
              <span className="ml-1 text-[9px] opacity-60">28k</span>
            </a>
            <a
              href="?mode=immersive"
              onClick={(e) => {
                e.preventDefault();
                onSelectMode('immersive');
              }}
              className={`rounded-lg py-1.5 text-center text-[11px] font-medium transition-all ${
                modeFilter === 'immersive'
                  ? 'bg-white/15 text-white shadow-sm font-semibold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Prompts
              <span className="ml-1 text-[9px] opacity-60">683</span>
            </a>
            <a
              href="?mode=components"
              onClick={(e) => {
                e.preventDefault();
                onSelectMode('components');
              }}
              className={`rounded-lg py-1 text-center text-[11px] font-medium transition-all ${
                modeFilter === 'components'
                  ? 'bg-white/15 text-white shadow-sm font-semibold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Components
              <span className="ml-1 text-[9px] opacity-60">805</span>
            </a>
            <a
              href="?mode=sections"
              onClick={(e) => {
                e.preventDefault();
                onSelectMode('sections');
              }}
              className={`rounded-lg py-1 text-center text-[11px] font-medium transition-all ${
                modeFilter === 'sections'
                  ? 'bg-white/15 text-white shadow-sm font-semibold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Sections
              <span className="ml-1 text-[9px] opacity-60">92</span>
            </a>
          </div>
        </div>

        {/* Search Input Box */}
        <div className="px-3 pt-2.5 pb-2">
          <div className="relative flex items-center">
            <Search className="pointer-events-none absolute left-3 size-3.5 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={`Search ${totalFilteredCount.toLocaleString()} items...`}
              className="h-8 w-full rounded-lg border border-white/[0.08] bg-black/50 pl-8 pr-7 text-xs text-white placeholder:text-neutral-500 focus:border-white/25 focus:outline-none"
            />
            {searchQuery ? (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 text-neutral-400 hover:text-white"
              >
                <X className="size-3.5" />
              </button>
            ) : (
              <span className="pointer-events-none absolute right-2.5 rounded border border-white/10 bg-white/5 px-1 py-0.2 text-[9px] font-mono text-neutral-500">
                /
              </span>
            )}
          </div>
        </div>

        {/* Scrollable Categories / Platforms / Immersive List */}
        <div className="flex-1 overflow-y-auto px-2 py-1 space-y-0.5 no-scrollbar">
          {modeFilter === 'immersive' ? (
            /* Immersive Prompts Category List */
            <>
              <div className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-neutral-500">
                Immersive Categories ({totalImmersiveCount})
              </div>
              {IMMERSIVE_CATEGORIES.map((cat) => {
                const isSelected = selectedImmersiveCategory === cat.key;
                return (
                  <a
                    key={cat.key}
                    href={`?mode=immersive&category=${cat.key}`}
                    onClick={(e) => {
                      e.preventDefault();
                      if (onSelectImmersiveCategory) {
                        onSelectImmersiveCategory(cat.key);
                      }
                    }}
                    className={`group flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-white/15 text-white font-semibold shadow-sm'
                        : 'text-neutral-400 hover:bg-white/[0.04] hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className={isSelected ? 'text-white' : 'text-neutral-400 group-hover:text-white'}>
                        {getImmersiveIcon(cat.key)}
                      </span>
                      <span className="truncate">{cat.label}</span>
                    </div>
                    <span
                      className={`rounded px-1.5 py-0.2 text-[10px] font-mono ${
                        isSelected ? 'bg-white/20 text-white' : 'text-neutral-400 bg-white/[0.03]'
                      }`}
                    >
                      {cat.count}
                    </span>
                  </a>
                );
              })}
            </>
          ) : modeFilter === 'templates' ? (
            /* Platforms List when Templates Mode is active */
            <>
              <div className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-neutral-500">
                Platforms ({TOTAL_TEMPLATES_COUNT.toLocaleString()})
              </div>
              {PLATFORM_STATS.map((p) => {
                const isSelected = selectedPlatform === p.id;
                return (
                  <a
                    key={p.id}
                    href={`?platform=${p.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onSelectPlatform(p.id);
                    }}
                    className={`group flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-white/15 text-white font-semibold shadow-sm'
                        : 'text-neutral-400 hover:bg-white/[0.04] hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <Globe
                        className={`size-3.5 shrink-0 ${
                          isSelected ? 'text-white' : 'text-neutral-400 group-hover:text-white'
                        }`}
                      />
                      <span className="truncate">{p.label}</span>
                    </div>
                    <span
                      className={`rounded px-1.5 py-0.2 text-[10px] font-mono ${
                        isSelected ? 'bg-white/20 text-white' : 'text-neutral-400 bg-white/[0.03]'
                      }`}
                    >
                      {p.count.toLocaleString()}
                    </span>
                  </a>
                );
              })}
            </>
          ) : (
            /* Standard Components / Sections Catalog Categories */
            <>
              {/* "All" Category Pill */}
              <a
                href={modeFilter === 'sections' ? '?mode=sections' : '?mode=components'}
                onClick={(e) => {
                  e.preventDefault();
                  onSelectCategory('all');
                }}
                className={`group flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-white/15 text-white font-semibold shadow-sm'
                    : 'text-neutral-400 hover:bg-white/[0.04] hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <LayoutGrid className="size-3.5 shrink-0 text-neutral-400 group-hover:text-white" />
                  <span className="truncate">
                    {modeFilter === 'sections'
                      ? 'All Sections'
                      : modeFilter === 'components'
                      ? 'All Components'
                      : 'All Motion Catalog'}
                  </span>
                </div>
                <span
                  className={`rounded px-1.5 py-0.2 text-[10px] font-mono ${
                    selectedCategory === 'all'
                      ? 'bg-white/20 text-white'
                      : 'text-neutral-400 bg-white/[0.03]'
                  }`}
                >
                  {modeFilter === 'sections'
                    ? totalSectionsCount
                    : modeFilter === 'components'
                    ? totalComponentsCount
                    : totalComponentsCount + totalSectionsCount}
                </span>
              </a>

              {/* Individual Category Pills */}
              {filteredCategories.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <a
                    key={cat.id}
                    href={`?category=${cat.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onSelectCategory(cat.id);
                    }}
                    className={`group flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-white/15 text-white font-semibold shadow-sm'
                        : 'text-neutral-400 hover:bg-white/[0.04] hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span
                        className={`transition-colors ${
                          isSelected ? 'text-white' : 'text-neutral-400 group-hover:text-white'
                        }`}
                      >
                        {getCategoryIcon(cat.id)}
                      </span>
                      <span className="truncate">{cat.label}</span>
                    </div>
                    <span
                      className={`rounded px-1.5 py-0.2 text-[10px] font-mono ${
                        isSelected ? 'bg-white/20 text-white' : 'text-neutral-400 bg-white/[0.03]'
                      }`}
                    >
                      {cat.count}
                    </span>
                  </a>
                );
              })}
            </>
          )}
        </div>

        {/* Sidebar Footer Area */}
        <div className="shrink-0 border-t border-white/[0.08] p-2.5 space-y-1.5">
          {/* GitHub Organization Link */}
          <a
            href="https://github.com/Entelechae-eng"
            target="_blank"
            rel="noopener noreferrer"
            title="Entelechae Official GitHub Organization (@Entelechae-eng)"
            className="group flex w-full items-center justify-between rounded-lg border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06] px-2.5 py-1.5 text-left transition-colors"
          >
            <div className="flex items-center gap-2">
              <div className="flex size-5 shrink-0 items-center justify-center rounded bg-white/10 text-white">
                <svg className="size-3 fill-current text-white" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
              </div>
              <span className="text-xs text-neutral-300 group-hover:text-white font-medium">
                Entelechae GitHub
              </span>
            </div>
            <ExternalLink className="size-3 text-neutral-500 group-hover:text-white" />
          </a>

          {/* MCP Connect Card */}
          <button
            type="button"
            onClick={onOpenMcpModal}
            className="group flex w-full items-center justify-between rounded-lg border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06] px-2.5 py-1.5 text-left transition-colors"
          >
            <div className="flex items-center gap-2">
              <div className="flex size-5 shrink-0 items-center justify-center rounded bg-white/10 text-white">
                <Bot className="size-3" />
              </div>
              <span className="text-xs text-neutral-300 group-hover:text-white font-medium">
                MCP Protocol
              </span>
            </div>
            <ExternalLink className="size-3 text-neutral-500 group-hover:text-white" />
          </button>
        </div>
      </aside>
    </>
  );
};
