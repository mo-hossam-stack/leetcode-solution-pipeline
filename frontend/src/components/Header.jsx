import { useState, useEffect } from 'react';
import { useI18n } from '../i18n';

export default function Header() {
  const { lang, setLang, t } = useI18n();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleLang = () => setLang(lang === 'en' ? 'ar' : 'en');
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-bg-primary/85 backdrop-blur-xl border-b border-border-primary'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <button onClick={() => scrollTo('hero')} className="flex items-center gap-2.5 group">
          <span className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center text-xs font-bold text-white transition-transform group-hover:scale-105">
            LF
          </span>
          <span className="font-heading font-semibold text-sm text-text-primary tracking-tight">
            LeetCode<span className="text-accent">AI</span>
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-8">
          {['features', 'how-it-works', 'tool'].map((id) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="text-sm text-text-secondary hover:text-text-primary transition-colors font-medium"
            >
              {t.nav[id === 'how-it-works' ? 'howItWorks' : id]}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/mo-hossam-stack/leetcode-solution-pipeline"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors"
            aria-label="GitHub"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
            <span className="font-medium">GitHub</span>
          </a>
          <button
            onClick={toggleLang}
            className="px-3 py-1.5 text-sm font-medium text-text-secondary bg-bg-tertiary rounded-lg hover:bg-bg-hover hover:text-text-primary transition-all"
          >
            {lang === 'en' ? 'AR' : 'EN'}
          </button>
        </div>
      </div>
    </header>
  );
}
