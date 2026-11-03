import React, { useState, useRef, useEffect } from 'react';
import { ImmersiveItem } from '../types';
import {
  X,
  Copy,
  Check,
  Play,
  Pause,
  Monitor,
  Tablet,
  Smartphone,
  ExternalLink,
  Sparkles,
  Layers,
  Terminal,
  Cpu,
  Share2,
  Link2
} from 'lucide-react';

interface ImmersiveModalProps {
  item: ImmersiveItem | null;
  onClose: () => void;
}

type TabType = 'prompt' | 'specs' | 'instructions';
type ViewportType = 'desktop' | 'tablet' | 'mobile';

export const ImmersiveModal: React.FC<ImmersiveModalProps> = ({ item, onClose }) => {
  const [activeTab, setActiveTab] = useState<TabType>('prompt');
  const [viewport, setViewport] = useState<ViewportType>('desktop');
  const [copied, setCopied] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!item) return null;

  const itemUrl = `https://entele-visuals.vercel.app/prompts?prompt=${encodeURIComponent(item.id)}`;

  const handleCopy = (text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(itemUrl).then(() => {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
      });
    }
  };

  const handleShareX = () => {
    const tweetText = `Just discovered "${item.title}" on Entele-Visuals — 60fps 3D WebGL prompt ready for Claude 3.7, Cursor & v0:`;
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(itemUrl)}&hashtags=webdev,threejs,creativecoding,react`;
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }
  };

  const videoSource = item.posterVideo || item.posterVideoPreview;

  const getViewportWidth = () => {
    switch (viewport) {
      case 'mobile':
        return 'max-w-[390px]';
      case 'tablet':
        return 'max-w-[768px]';
      case 'desktop':
      default:
        return 'max-w-full';
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-6xl max-h-[92vh] flex flex-col bg-[#0d0d0d] border border-white/15 rounded-2xl overflow-hidden shadow-2xl shadow-black/80 text-foreground"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-[#0a0a0a]">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-md text-xs font-mono uppercase tracking-wider bg-white/10 text-white border border-white/10">
              {item.categoryLabel}
            </span>
            <h2 className="text-base sm:text-lg font-semibold text-white tracking-tight truncate max-w-md">
              {item.title}
            </h2>
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider uppercase ${
                item.tier === 'Free'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-white/10 text-neutral-300 border border-white/10'
              }`}
            >
              {item.tier}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Viewport Toggles (For Templates & 3D Scenes) */}
            <div className="hidden sm:flex items-center gap-1 bg-white/5 border border-white/10 p-1 rounded-lg">
              <button
                type="button"
                onClick={() => setViewport('desktop')}
                className={`p-1.5 rounded transition-colors ${
                  viewport === 'desktop' ? 'bg-white text-black' : 'text-neutral-400 hover:text-white'
                }`}
                title="Desktop View"
              >
                <Monitor className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setViewport('tablet')}
                className={`p-1.5 rounded transition-colors ${
                  viewport === 'tablet' ? 'bg-white text-black' : 'text-neutral-400 hover:text-white'
                }`}
                title="Tablet View"
              >
                <Tablet className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setViewport('mobile')}
                className={`p-1.5 rounded transition-colors ${
                  viewport === 'mobile' ? 'bg-white text-black' : 'text-neutral-400 hover:text-white'
                }`}
                title="Mobile View"
              >
                <Smartphone className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Share and Copy Link buttons */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-neutral-300 hover:text-white transition-colors"
                title="Copy shareable direct link"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Link2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Copy Link</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleShareX}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-neutral-300 hover:text-white transition-colors"
                title="Share prompt on X / Twitter"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Share on X</span>
              </button>
            </div>

            <button
              onClick={onClose}
              type="button"
              className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Main Body (2 Columns on large screens) */}
        <div className="flex-grow overflow-y-auto grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
          {/* Left Column: Interactive Media Stage */}
          <div className="lg:col-span-7 p-4 sm:p-6 flex flex-col items-center justify-center bg-[#070707] relative min-h-[300px]">
            <div
              className={`w-full ${getViewportWidth()} transition-all duration-300 relative rounded-xl overflow-hidden border border-white/15 bg-black shadow-2xl flex items-center justify-center aspect-[16/10]`}
            >
              {videoSource ? (
                <video
                  ref={videoRef}
                  src={videoSource}
                  poster={item.image}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : item.image ? (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-neutral-500 font-mono text-sm">Media Preview Unavailable</div>
              )}

              {/* Video Play/Pause Overlay Controls */}
              {videoSource && (
                <button
                  type="button"
                  onClick={togglePlay}
                  className="absolute bottom-3 right-3 p-2 rounded-lg bg-black/60 backdrop-blur-md text-white/80 hover:text-white border border-white/10 hover:border-white/30 transition-all opacity-80 hover:opacity-100"
                  title={isPlaying ? 'Pause Preview' : 'Play Preview'}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                </button>
              )}
            </div>

            {/* Quick Caption */}
            <div className="w-full mt-4 flex items-center justify-between text-xs text-neutral-400 font-mono">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-neutral-300" />
                60fps GPU Hardware Accelerated
              </span>
              {item.image && (
                <a
                  href={item.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-white transition-colors"
                >
                  HD Poster <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>

          {/* Right Column: Prompt & Specifications */}
          <div className="lg:col-span-5 flex flex-col bg-[#0a0a0a]">
            {/* Tabs Header */}
            <div className="flex border-b border-white/10 px-4 pt-2 gap-2 bg-[#080808]">
              <button
                type="button"
                onClick={() => setActiveTab('prompt')}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium border-b-2 transition-all ${
                  activeTab === 'prompt'
                    ? 'border-white text-white'
                    : 'border-transparent text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                AI Prompt
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('specs')}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium border-b-2 transition-all ${
                  activeTab === 'specs'
                    ? 'border-white text-white'
                    : 'border-transparent text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <Cpu className="w-3.5 h-3.5" />
                Architecture & Stack
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('instructions')}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium border-b-2 transition-all ${
                  activeTab === 'instructions'
                    ? 'border-white text-white'
                    : 'border-transparent text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                Instructions
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-5 flex-grow overflow-y-auto space-y-4">
              {activeTab === 'prompt' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                        Copy-Ready AI Prompt
                      </h4>
                      <p className="text-[11px] text-neutral-500">
                        Compatible with Claude 3.7, Cursor, GPT-4o, v0, Lovable & Windsurf
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(item.prompt)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-black text-xs font-semibold hover:bg-neutral-200 transition-colors shadow-md active:scale-95"
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
                  </div>

                  {/* Code block with syntax styling */}
                  <div className="relative rounded-xl border border-white/10 bg-[#050505] p-4 text-xs font-mono text-neutral-300 leading-relaxed overflow-x-auto max-h-[360px] whitespace-pre-wrap select-all selection:bg-white/20">
                    {item.prompt}
                  </div>

                  <div className="p-3 rounded-lg bg-white/5 border border-white/5 text-[11px] text-neutral-400 space-y-1">
                    <p className="font-semibold text-neutral-200">💡 How to use with your AI assistant:</p>
                    <p>1. Copy this prompt and paste it into Cursor Composer (Ctrl+I) or Claude Code.</p>
                    <p>2. The assistant generates the full React + Next.js App Router code and installs required packages.</p>
                    <p>3. Swap brand assets, typography tokens, and deploy directly to Vercel.</p>
                  </div>
                </div>
              )}

              {activeTab === 'specs' && (
                <div className="space-y-4 text-xs">
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                      Core Concept & Description
                    </h4>
                    <p className="text-neutral-300 leading-relaxed bg-[#050505] p-3 rounded-lg border border-white/5">
                      {item.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                      <span className="text-[10px] font-mono uppercase text-neutral-400 block mb-1">
                        Tone & Aesthetic
                      </span>
                      <span className="font-semibold text-white capitalize">{item.tone}</span>
                    </div>
                    <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                      <span className="text-[10px] font-mono uppercase text-neutral-400 block mb-1">
                        Access Tier
                      </span>
                      <span className="font-semibold text-white">{item.tier}</span>
                    </div>
                  </div>

                  {item.stack && item.stack.length > 0 && (
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                        Tech Stack
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {item.stack.map((s) => (
                          <span
                            key={s}
                            className="px-2.5 py-1 rounded-md bg-white/10 text-neutral-200 font-mono text-[11px]"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {item.mood && item.mood.length > 0 && (
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                        Mood & Atmosphere
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {item.mood.map((m) => (
                          <span
                            key={m}
                            className="px-2.5 py-1 rounded-md bg-white/5 text-neutral-400 text-[11px]"
                          >
                            #{m}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {item.keywords && item.keywords.length > 0 && (
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                        Design Keywords
                      </h4>
                      <p className="text-neutral-400 font-mono text-[11px] leading-relaxed">
                        {item.keywords.join(', ')}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'instructions' && (
                <div className="space-y-3 text-xs text-neutral-300">
                  <div className="p-3.5 rounded-lg bg-white/5 border border-white/5 space-y-2">
                    <h5 className="font-semibold text-white text-sm">Step 1: Copy Prompt & Scaffold</h5>
                    <p className="text-neutral-400 leading-relaxed">
                      Copy the prompt above. In your terminal or IDE, initialize your Next.js project with Tailwind CSS and Three.js dependencies:
                    </p>
                    <pre className="p-2 rounded bg-black font-mono text-[11px] text-neutral-200 overflow-x-auto">
                      npx create-next-app@latest my-app --typescript --tailwind --eslint
                    </pre>
                  </div>

                  <div className="p-3.5 rounded-lg bg-white/5 border border-white/5 space-y-2">
                    <h5 className="font-semibold text-white text-sm">Step 2: Paste in Cursor or Claude</h5>
                    <p className="text-neutral-400 leading-relaxed">
                      Open Cursor Composer or Claude Code in your project root, paste the prompt, and let the model generate the component structure, WebGL shaders, and Framer Motion orchestrations.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-lg bg-white/5 border border-white/5 space-y-2">
                    <h5 className="font-semibold text-white text-sm">Step 3: Tune & Deploy</h5>
                    <p className="text-neutral-400 leading-relaxed">
                      Run <code className="text-white">npm run dev</code> to preview locally at 60fps. Make content substitutions, tweak particle counts and color ramps, then deploy with one click to Vercel.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Modal Actions */}
            <div className="p-4 border-t border-white/10 bg-[#080808] flex items-center justify-between">
              <span className="text-[11px] font-mono text-neutral-500">
                ID: {item.id} • Entelechae Immersive Vault
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-medium transition-colors"
                  title="Copy direct share link"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Link Copied!</span>
                    </>
                  ) : (
                    <>
                      <Link2 className="w-3.5 h-3.5" />
                      <span>Share</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => handleCopy(item.prompt)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white text-black text-xs font-semibold hover:bg-neutral-200 transition-colors shadow-lg active:scale-95"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Prompt Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy AI Prompt</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
