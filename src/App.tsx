import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import componentsData from './data/components.json';
import { CATEGORIES } from './data/categories';
import {
  ComponentItem,
  SortOption,
  ModeFilter,
  TemplateItem,
  PlatformType,
  ImmersiveItem,
  ImmersiveCategory
} from './types';
import { TOTAL_TEMPLATES_COUNT } from './data/templates';
import { IMMERSIVE_CATEGORIES } from './data/immersiveCategories';
import { fetchTemplates } from './utils/templensApi';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { ComponentCard } from './components/ComponentCard';
import { GalleryPreviewModal } from './components/GalleryPreviewModal';
import { ComponentModal } from './components/ComponentModal';
import { McpIntegrationModal } from './components/McpIntegrationModal';
import { TemplensHero } from './components/TemplensHero';
import { TemplateCard } from './components/TemplateCard';
import { TemplatePreviewModal } from './components/TemplatePreviewModal';
import { ImmersiveHero } from './components/ImmersiveHero';
import { ImmersiveCard } from './components/ImmersiveCard';
import { ImmersiveModal } from './components/ImmersiveModal';
import {
  SearchX,
  ArrowDown,
  Layers,
  Component as ComponentIcon,
  Globe,
  SlidersHorizontal,
  Loader2,
  WifiOff,
  Sparkles
} from 'lucide-react';

