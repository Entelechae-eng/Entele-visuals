import React, { useState } from 'react';
import { X, Copy, Check, Terminal, Cpu, Bot, Sparkles } from 'lucide-react';

interface McpIntegrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const McpIntegrationModal: React.FC<McpIntegrationModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copySnippet = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const mcpConfig = `{
  "mcpServers": {
    "entele-visuals": {
      "url": "https://mcp.entele-visuals.dev/v1",
      "transport": "http",
      "headers": {
        "Authorization": "Bearer ev_live_your_key_here"
      }
    }
  }
}`;

  const promptExample = `Browse the Entele-Visuals catalog and add the "glimmer-vale" background animation to my hero section in React with Tailwind CSS.`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="relative w-full max-w-2xl bg-card border border-stroke rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2d2f30] bg-card-body">
          <div className="flex items-center gap-2.5">
            <div className="size-8 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center text-white">
              <Bot className="size-4 text-white" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">Model Context Protocol (MCP) Setup</h3>
              <p className="text-xs text-muted">Direct AI Agent Integration for Antigravity, Claude, and Cursor</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex size-8 items-center justify-center rounded-lg text-muted hover:text-white hover:bg-elevated transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6 text-sm text-neutral-300">
          <div>
            <h4 className="text-xs font-mono text-muted uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Cpu className="size-3.5 text-muted" /> 1. Add to your AI Agent Configuration (mcp.json)
            </h4>
            <div className="relative rounded-xl border border-stroke bg-[#0a0a0b] p-4 font-mono text-xs text-foreground overflow-x-auto">
              <button
                onClick={() => copySnippet(mcpConfig, 'config')}
                className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-md bg-elevated hover:bg-[#383a3c] border border-stroke text-xs text-muted hover:text-white transition-colors"
              >
                {copiedKey === 'config' ? (
                  <>
                    <Check className="size-3 text-white" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="size-3" />
                    <span>Copy JSON</span>
                  </>
                )}
              </button>
              <pre className="text-xs leading-relaxed text-neutral-300">
                <code>{mcpConfig}</code>
              </pre>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-mono text-muted uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Terminal className="size-3.5 text-muted" /> 2. Example Prompt
            </h4>
            <div className="relative rounded-xl border border-stroke bg-[#0a0a0b] p-4 font-mono text-xs text-neutral-300 flex items-center justify-between gap-3">
              <p className="italic text-foreground">"{promptExample}"</p>
              <button
                onClick={() => copySnippet(promptExample, 'prompt')}
                className="shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-md bg-elevated hover:bg-[#383a3c] border border-stroke text-xs text-muted hover:text-white transition-colors"
              >
                {copiedKey === 'prompt' ? (
                  <>
                    <Check className="size-3 text-white" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="size-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="rounded-xl border border-[#2d2f30] bg-card-body/60 p-4 space-y-2">
            <h5 className="text-xs font-semibold text-white flex items-center gap-1.5">
              <Sparkles className="size-3.5 text-emerald-400" /> MCP Capabilities
            </h5>
            <ul className="text-xs text-muted space-y-1.5 list-disc list-inside">
              <li><strong className="text-white">originkit_browse</strong>: Search & filter the entire 897 animated component catalog.</li>
              <li><strong className="text-white">originkit_get</strong>: Instantly fetch verified component code for React, Next.js, Vite, and Framer.</li>
              <li><strong className="text-white">Zero friction</strong>: Your agent writes and injects components directly into your codebase.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
