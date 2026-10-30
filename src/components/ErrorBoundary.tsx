import { Component, ErrorInfo, ReactNode } from 'react';
import { RotateCcw, AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[Entele-Visuals Runtime Exception]:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] flex flex-col items-center justify-center p-6 text-center select-none">
          <div className="size-12 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center mb-4 shadow-2xl">
            <AlertTriangle className="size-5 text-neutral-300" />
          </div>
          <h1 className="text-base font-semibold text-white tracking-tight mb-1">
            Application Encountered an Exception
          </h1>
          <p className="text-xs text-neutral-400 max-w-sm mb-6 leading-relaxed">
            A component failed to render cleanly. You can reload the workspace or reset the local view state.
          </p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={this.handleReset}
              className="ui-press flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-xs font-semibold text-black hover:bg-neutral-200 transition-colors shadow-sm"
            >
              <RotateCcw className="size-3.5" />
              <span>Reload Workspace</span>
            </button>
            <button
              type="button"
              onClick={() => {
                localStorage.clear();
                window.location.href = '/';
              }}
              className="ui-press flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-medium text-neutral-300 hover:text-white hover:bg-white/[0.06] transition-colors"
            >
              <span>Clear Cache & Reset</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