export const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [modeFilter, setModeFilter] = useState<ModeFilter>('templates');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [debouncedQuery, setDebouncedQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [previewComponent, setPreviewComponent] = useState<ComponentItem | null>(null);
  const [codeComponent, setCodeComponent] = useState<ComponentItem | null>(null);
  const [isMcpModalOpen, setIsMcpModalOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [displayCount, setDisplayCount] = useState<number>(36);
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  // Templens Templates State
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformType>('all');
  const [onlyFreeTemplates, setOnlyFreeTemplates] = useState<boolean>(false);
  const [templateNiche, setTemplateNiche] = useState<string>('all');
  const [templates, setTemplates] = useState<TemplateItem[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateItem | null>(null);
  const [isLoadingTemplates, setIsLoadingTemplates] = useState<boolean>(false);
  const [templatesOffset, setTemplatesOffset] = useState<number>(0);
  const [hasMoreTemplates, setHasMoreTemplates] = useState<boolean>(true);
  const [templatesTotal, setTemplatesTotal] = useState<number>(TOTAL_TEMPLATES_COUNT);

  // Immersive Website Prompts State (683 items across 5 categories)
  const [immersiveItems, setImmersiveItems] = useState<ImmersiveItem[]>([]);
  const [selectedImmersiveCategory, setSelectedImmersiveCategory] = useState<ImmersiveCategory>('all');
  const [selectedImmersiveTier, setSelectedImmersiveTier] = useState<'all' | 'Free' | 'Premium'>('all');
  const [selectedImmersiveSort, setSelectedImmersiveSort] = useState<'popular' | 'newest' | 'alphabetical'>('popular');
  const [selectedImmersiveItem, setSelectedImmersiveItem] = useState<ImmersiveItem | null>(null);
  const [immersiveDisplayCount, setImmersiveDisplayCount] = useState<number>(36);
  const [isLoadingImmersive, setIsLoadingImmersive] = useState<boolean>(false);

  // Sentinel ref for butter-smooth infinite scrolling
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Debounce search query (250ms) to ensure butter-smooth 60fps input response
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 250);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Online / offline listeners
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Lazy load immersive items on demand
  useEffect(() => {
    if ((modeFilter === 'immersive' || window.location.search.includes('mode=immersive') || window.location.search.includes('prompt=')) && immersiveItems.length === 0 && !isLoadingImmersive) {
      setIsLoadingImmersive(true);
      import('./data/immersiveData.json')
        .then((mod) => {
          setImmersiveItems(mod.default as ImmersiveItem[]);
          setIsLoadingImmersive(false);
        })
        .catch((err) => {
          console.error('Failed to load immersive items:', err);
          setIsLoadingImmersive(false);
        });
    }
  }, [modeFilter, immersiveItems.length, isLoadingImmersive]);

  // Initialize from URL pathname & query parameters on mount (Deep-linking & pSEO)
  useEffect(() => {
    try {
      const pathname = window.location.pathname.toLowerCase().replace(/\/+$/, '');
      const segments = pathname.split('/').filter(Boolean);
      const params = new URLSearchParams(window.location.search);
      const urlMode = params.get('mode') as ModeFilter | null;
      const urlCat = params.get('category');
      const urlPlatform = params.get('platform') as PlatformType | null;
      const urlQ = params.get('q');
      const urlComp = params.get('component');
      const urlPrompt = params.get('prompt');

      // 1. Path-based routing evaluation (e.g. /templates/framer, /components/buttons, /prompts/3d-scenes)
      if (segments.length > 0) {
        const rootSegment = segments[0];
        const subSegment = segments[1];

        if (rootSegment === 'templates') {
          setModeFilter('templates');
          if (subSegment && ['framer', 'webflow', 'shopify', 'nextjs', 'react', 'astro', 'nuxt'].includes(subSegment)) {
            setSelectedPlatform(subSegment as PlatformType);
          }
        } else if (rootSegment === 'components') {
          setModeFilter('components');
          if (subSegment) {
            setSelectedCategory(subSegment);
          }
        } else if (rootSegment === 'sections') {
          setModeFilter('sections');
          if (subSegment) {
            setSelectedCategory(subSegment);
          }
        } else if (rootSegment === 'prompts' || rootSegment === 'immersive') {
          setModeFilter('immersive');
          if (subSegment) {
            const promptSlugMap: Record<string, ImmersiveCategory> = {
              'templates': 'template',
              'template': 'template',
              '3d-scenes': '3d_scene',
              '3d_scene': '3d_scene',
              '3d': '3d_scene',
              'sections': 'section',
              'section': 'section',
              'backgrounds': 'background',
              'background': 'background',
              'gradients': 'gradient',
              'gradient': 'gradient'
            };
            if (promptSlugMap[subSegment]) {
              setSelectedImmersiveCategory(promptSlugMap[subSegment]);
            }
          }
        }
      }

      // 2. Query parameters override (for backwards compatibility & deep linking)
      if (urlMode && ['templates', 'components', 'sections', 'immersive', 'all'].includes(urlMode)) {
        setModeFilter(urlMode);
      }
      if (urlMode === 'immersive' && urlCat && ['all', 'template', '3d_scene', 'section', 'background', 'gradient'].includes(urlCat)) {
        setSelectedImmersiveCategory(urlCat as ImmersiveCategory);
      } else if (urlCat) {
        setSelectedCategory(urlCat);
        if (['hero', 'features', 'pricing', 'testimonials', 'stats', 'cta', 'faq', 'footer', 'contact'].includes(urlCat)) {
          setModeFilter('sections');
        } else if (urlCat !== 'all') {
          setModeFilter('components');
        }
      }
      if (urlPlatform && ['all', 'framer', 'webflow', 'shopify', 'nextjs', 'react', 'astro', 'nuxt'].includes(urlPlatform)) {
        setSelectedPlatform(urlPlatform);
        setModeFilter('templates');
      }
      if (urlQ) {
        setSearchQuery(urlQ);
      }
      if (urlComp) {
        const match = (componentsData as ComponentItem[]).find(
          (c) => c.id === urlComp || c.name.toLowerCase() === urlComp.toLowerCase()
        );
        if (match) setPreviewComponent(match);
      }
      if (urlPrompt) {
        import('./data/immersiveData.json').then((mod) => {
          const list = mod.default as ImmersiveItem[];
          setImmersiveItems(list);
          const match = list.find((p) => p.id === urlPrompt || p.title.toLowerCase() === urlPrompt.toLowerCase());
          if (match) {
            setSelectedImmersiveItem(match);
            setModeFilter('immersive');
          }
        });
      }
    } catch {
      // Ignore URL initialization errors
    }
  }, []);

  // Sync state to Clean Semantic URLs & dynamically update document title and meta description (pSEO & Virality)
  useEffect(() => {
    try {
      let basePath = '/';
      if (modeFilter === 'immersive') {
        const catSlugMap: Record<string, string> = {
          template: 'templates',
          '3d_scene': '3d-scenes',
          section: 'sections',
          background: 'backgrounds',
          gradient: 'gradients'
        };
        basePath = selectedImmersiveCategory !== 'all'
          ? `/prompts/${catSlugMap[selectedImmersiveCategory] || selectedImmersiveCategory}`
          : '/prompts';
      } else if (modeFilter === 'components') {
        basePath = selectedCategory !== 'all' ? `/components/${selectedCategory}` : '/components';
      } else if (modeFilter === 'sections') {
        basePath = selectedCategory !== 'all' ? `/sections/${selectedCategory}` : '/sections';
      } else if (modeFilter === 'templates') {
        basePath = selectedPlatform !== 'all' ? `/templates/${selectedPlatform}` : '/templates';
      }

      const params = new URLSearchParams();
      if (debouncedQuery) params.set('q', debouncedQuery);

      const searchStr = params.toString();
      const finalUrl = searchStr ? `${basePath}?${searchStr}` : basePath;
      window.history.replaceState({}, '', finalUrl);

      // Dynamic Title & Meta Description
      let dynamicTitle = 'Entele-Visuals — Animated Components, 28,047 Web Templates & 3D Prompts';
      let dynamicDescription = 'Entele-Visuals: 29,627 curated frontend resources. 897 interactive motion components, 28,047 web templates across Framer, Webflow, Shopify, Next.js, and 683 immersive 3D AI prompts.';

      if (modeFilter === 'immersive') {
        if (selectedImmersiveCategory === 'template') {
          dynamicTitle = 'Immersive Website Templates & Prompts — Entele-Visuals';
          dynamicDescription = 'Browse full-page immersive website prompts and 3D architectural blueprints for Cursor, Claude 3.7, and v0. Copy-ready WebGL and Tailwind setups.';
        } else if (selectedImmersiveCategory === '3d_scene') {
          dynamicTitle = '3D Scene Prompts & WebGL Shaders — Entele-Visuals';
          dynamicDescription = 'Interactive 3D WebGL scenes, Three.js shaders, and particle canvas prompts. 60fps GPU-accelerated blueprints for modern creative web development.';
        } else if (selectedImmersiveCategory === 'section') {
          dynamicTitle = 'Interactive Section Prompts — Entele-Visuals';
          dynamicDescription = 'Copy-ready AI prompts for dynamic interactive landing page sections, features, and experiential layouts with live video demonstrations.';
        } else if (selectedImmersiveCategory === 'background') {
          dynamicTitle = 'Animated Background Prompts & Shaders — Entele-Visuals';
          dynamicDescription = 'Discover mesmerizing animated background prompts, WebGL shader flows, and GPU particle effects for modern high-converting websites.';
        } else if (selectedImmersiveCategory === 'gradient') {
          dynamicTitle = 'Interactive WebGL Gradients & Canvas Prompts — Entele-Visuals';
          dynamicDescription = 'Dynamic color-shifting WebGL gradients and interactive canvas prompts designed for cutting-edge digital experiences.';
        } else {
          dynamicTitle = '683 Immersive Website Prompts & 3D Scenes — Entele-Visuals';
          dynamicDescription = 'Explore 683 immersive website prompts, 3D scenes, sections, backgrounds, and gradients. Optimized for Claude 3.7, Cursor, v0, and GPT-4o.';
        }
      } else if (modeFilter === 'components') {
        if (selectedCategory !== 'all') {
          const catObj = CATEGORIES.find((c) => c.id === selectedCategory);
          const catName = catObj?.label || selectedCategory;
          dynamicTitle = `${catName} Motion Components — Entele-Visuals`;
          dynamicDescription = `Free copy-paste ${catName.toLowerCase()} components with smooth React and Tailwind animations. MIT Licensed with live preview and code generator.`;
        } else {
          dynamicTitle = '897 Animated Motion Components for React & Tailwind — Entele-Visuals';
          dynamicDescription = 'Browse 897 interactive motion components for React, Framer Motion, and Tailwind CSS. Zero dependencies, instant code export, and live previews.';
        }
      } else if (modeFilter === 'sections') {
        if (selectedCategory !== 'all') {
          const catObj = CATEGORIES.find((c) => c.id === selectedCategory);
          const catName = catObj?.label || selectedCategory;
          dynamicTitle = `${catName} Landing Page Sections — Entele-Visuals`;
          dynamicDescription = `High-converting ${catName.toLowerCase()} section components for modern landing pages. Built with React and Tailwind CSS.`;
        } else {
          dynamicTitle = 'Landing Page Sections & Hero Components — Entele-Visuals';
          dynamicDescription = 'Production-ready landing page sections: heroes, feature grids, pricing tables, testimonials, and CTAs for modern web apps.';
        }
      } else if (modeFilter === 'templates') {
        if (selectedPlatform !== 'all') {
          const pName = selectedPlatform.charAt(0).toUpperCase() + selectedPlatform.slice(1);
          dynamicTitle = `${pName} Website Templates (${pName === 'Framer' ? '12,000+' : pName === 'Webflow' ? '10,000+' : '4,000+'}) — Entele-Visuals`;
          dynamicDescription = `Discover thousands of verified ${pName} website templates. Free and premium modern responsive designs for portfolios, SaaS, and businesses.`;
        } else {
          dynamicTitle = '28,047 Web Templates Across Framer, Webflow, Shopify & Next.js — Entele-Visuals';
          dynamicDescription = 'Directory of 28,047 verified website templates. Filter by Framer, Webflow, Shopify, Next.js, and React with live iframe previews.';
        }
      }

      document.title = dynamicTitle;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', dynamicDescription);
    } catch {
      // Ignore history API errors
    }
  }, [modeFilter, selectedCategory, selectedPlatform, selectedImmersiveCategory, debouncedQuery]);

  // Cast JSON data to ComponentItem array (897 components in exact catalog order)
  const allComponents = useMemo(() => componentsData as ComponentItem[], []);

  // Section categories set
  const sectionCategoryIds = useMemo(
    () =>
      new Set([
        'hero',
        'features',
        'pricing',
        'testimonials',
        'stats',
        'cta',
        'faq',
        'footer',
        'contact',
      ]),
    []
  );

  // Load templates data with pagination and search
  const loadTemplatesData = useCallback(
    async (reset: boolean = false) => {
      if (isLoadingTemplates) return;

      const currentOffset = reset ? 0 : templatesOffset;
      setIsLoadingTemplates(true);

      try {
        const res = await fetchTemplates({
          platform: selectedPlatform,
          onlyFree: onlyFreeTemplates,
          category: templateNiche,
          query: debouncedQuery,
          limit: 36,
          offset: currentOffset,
        });

        if (reset) {
          setTemplates(res.items);
          setTemplatesOffset(res.items.length);
        } else {
          setTemplates((prev) => [...prev, ...res.items]);
          setTemplatesOffset((prev) => prev + res.items.length);
        }

        setTemplatesTotal(res.total);
        setHasMoreTemplates(res.hasMore);
      } catch (err) {
        console.error('Failed to load templates:', err);
      } finally {
        setIsLoadingTemplates(false);
      }
    },
    [
      isLoadingTemplates,
      templatesOffset,
      selectedPlatform,
      onlyFreeTemplates,
      templateNiche,
      debouncedQuery,
    ]
  );

  // Re-fetch when template filters or mode change
  useEffect(() => {
    if (modeFilter === 'templates' || modeFilter === 'all') {
      loadTemplatesData(true);
    }
  }, [modeFilter, selectedPlatform, onlyFreeTemplates, templateNiche, debouncedQuery]);

  // IntersectionObserver for auto infinite scroll on templates
  useEffect(() => {
    if (!sentinelRef.current || !hasMoreTemplates || isLoadingTemplates) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMoreTemplates && !isLoadingTemplates) {
          loadTemplatesData(false);
        }
      },
      { rootMargin: '400px 0px' }
    );

    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [hasMoreTemplates, isLoadingTemplates, loadTemplatesData]);

  // Filtered and sorted motion components
  const filteredComponents = useMemo(() => {
    let result = allComponents;

    // Filter by Mode (Components vs Sections)
    if (modeFilter === 'components') {
      result = result.filter((c) => !sectionCategoryIds.has(c.category));
    } else if (modeFilter === 'sections') {
      result = result.filter((c) => sectionCategoryIds.has(c.category));
    }

    // Filter by Category
    if (selectedCategory !== 'all') {
      result = result.filter((c) => c.category === selectedCategory);
    }

    // Filter by Search Query
    if (debouncedQuery.trim() !== '') {
      const q = debouncedQuery.toLowerCase().trim();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.displayName.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Sort Components
    switch (sortBy) {
      case 'featured':
        result = [...result].sort((a, b) => (b.copyCount || 0) - (a.copyCount || 0));
        break;
      case 'popular':
        result = [...result].sort((a, b) => (b.views || 0) - (a.views || 0));
        break;
      case 'newest':
        result = [...result].sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return dateB - dateA;
        });
        break;
      case 'alphabetical':
        result = [...result].sort((a, b) => a.displayName.localeCompare(b.displayName));
        break;
      case 'default':
      default:
        break;
    }

    return result;
  }, [allComponents, modeFilter, selectedCategory, debouncedQuery, sortBy, sectionCategoryIds]);

  const visibleComponents = useMemo(() => {
    return filteredComponents.slice(0, displayCount);
  }, [filteredComponents, displayCount]);

  const hasMoreComponents = displayCount < filteredComponents.length;

  const handleLoadMoreComponents = () => {
    setDisplayCount((prev) => prev + 36);
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setDisplayCount(36);
  };

  const handleModeChange = (mode: ModeFilter) => {
    setModeFilter(mode);
    setSelectedCategory('all');
    setDisplayCount(36);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setDisplayCount(36);
  };

  // Filtered and sorted Immersive items
  const filteredImmersiveItems = useMemo(() => {
    return immersiveItems
      .filter((item) => {
        // Category match
        if (selectedImmersiveCategory !== 'all' && item.category !== selectedImmersiveCategory) {
          return false;
        }
        // Tier match
        if (selectedImmersiveTier !== 'all' && item.tier !== selectedImmersiveTier) {
          return false;
        }
        // Search match
        if (debouncedQuery.trim() !== '') {
          const q = debouncedQuery.toLowerCase().trim();
          const matchTitle = item.title.toLowerCase().includes(q);
          const matchDesc = item.description.toLowerCase().includes(q);
          const matchTags = item.tags.some((t) => t.toLowerCase().includes(q));
          const matchStack = item.stack.some((s) => s.toLowerCase().includes(q));
          const matchMood = item.mood.some((m) => m.toLowerCase().includes(q));
          const matchKeywords = item.keywords.some((k) => k.toLowerCase().includes(q));
          if (!matchTitle && !matchDesc && !matchTags && !matchStack && !matchMood && !matchKeywords) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (selectedImmersiveSort === 'popular') {
          return (b.likes || 0) - (a.likes || 0);
        }
        if (selectedImmersiveSort === 'newest') {
          return b.id.localeCompare(a.id);
        }
        if (selectedImmersiveSort === 'alphabetical') {
          return a.title.localeCompare(b.title);
        }
        return 0;
      });
  }, [immersiveItems, selectedImmersiveCategory, selectedImmersiveTier, debouncedQuery, selectedImmersiveSort]);

  const visibleImmersiveItems = useMemo(() => {
    return filteredImmersiveItems.slice(0, immersiveDisplayCount);
  }, [filteredImmersiveItems, immersiveDisplayCount]);

  const hasMoreImmersive = immersiveDisplayCount < filteredImmersiveItems.length;

  const handleLoadMoreImmersive = () => {
    setImmersiveDisplayCount((prev) => prev + 36);
  };

  const activeCategoryLabel = useMemo(() => {
    if (modeFilter === 'immersive') {
      const meta = IMMERSIVE_CATEGORIES.find((c) => c.key === selectedImmersiveCategory);
      return meta ? meta.label : 'Immersive Prompts';
    }
    if (selectedCategory === 'all') {
      if (modeFilter === 'sections') return 'All Landing Sections';
      if (modeFilter === 'components') return 'All Motion Components';
      if (modeFilter === 'templates') return 'All Web Templates';
      return 'All Catalog Items';
    }
    const cat = CATEGORIES.find((c) => c.id === selectedCategory);
    return cat ? cat.label : selectedCategory;
  }, [selectedCategory, modeFilter, selectedImmersiveCategory]);

  const totalComponentsCount = useMemo(
    () => allComponents.filter((c) => !sectionCategoryIds.has(c.category)).length,
    [allComponents, sectionCategoryIds]
  );

  const totalSectionsCount = useMemo(
    () => allComponents.filter((c) => sectionCategoryIds.has(c.category)).length,
    [allComponents, sectionCategoryIds]
  );

  const totalCatalogItems =
    modeFilter === 'templates'
      ? templatesTotal
      : modeFilter === 'immersive'
      ? filteredImmersiveItems.length
      : modeFilter === 'components'
      ? totalComponentsCount
      : modeFilter === 'sections'
      ? totalSectionsCount
      : filteredComponents.length + templatesTotal + 683;

  return (
    <div className="min-h-screen bg-[#09090b] text-foreground flex flex-col lg:flex-row antialiased selection:bg-white/20 selection:text-white pb-20 lg:pb-0">
      {/* Offline Toast Banner */}
      {!isOnline && (
        <div className="fixed top-0 inset-x-0 z-50 bg-neutral-900 border-b border-white/10 px-4 py-1.5 text-center text-xs text-neutral-300 flex items-center justify-center gap-2">
          <WifiOff className="size-3.5 text-neutral-400" />
          <span>Offline mode active — browsing cached library.</span>
        </div>
      )}

      {/* Entele-Visuals Left Navigation Sidebar */}
      <Sidebar
        categories={CATEGORIES}
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategoryChange}
        modeFilter={modeFilter}
        onSelectMode={handleModeChange}
        selectedPlatform={selectedPlatform}
        onSelectPlatform={setSelectedPlatform}
        selectedImmersiveCategory={selectedImmersiveCategory}
        onSelectImmersiveCategory={(cat) => {
          setSelectedImmersiveCategory(cat);
          setModeFilter('immersive');
          setImmersiveDisplayCount(36);
        }}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        totalComponentsCount={totalComponentsCount}
        totalSectionsCount={totalSectionsCount}
        totalImmersiveCount={683}
        onOpenMcpModal={() => setIsMcpModalOpen(true)}
        isOpenMobile={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Content Viewport */}
      <div className="flex-1 min-w-0 flex flex-col min-h-screen">
        {/* Sticky Command Top Bar */}
        <TopBar
          totalCount={totalCatalogItems}
          selectedCategoryLabel={activeCategoryLabel}
          selectedCategory={selectedCategory}
          onClearCategory={() => {
            setSelectedCategory('all');
            setSelectedImmersiveCategory('all');
            setTemplateNiche('all');
            setSelectedPlatform('all');
          }}
          searchQuery={searchQuery}
          onClearSearch={() => setSearchQuery('')}
          sortBy={sortBy}
          onSortChange={setSortBy}
          onOpenMcpModal={() => setIsMcpModalOpen(true)}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        />

        {/* View Switcher based on modeFilter */}
        {modeFilter === 'immersive' ? (
          /* Immersive Website Prompts View */
          <main className="flex-1 flex flex-col px-3.5 sm:px-6 lg:px-8 py-5">
            <ImmersiveHero
              selectedCategory={selectedImmersiveCategory}
              onSelectCategory={(cat) => {
                setSelectedImmersiveCategory(cat);
                setImmersiveDisplayCount(36);
              }}
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
              selectedTier={selectedImmersiveTier}
              onTierChange={setSelectedImmersiveTier}
              sortBy={selectedImmersiveSort}
              onSortChange={setSelectedImmersiveSort}
              totalResults={filteredImmersiveItems.length}
            />

            {isLoadingImmersive ? (
              <div className="py-24 flex flex-col items-center justify-center text-center">
                <Loader2 className="w-8 h-8 animate-spin text-white mb-3" />
                <p className="text-xs font-mono text-neutral-400">Loading 683 immersive prompts…</p>
              </div>
            ) : visibleImmersiveItems.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3">
                  {visibleImmersiveItems.map((item) => (
                    <ImmersiveCard
                      key={item.id}
                      item={item}
                      onSelect={(it) => setSelectedImmersiveItem(it)}
                      onCopyPrompt={() => {
                        // Prompt copied
                      }}
                    />
                  ))}
                </div>

                {/* Load More Button */}
                {hasMoreImmersive && (
                  <div className="mt-8 mb-12 flex flex-col items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={handleLoadMoreImmersive}
                      className="ui-press flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/10 border border-white/[0.08] text-xs font-semibold text-white transition-all shadow-sm group"
                    >
                      <span>
                        Load More ({visibleImmersiveItems.length} of {filteredImmersiveItems.length})
                      </span>
                      <ArrowDown className="size-3.5 text-neutral-400 group-hover:text-white transition-transform group-hover:translate-y-0.5" />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="py-24 text-center flex flex-col items-center justify-center">
                <div className="size-12 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-neutral-400 mb-3 shadow-inner">
                  <SearchX className="size-6" />
                </div>
                <h3 className="text-sm font-medium text-white mb-1">No immersive prompts found</h3>
                <p className="text-xs text-neutral-400 max-w-sm mb-4">
                  No items matching your current criteria. Try resetting search or choosing another category.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedImmersiveCategory('all');
                    setSelectedImmersiveTier('all');
                  }}
                  className="ui-press px-4 py-1.5 rounded-lg bg-white text-black text-xs font-semibold hover:bg-neutral-200 transition-colors"
                >
                  Reset filters
                </button>
              </div>
            )}
          </main>
        ) : modeFilter === 'templates' ? (
          /* Templates Mode View */
          <main className="flex-1 flex flex-col">
            {/* Templens Hero */}
            <TemplensHero
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
              selectedPlatform={selectedPlatform}
              onSelectPlatform={setSelectedPlatform}
              onlyFree={onlyFreeTemplates}
              onToggleFree={() => setOnlyFreeTemplates((prev) => !prev)}
              selectedCategory={templateNiche}
              onSelectCategory={setTemplateNiche}
            />

            {/* Templates Grid Container */}
            <div className="px-3.5 sm:px-6 lg:px-8 py-5 flex-1">
              {templates.length > 0 ? (
                <>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs text-neutral-400 font-mono">
                      Showing {templates.length} of {templatesTotal.toLocaleString()} templates
                    </p>
                    <span className="text-xs text-neutral-500 hidden sm:inline font-mono">
                      Exact Templens sequence
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3">
                    {templates.map((tpl) => (
                      <TemplateCard
                        key={tpl.id}
                        template={tpl}
                        onPreview={(t) => setSelectedTemplate(t)}
                      />
                    ))}
                  </div>

                  {/* Auto-Scroll Sentinel & Load Trigger */}
                  <div ref={sentinelRef} className="h-10 mt-6 flex items-center justify-center">
                    {isLoadingTemplates && (
                      <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                        <Loader2 className="size-4 animate-spin text-white" />
                        <span>Loading more templates…</span>
                      </div>
                    )}
                  </div>

                  {/* Fallback Manual Load More Button */}
                  {hasMoreTemplates && !isLoadingTemplates && (
                    <div className="mt-4 mb-12 flex flex-col items-center justify-center">
                      <button
                        type="button"
                        onClick={() => loadTemplatesData(false)}
                        className="ui-press flex items-center gap-2 px-6 py-2 rounded-lg bg-white/[0.04] hover:bg-white/10 border border-white/[0.08] text-xs font-medium text-neutral-300 hover:text-white transition-all shadow-sm group"
                      >
                        <span>Load Next Batch ({templates.length} / {templatesTotal.toLocaleString()})</span>
                        <ArrowDown className="size-3 text-neutral-400 group-hover:text-white transition-transform group-hover:translate-y-0.5" />
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="py-24 text-center flex flex-col items-center justify-center">
                  <div className="size-12 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-neutral-400 mb-3 shadow-inner">
                    <SearchX className="size-6" />
                  </div>
                  <h3 className="text-sm font-medium text-white mb-1">No templates found</h3>
                  <p className="text-xs text-neutral-400 max-w-sm mb-4">
                    No website templates matching your current filter. Try resetting search or platform choice.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedPlatform('all');
                      setOnlyFreeTemplates(false);
                      setTemplateNiche('all');
                    }}
                    className="ui-press px-4 py-1.5 rounded-lg bg-white text-black text-xs font-semibold hover:bg-neutral-200 transition-colors"
                  >
                    Reset filters
                  </button>
                </div>
              )}
            </div>
          </main>
        ) : (
          /* Components / Sections Mode View */
          <main className="flex-1 px-3.5 sm:px-6 lg:px-8 py-5">
            {visibleComponents.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3">
                  {visibleComponents.map((component) => (
                    <ComponentCard
                      key={component.id}
                      component={component}
                      onPreview={(c) => setPreviewComponent(c)}
                      onOpenCode={(c) => setCodeComponent(c)}
                    />
                  ))}
                </div>

                {/* Load More Pagination */}
                {hasMoreComponents && (
                  <div className="mt-8 mb-12 flex flex-col items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={handleLoadMoreComponents}
                      className="ui-press flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/10 border border-white/[0.08] text-xs font-semibold text-white transition-all shadow-sm group"
                    >
                      <span>
                        Load More ({visibleComponents.length} of {filteredComponents.length})
                      </span>
                      <ArrowDown className="size-3.5 text-neutral-400 group-hover:text-white transition-transform group-hover:translate-y-0.5" />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="py-24 text-center flex flex-col items-center justify-center">
                <div className="size-12 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-neutral-400 mb-3 shadow-inner">
                  <SearchX className="size-6" />
                </div>
                <h3 className="text-sm font-medium text-white mb-1">No components found</h3>
                <p className="text-xs text-neutral-400 max-w-sm mb-4">
                  No components matching your filter criteria. Try resetting your search or category choice.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchQuery('');
                  }}
                  className="ui-press px-4 py-1.5 rounded-lg bg-white text-black text-xs font-semibold hover:bg-neutral-200 transition-colors"
                >
                  Reset filters
                </button>
              </div>
            )}
          </main>
        )}
      </div>

      {/* Mobile Bottom Quick Switcher Bar */}
      <div className="fixed bottom-3 inset-x-3 z-40 lg:hidden flex items-center justify-around rounded-xl border border-white/[0.12] bg-[#0c0c0e]/95 backdrop-blur-2xl p-1 shadow-2xl">
        <button
          type="button"
          onClick={() => handleModeChange('templates')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg text-[10px] font-medium transition-all ${
            modeFilter === 'templates'
              ? 'bg-white/15 text-white font-semibold'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Globe className="size-4" />
          <span>Templates</span>
        </button>

        <button
          type="button"
          onClick={() => handleModeChange('immersive')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg text-[10px] font-medium transition-all ${
            modeFilter === 'immersive'
              ? 'bg-white/15 text-white font-semibold'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Sparkles className="size-4" />
          <span>Prompts</span>
        </button>

        <button
          type="button"
          onClick={() => handleModeChange('components')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg text-[10px] font-medium transition-all ${
            modeFilter === 'components'
              ? 'bg-white/15 text-white font-semibold'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <ComponentIcon className="size-4" />
          <span>Components</span>
        </button>

        <button
          type="button"
          onClick={() => handleModeChange('sections')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg text-[10px] font-medium transition-all ${
            modeFilter === 'sections'
              ? 'bg-white/15 text-white font-semibold'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Layers className="size-4" />
          <span>Sections</span>
        </button>

        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(true)}
          className="flex flex-col items-center gap-1 py-1 px-3 rounded-lg text-[10px] font-medium text-neutral-400 hover:text-white"
        >
          <SlidersHorizontal className="size-4" />
          <span>Filters</span>
        </button>
      </div>

      {/* Live Stage Preview Modal */}
      <GalleryPreviewModal
        component={previewComponent}
        allComponents={filteredComponents}
        onSelectComponent={(c) => setPreviewComponent(c)}
        onClose={() => setPreviewComponent(null)}
        onOpenCode={(c) => {
          setPreviewComponent(null);
          setCodeComponent(c);
        }}
      />

      {/* Detailed Code & Integration Modal */}
      <ComponentModal
        component={codeComponent}
        onClose={() => setCodeComponent(null)}
      />

      {/* Templens Live Template Preview Modal */}
      <TemplatePreviewModal
        template={selectedTemplate}
        onClose={() => setSelectedTemplate(null)}
      />

      {/* Immersive 3D & Prompt Modal */}
      <ImmersiveModal
        item={selectedImmersiveItem}
        onClose={() => setSelectedImmersiveItem(null)}
      />

      {/* MCP Integration Setup Guide Modal */}
      <McpIntegrationModal
        isOpen={isMcpModalOpen}
        onClose={() => setIsMcpModalOpen(false)}
      />
    </div>
  );
};

export default App;
