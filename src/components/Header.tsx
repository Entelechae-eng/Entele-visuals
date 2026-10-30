import React from 'react';
import { Terminal, Code2, Search, ExternalLink } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenMcpModal: () => void;
  totalCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  onOpenMcpModal,
  totalCount,
}) => {
  return (
    <header className="sticky top-0 z-40 border-b border-surface-border bg-background/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20 text-white font-bold text-lg">
            ⚡
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                ENTELE-VISUALS
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-mono font-medium rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                v1.0
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Motion & Visual Animated Component System
            </p>
          </div>
        </div>

        {/* Global Search */}
        <div className="flex-1 max-w-md relative hidden md:block">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder={`Search ${totalCount} components (e.g. fluid, galaxy, matrix, button)...`}
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-surface-elevated/80 border border-surface-border rounded-xl pl-10 pr-12 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/40 transition-all"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-surface rounded border border-surface-border pointer-events-none">
              /
            </kbd>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenMcpModal}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-elevated border border-blue-500/30 text-blue-300 hover:text-white hover:bg-blue-600/20 hover:border-blue-500/60 text-xs font-medium transition-all shadow-sm"
            title="Connect with AI Agents (Antigravity, Claude, Cursor)"
          >
            <Terminal className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden sm:inline">MCP Plugin</span>
          </button>

          <a
            href="https://github.com/ENTELECHAE"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface border border-surface-border text-slate-300 hover:text-white hover:bg-surface-elevated text-xs font-medium transition-all"
          >
            <Code2 className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">GitHub</span>
            <ExternalLink className="w-3 h-3 text-slate-500" />
          </a>
        </div>
      </div>
    </header>
  );
};
