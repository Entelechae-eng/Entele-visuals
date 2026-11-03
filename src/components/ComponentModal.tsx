import React, { useState } from 'react';
import { ComponentItem, Framework, Styling } from '../types';
import { generateComponentCode } from '../utils/codeGenerator';
import {
  X,
  Copy,
  Check,
  Terminal,
  Code2,
  Bot,
  Layers,
  Sparkles,
  Link2,
  Share2
} from 'lucide-react';

interface ComponentModalProps {
  component: ComponentItem | null;
  onClose: () => void;
}

export const ComponentModal: React.FC<ComponentModalProps> = ({ component, onClose }) => {
  if (!component) return null;

  const [framework, setFramework] = useState<Framework>('react');
  const [styling, setStyling] = useState<Styling>('tailwind');
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedInstall, setCopiedInstall] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const componentUrl = `https://entele-visuals.vercel.app/components?component=${encodeURIComponent(component.name)}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(componentUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleShareX = () => {
    const tweetText = `Check out "${component.displayName}" on Entele-Visuals — free copy-paste React & Tailwind component:`;
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(componentUrl)}&hashtags=react,tailwind,webdev`;
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  const generatedCode = generateComponentCode(component, framework, styling);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyInstall = () => {
    navigator.clipboard.writeText(component.installSnippet);
    setCopiedInstall(true);
    setTimeout(() => setCopiedInstall(false), 2000);
  };

  const mcpPromptText = `Use Entele-Visuals / OriginKit to fetch component "${component.name}" for ${framework} with ${styling}.`;

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(mcpPromptText);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${component.displayName} code export`}
      className="fixed inset-0 z-[250] flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="relative w-full max-w-5xl bg-card border border-stroke rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2d2f30] bg-card-body">
          <div className="flex items-center gap-3">
            <span className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-mono font-medium text-foreground">
              {component.categoryLabel}
            </span>
            <h2 className="text-lg font-semibold text-white tracking-tight">
              {component.displayName}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleShareX}
              title="Share on X / Twitter"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-medium text-neutral-300 hover:text-white transition-colors"
            >
              <Share2 className="size-3.5" />
              <span>Share</span>
            </button>
            <button
              onClick={handleCopyLink}
              title="Copy direct shareable link"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-medium text-neutral-300 hover:text-white transition-colors"
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
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="flex size-8 items-center justify-center rounded-lg text-muted hover:text-white hover:bg-elevated transition-colors"
            >
              <X className="size-5" />
            </button>
          </div>
        </div>

        {/* Modal Body - 2 Columns on desktop */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-[#2d2f30]">
          {/* Left Column: Visual Preview & Details */}
          <div className="lg:col-span-5 p-6 flex flex-col gap-6 bg-card-body/60">
            {/* Visual Media */}
            <div className="rounded-xl overflow-hidden border border-stroke bg-black aspect-video relative shadow-inner">
              {component.galleryMedia ? (
                <video
                  src={component.galleryMedia}
                  poster={component.galleryPoster}
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                  className="size-full object-cover"
                />
              ) : (
                <img
                  src={component.galleryPoster}
                  alt={component.displayName}
                  className="size-full object-cover"
                />
              )}
            </div>

            {/* Description & Metadata */}
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-mono text-muted uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Layers className="size-3.5 text-muted" /> Description
                </h4>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  {component.description}
                </p>
              </div>

              {/* Install CLI */}
              <div>
                <h4 className="text-xs font-mono text-muted uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Terminal className="size-3.5 text-muted" /> CLI Installation
                </h4>
                <div className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-bg border border-stroke font-mono text-xs text-foreground">
                  <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                    <span className="text-white font-bold">$</span>
                    <span className="truncate">{component.installSnippet}</span>
                  </div>
                  <button
                    onClick={handleCopyInstall}
                    className="flex size-7 shrink-0 items-center justify-center rounded bg-elevated text-muted hover:text-white transition-colors"
                    title="Copy command"
                  >
                    {copiedInstall ? (
                      <Check className="size-3.5 text-white" />
                    ) : (
                      <Copy className="size-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* AI Assistant MCP Prompt */}
              <div>
                <h4 className="text-xs font-mono text-muted uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Bot className="size-3.5 text-white" /> AI Agent / MCP Instruction
                </h4>
                <div className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-bg border border-stroke font-mono text-xs text-neutral-300">
                  <span className="truncate">{mcpPromptText}</span>
                  <button
                    onClick={handleCopyPrompt}
                    className="flex size-7 shrink-0 items-center justify-center rounded bg-elevated text-muted hover:text-white transition-colors"
                    title="Copy prompt"
                  >
                    {copiedPrompt ? (
                      <Check className="size-3.5 text-white" />
                    ) : (
                      <Copy className="size-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Tags */}
              <div>
                <h4 className="text-xs font-mono text-muted uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Sparkles className="size-3.5 text-muted" /> Tags & Taxonomy
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {component.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono px-2 py-0.5 rounded bg-bg border border-stroke/70 text-muted"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Code Generator & Export */}
          <div className="lg:col-span-7 flex flex-col bg-card">
            {/* Framework & Styling Selectors */}
            <div className="p-4 border-b border-[#2d2f30] flex flex-wrap items-center justify-between gap-3 bg-card-body/80">
              {/* Framework tabs */}
              <div className="flex items-center p-1 rounded-lg bg-bg border border-stroke text-xs">
                {(['react', 'nextjs', 'vite', 'framer'] as Framework[]).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFramework(f)}
                    className={`px-3 py-1 rounded-md capitalize transition-all font-medium ${
                      framework === f
                        ? 'bg-elevated text-white shadow-sm border border-stroke/70'
                        : 'text-muted hover:text-white'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>

              {/* Styling tabs (disabled for framer) */}
              {framework !== 'framer' && (
                <div className="flex items-center p-1 rounded-lg bg-bg border border-stroke text-xs">
                  {(['tailwind', 'css'] as Styling[]).map((s) => (
                    <button
                      key={s}
                      onClick={() => setStyling(s)}
                      className={`px-2.5 py-1 rounded-md uppercase font-mono text-[11px] transition-all ${
                        styling === s
                          ? 'bg-elevated text-white shadow-sm border border-stroke/70'
                          : 'text-muted hover:text-white'
                      }`}
                    >
                      {s === 'tailwind' ? 'Tailwind' : 'Pure CSS'}
                    </button>
                  ))}
                </div>
              )}

              {/* Copy Code button */}
              <button
                onClick={handleCopyCode}
                className="ui-press flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white hover:bg-neutral-200 text-black text-xs font-medium transition-colors shadow-sm"
              >
                {copiedCode ? (
                  <>
                    <Check className="size-3.5 text-black" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="size-3.5 text-black" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>

            {/* Code Block with line numbering feel */}
            <div className="flex-1 p-4 bg-[#0a0a0b] overflow-auto font-mono text-xs text-neutral-300 leading-relaxed min-h-[360px] max-h-[500px] border-b border-[#2d2f30]">
              <pre className="whitespace-pre">
                <code>{generatedCode}</code>
              </pre>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3 bg-card-body/50 flex items-center justify-between text-xs text-muted">
              <span className="flex items-center gap-1.5">
                <Code2 className="size-3.5 text-emerald-400" />
                Component: <code className="text-white font-mono">{component.name}.tsx</code>
              </span>
              <span className="font-mono text-[11px] text-muted/60">
                OriginKit Parity Engine
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
