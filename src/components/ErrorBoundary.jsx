import { Component } from 'react';
import { Terminal, RefreshCw, Home, AlertTriangle } from 'lucide-react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      showDetails: false
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo
    });

    // Log to console in development
    if (import.meta.env.DEV) {
      console.error('Error caught by boundary:', error, errorInfo);
    }

    // In production, you could send to error tracking service
    // Example: logErrorToService(error, errorInfo);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      showDetails: false
    });
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  toggleDetails = () => {
    this.setState(prev => ({ showDetails: !prev.showDetails }));
  };

  render() {
    if (this.state.hasError) {
      const { error, errorInfo, showDetails } = this.state;

      return (
        <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center p-4">
          <div className="max-w-2xl w-full">
            {/* Terminal-style error display */}
            <div className="bg-zinc-900/50 backdrop-blur border border-zinc-800 rounded-lg overflow-hidden">
              {/* Terminal Header */}
              <div className="bg-zinc-900 border-b border-zinc-800 px-4 py-3 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <div className="flex items-center gap-2 ml-2">
                  <Terminal className="w-4 h-4 text-zinc-400" />
                  <span className="text-sm text-zinc-400 font-mono">error.log</span>
                </div>
              </div>

              {/* Terminal Body */}
              <div className="p-6 space-y-6">
                {/* Error Icon and Title */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <AlertTriangle className="w-6 h-6 text-red-400" />
                  </div>
                  <div className="flex-1">
                    <h1 className="text-2xl font-bold text-white mb-2">
                      Something went wrong
                    </h1>
                    <p className="text-zinc-400 leading-relaxed">
                      An unexpected error occurred while rendering this page.
                      Don't worry, your data is safe.
                    </p>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4">
                    <div className="flex items-start gap-2">
                      <span className="text-red-400 font-mono text-sm mt-0.5">❯</span>
                      <div className="flex-1">
                        <p className="text-red-400 font-mono text-sm break-all">
                          {error.toString()}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Stack Trace Toggle */}
                {import.meta.env.DEV && errorInfo && (
                  <div>
                    <button
                      onClick={this.toggleDetails}
                      className="text-sm text-zinc-400 hover:text-white transition-colors underline decoration-dotted mb-2"
                    >
                      {showDetails ? 'Hide' : 'Show'} technical details
                    </button>

                    {showDetails && (
                      <div className="bg-black/40 border border-zinc-800 rounded-lg p-4 overflow-auto max-h-64">
                        <pre className="text-xs text-zinc-400 font-mono whitespace-pre-wrap break-words">
                          {errorInfo.componentStack}
                        </pre>
                      </div>
                    )}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    onClick={this.handleReset}
                    className="flex items-center gap-2 px-4 py-2.5 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 hover:border-purple-500/50 rounded-lg text-purple-300 font-medium transition-all duration-200 group"
                  >
                    <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                    Try Again
                  </button>

                  <button
                    onClick={this.handleGoHome}
                    className="flex items-center gap-2 px-4 py-2.5 bg-zinc-800/50 hover:bg-zinc-800 border border-zinc-700 hover:border-zinc-600 rounded-lg text-zinc-300 hover:text-white font-medium transition-all duration-200"
                  >
                    <Home className="w-4 h-4" />
                    Go Home
                  </button>

                  <button
                    onClick={() => window.location.reload()}
                    className="flex items-center gap-2 px-4 py-2.5 bg-zinc-800/50 hover:bg-zinc-800 border border-zinc-700 hover:border-zinc-600 rounded-lg text-zinc-300 hover:text-white font-medium transition-all duration-200"
                  >
                    Reload Page
                  </button>
                </div>

                {/* Help Text */}
                <div className="pt-4 border-t border-zinc-800">
                  <p className="text-sm text-zinc-500">
                    If this problem persists, please contact{' '}
                    <a
                      href="mailto:elad.ser@gmail.com"
                      className="text-purple-400 hover:text-purple-300 underline decoration-dotted transition-colors"
                    >
                      elad.ser@gmail.com
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Footer hint */}
            <div className="mt-4 text-center">
              <p className="text-xs text-zinc-600 font-mono">
                Error boundary active • Version {import.meta.env.VITE_APP_VERSION || '2.0.0'}
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
