import { useState } from 'react';
import { I18nProvider, useI18n } from './i18n';
import { formatCode } from './api';
import './index.css';

function AppContent() {
  const { lang, setLang, t } = useI18n();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  const canSubmit = code.trim().length > 0;

  const handleFormat = async () => {
    if (!canSubmit) return;
    setLoading(true);
    setError(null);
    try {
      const data = await formatCode(code);
      setResult(data);
    } catch (err) {
      if (err.message === 'rate_limit') {
        setError(t.rateLimit);
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCopyFilename = async () => {
    if (result?.filename) {
      await navigator.clipboard.writeText(result.filename);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (!result?.formatted_code) return;
    const blob = new Blob([result.formatted_code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = result.filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">{t.title}</h1>
            <p className="text-sm text-gray-500">{t.subtitle}</p>
          </div>
          <button
            onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
            className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            {lang === 'en' ? 'العربية' : 'English'}
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-6">
          <div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder={t.inputPlaceholder}
              className="w-full h-64 p-4 font-mono text-sm bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            />
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleFormat}
              disabled={loading || !canSubmit}
              className="px-6 py-2.5 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? t.formatting : t.formatButton}
            </button>
          </div>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700">{error}</p>
              <button
                onClick={() => setError(null)}
                className="mt-2 text-sm text-red-600 hover:text-red-800"
              >
                {t.tryAgain}
              </button>
            </div>
          )}

          {result && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">{t.resultTitle}</h2>
                <div className="flex gap-2">
                  <button
                    onClick={handleCopyFilename}
                    className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    {copied ? t.copied : `${t.copyFilename}: ${result.filename}`}
                  </button>
                  <button
                    onClick={handleDownload}
                    className="px-3 py-1.5 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    {t.download}
                  </button>
                </div>
              </div>

              <pre className="p-4 bg-white border border-gray-200 rounded-lg overflow-x-auto">
                <code className="font-mono text-sm text-gray-800 whitespace-pre">
                  {result.formatted_code}
                </code>
              </pre>

              {result.folder && result.folder.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">{t.folders}:</span>
                  {result.folder.map((f) => (
                    <span
                      key={f}
                      className="px-2 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <I18nProvider>
      <AppContent />
    </I18nProvider>
  );
}

export default App;