import { useState } from 'react';
import { m } from 'framer-motion';
import { Check, Copy, Play } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

/**
 * CodeShowcase - Display code with syntax highlighting, copy functionality, and optional live demo
 *
 * Features:
 * - Syntax highlighting for C#, JavaScript, TypeScript, etc.
 * - Copy to clipboard
 * - Line highlighting
 * - Optional live demo link/iframe
 * - File tabs for multiple code files
 *
 * Usage:
 * <CodeShowcase
 *   title="Debug Dashboard Setup"
 *   files={[
 *     { name: 'Program.cs', language: 'csharp', code: '...' },
 *     { name: 'appsettings.json', language: 'json', code: '...' }
 *   ]}
 *   highlightLines={[3, 4]}
 *   demoUrl="https://example.com/demo"
 * />
 */

const CodeShowcase = ({
  isDark = true,
  title,
  description,
  files = [],
  highlightLines = [],
  demoUrl,
  demoComponent
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);

  const activeFile = files[activeTab] || files[0];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(activeFile.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Custom style for syntax highlighter to match dark theme
  const customStyle = {
    ...vscDarkPlus,
    'pre[class*="language-"]': {
      ...vscDarkPlus['pre[class*="language-"]'],
      background: 'transparent',
      margin: 0,
      padding: '1rem',
      fontSize: '0.875rem',
      lineHeight: '1.5',
    },
    'code[class*="language-"]': {
      ...vscDarkPlus['code[class*="language-"]'],
      background: 'transparent',
      fontSize: '0.875rem',
    },
  };

  return (
    <div
      className={`rounded-xl border overflow-hidden ${
        isDark ? 'bg-white/[0.02] border-white/10' : 'bg-black/[0.02] border-black/10'
      }`}
    >
      {/* Header */}
      <div className={`px-6 py-4 border-b ${isDark ? 'border-white/10' : 'border-black/10'}`}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className={`text-lg font-semibold mb-1 ${isDark ? 'text-white' : 'text-zinc-900'}`}>
              {title}
            </h3>
            {description && (
              <p className={`text-sm ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                {description}
              </p>
            )}
          </div>
          <div className="flex gap-2">
            {demoUrl && (
              <a
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  isDark
                    ? 'bg-purple-500/10 text-purple-400 hover:bg-purple-500/20'
                    : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                }`}
              >
                <Play size={14} aria-hidden="true" />
                Demo
              </a>
            )}
          </div>
        </div>
      </div>

      {/* File Tabs */}
      {files.length > 1 && (
        <div className={`flex gap-1 px-4 pt-3 border-b ${isDark ? 'border-white/10' : 'border-black/10'}`}>
          {files.map((file, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-4 py-2 text-sm font-mono rounded-t-lg transition-colors ${
                activeTab === index
                  ? isDark
                    ? 'bg-white/[0.05] text-white border-t border-x border-white/10'
                    : 'bg-black/[0.05] text-zinc-900 border-t border-x border-black/10'
                  : isDark
                  ? 'text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.02]'
                  : 'text-zinc-500 hover:text-zinc-700 hover:bg-black/[0.02]'
              }`}
            >
              {file.name}
            </button>
          ))}
        </div>
      )}

      {/* Code Block */}
      <div className="relative">
        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className={`absolute top-3 right-3 z-10 flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
            copied
              ? isDark
                ? 'bg-green-500/20 text-green-400'
                : 'bg-green-100 text-green-700'
              : isDark
              ? 'bg-white/[0.05] text-zinc-400 hover:bg-white/[0.1] hover:text-white'
              : 'bg-black/[0.05] text-zinc-600 hover:bg-black/[0.1] hover:text-zinc-900'
          }`}
          aria-label={copied ? 'Copied!' : 'Copy code'}
        >
          {copied ? (
            <>
              <Check size={14} aria-hidden="true" />
              Copied!
            </>
          ) : (
            <>
              <Copy size={14} aria-hidden="true" />
              Copy
            </>
          )}
        </button>

        {/* Syntax Highlighted Code */}
        <div className={`overflow-x-auto ${isDark ? 'bg-[#1e1e1e]' : 'bg-zinc-50'}`}>
          <SyntaxHighlighter
            language={activeFile.language || 'javascript'}
            style={customStyle}
            showLineNumbers={true}
            wrapLines={true}
            lineProps={(lineNumber) => {
              const style = { display: 'block' };
              if (highlightLines.includes(lineNumber)) {
                style.backgroundColor = isDark ? 'rgba(168, 85, 247, 0.1)' : 'rgba(168, 85, 247, 0.15)';
                style.borderLeft = '3px solid rgb(168, 85, 247)';
                style.paddingLeft = '0.5rem';
              }
              return { style };
            }}
          >
            {activeFile.code}
          </SyntaxHighlighter>
        </div>
      </div>

      {/* Live Demo Component */}
      {demoComponent && (
        <div className={`p-6 border-t ${isDark ? 'border-white/10' : 'border-black/10'}`}>
          <div className={`text-sm font-medium mb-3 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
            Live Demo
          </div>
          <div className={`rounded-lg p-4 ${isDark ? 'bg-white/[0.02]' : 'bg-black/[0.02]'}`}>
            {demoComponent}
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeShowcase;
