import { useState, useCallback } from 'react';
import { useI18n } from '../i18n';
import { formatCode } from '../api';

const INITIAL_STATE = { result: null, error: null, loading: false, copied: false };

export default function ToolSection() {
  const { t } = useI18n();
  const [code, setCode] = useState('');
  const [{ result, error, loading, copied }, setState] = useState(INITIAL_STATE);

  const canSubmit = code.trim().length > 0;

  const handleFormat = useCallback(async () => {
    if (!canSubmit) return;
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const data = await formatCode(code);
      setState((prev) => ({ ...prev, result: data, loading: false }));
    } catch (err) {
      setState((prev) => ({
        ...prev,
        error: err.message === 'rate_limit' ? t.tool.rateLimit : err.message,
        loading: false,
      }));
    }
  }, [canSubmit, code, t.tool.rateLimit]);

  const handleCopy = useCallback(async () => {
    if (!result?.formatted_code) return;
    await navigator.clipboard.writeText(result.formatted_code);
    setState((prev) => ({ ...prev, copied: true }));
    setTimeout(() => setState((prev) => ({ ...prev, copied: false })), 2000);
  }, [result]);

  const handleDownload = useCallback(() => {
    if (!result?.formatted_code) return;
    const blob = new Blob([result.formatted_code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = result.filename;
    a.click();
    URL.revokeObjectURL(url);
  }, [result]);

  const handleTryAgain = useCallback(() => setState(INITIAL_STATE), []);

  return (
    <section id="tool" className="relative py-28 sm:py-36">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_80%,rgba(108,92,231,0.06),transparent)] pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="max-w-2xl mb-16">
          <p className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4 opacity-0 animate-fade-up">
            Tool
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text-primary leading-tight opacity-0 animate-fade-up" style={{ animationDelay: '0.05s' }}>
            {t.tool.title}
          </h2>
          <p className="mt-4 font-body text-lg text-text-secondary opacity-0 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            {t.tool.subtitle}
          </p>
        </div>

        <div className="rounded-2xl bg-bg-secondary border border-border-subtle overflow-hidden">
          <div className="flex items-center gap-1.5 px-4 py-3 border-b border-border-subtle bg-bg-tertiary/50">
            <span className="w-3 h-3 rounded-full bg-danger/60" />
            <span className="w-3 h-3 rounded-full bg-warning/60" />
            <span className="w-3 h-3 rounded-full bg-success/60" />
            <span className="ml-3 font-mono text-xs text-text-tertiary">solution-formatter</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <div className="border-r border-border-subtle">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder={t.tool.placeholder}
                className="w-full h-80 lg:h-96 p-5 font-mono text-sm bg-transparent text-text-primary placeholder-text-tertiary resize-none focus:outline-none scroll-hidden"
                spellCheck={false}
              />
            </div>

            <div className="relative">
              {loading ? (
                <div className="flex items-center justify-center h-80 lg:h-96">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                    <span className="font-body text-sm text-text-secondary">{t.tool.formatting}</span>
                  </div>
                </div>
              ) : error ? (
                <div className="flex flex-col items-center justify-center h-80 lg:h-96 px-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-danger/10 flex items-center justify-center mb-4">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-danger">
                      <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
                    </svg>
                  </div>
                  <p className="font-body text-sm text-danger mb-4">{error}</p>
                  <button
                    onClick={handleTryAgain}
                    className="px-4 py-2 text-sm font-medium bg-bg-tertiary hover:bg-bg-hover text-text-primary rounded-lg transition-colors"
                  >
                    {t.tool.tryAgain}
                  </button>
                </div>
              ) : result ? (
                <div className="flex flex-col h-80 lg:h-96">
                  <div className="flex-1 overflow-auto p-5 scroll-hidden">
                    <pre className="font-mono text-sm text-text-primary whitespace-pre leading-relaxed">
                      {result.formatted_code}
                    </pre>
                    {result.folder?.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-border-subtle flex flex-wrap items-center gap-2">
                        <span className="font-body text-xs text-text-tertiary">{t.tool.folders}:</span>
                        {result.folder.map((f) => (
                          <span
                            key={f}
                            className="px-2 py-0.5 text-xs font-medium text-accent bg-accent-soft rounded-md"
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 px-5 py-3 border-t border-border-subtle bg-bg-tertiary/30">
                    <button
                      onClick={handleCopy}
                      className="px-3 py-1.5 text-xs font-medium text-text-secondary bg-bg-tertiary hover:bg-bg-hover hover:text-text-primary rounded-lg transition-all"
                    >
                      {copied ? t.tool.copied : t.tool.copy}
                    </button>
                    <button
                      onClick={handleDownload}
                      className="px-3 py-1.5 text-xs font-medium text-white bg-accent hover:bg-accent-hover rounded-lg transition-all"
                    >
                      {t.tool.download}
                    </button>
                    <span className="ml-auto font-mono text-xs text-text-tertiary">
                      {result.filename}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-80 lg:h-96">
                  <div className="text-center px-6">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4 text-text-tertiary">
                      <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
                    </svg>
                    <p className="font-body text-sm text-text-tertiary">Paste your code on the left,<br />result appears here</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between px-5 py-3 border-t border-border-subtle bg-bg-tertiary/30">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-text-tertiary">
                {code.length > 0 ? `${code.split('\n').length} lines` : 'Ready'}
              </span>
            </div>
            <button
              onClick={handleFormat}
              disabled={loading || !canSubmit}
              className="px-5 py-2 text-sm font-semibold text-white bg-accent hover:bg-accent-hover rounded-xl transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:shadow-[0_0_25px_-5px_rgba(108,92,231,0.3)] active:scale-[0.97] font-body"
            >
              {loading ? t.tool.formatting : t.tool.button}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
