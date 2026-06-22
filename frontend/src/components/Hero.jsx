import { useI18n } from '../i18n';

const ICON_CODE = [
  '{', ' ', '}', '(', ')', '=', '>', '/', '*', '+', '-', '_', ':',
  ';', '<', '[', ']', '|', '&', '%', '$', '#', '@', '!', '~', '^',
];

export default function Hero() {
  const { t } = useI18n();

  const scrollToTool = () => document.getElementById('tool')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(108,92,231,0.12),transparent)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_70%_80%,rgba(0,210,255,0.06),transparent)] pointer-events-none" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.03]">
        <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] border border-text-secondary rounded-full animate-drift" />
        <div className="absolute -bottom-1/3 -left-1/4 w-[600px] h-[600px] border border-text-tertiary rounded-full animate-drift" style={{ animationDelay: '-7s' }} />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        <div className="font-mono text-[10px] leading-relaxed text-text-tertiary opacity-[0.04] rotate-12 scale-150 origin-center translate-x-20 translate-y-20">
          {Array.from({ length: 60 }, (_, i) => (
            <div key={i} className="flex gap-3">
              {Array.from({ length: 30 }, (_, j) => (
                <span key={j}>{ICON_CODE[(i * 31 + j * 17) % ICON_CODE.length]}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 w-full">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-soft border border-accent/20 text-accent text-xs font-medium font-body mb-6 opacity-0 animate-fade-up">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            {t.hero.badge}
          </div>

          <h1 className="font-heading leading-[1.05] tracking-tight">
            <span className="block text-4xl sm:text-5xl lg:text-6xl font-semibold text-text-primary opacity-0 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              {t.hero.title}
            </span>
            <span className="relative block mt-3 sm:mt-4">
              <span
                className="absolute -inset-x-4 -inset-y-4 bg-gradient-to-r from-[#C084FC]/30 via-[#22D3EE]/20 to-[#C084FC]/30 blur-3xl opacity-0 animate-fade-in text-shimmer"
                style={{ animationDelay: '0.2s', animationDuration: '1.5s' }}
                aria-hidden
              />
              <span className="relative text-5xl sm:text-6xl lg:text-8xl font-bold" style={{ animationDelay: '0.3s' }}>
                <span className="bg-gradient-to-r from-[#C084FC] via-[#E879F9] via-[#22D3EE] to-[#C084FC] bg-clip-text text-transparent text-shimmer">
                  {t.hero.titleHighlight}
                </span>
              </span>
            </span>
          </h1>

          <div className="mt-6 sm:mt-8 flex items-center gap-3 opacity-0 animate-fade-up" style={{ animationDelay: '0.15s' }}>
            <span className="w-16 h-0.5 rounded-full bg-gradient-to-r from-accent to-secondary" />
            <span className="w-2 h-2 rotate-45 border border-accent/40" />
          </div>

          <p className="mt-6 text-lg sm:text-xl text-text-secondary leading-relaxed max-w-2xl font-body opacity-0 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            {t.hero.subtitle}
          </p>

          <div className="mt-10 flex flex-wrap gap-4 opacity-0 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <button
              onClick={scrollToTool}
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-white font-semibold rounded-xl transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_0_30px_-5px_rgba(108,92,231,0.4)] font-body active:scale-[0.98]"
            >
              {t.hero.cta}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <a
              href="https://github.com/mo-hossam-stack/leetcode-solution-pipeline"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-bg-tertiary hover:bg-bg-hover text-text-primary font-semibold rounded-xl transition-all duration-200 border border-border-primary hover:border-accent/30 font-body"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              {t.hero.ctaSecondary}
            </a>
          </div>
        </div>


      </div>
    </section>
  );
}
