import { memo } from 'react';
import { useI18n } from '../i18n';

const ICONS = [
  <svg key="0" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4 7 4 4 20 4 20 7" /><line x1="9" y1="20" x2="15" y2="20" /><line x1="12" y1="4" x2="12" y2="20" />
  </svg>,
  <svg key="1" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>,
  <svg key="2" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>,
  <svg key="3" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
  </svg>,
  <svg key="4" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
  </svg>,
  <svg key="5" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>,
];

function FeatureCard({ title, description, icon, index }) {
  return (
    <div
      className="group relative p-6 sm:p-8 rounded-2xl bg-bg-secondary border border-border-subtle hover:border-accent/20 transition-all duration-300 hover:bg-bg-elevated opacity-0 animate-fade-up"
      style={{ animationDelay: `${0.1 + index * 0.08}s` }}
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div className="relative">
        <div className="w-10 h-10 rounded-xl bg-accent-soft flex items-center justify-center text-accent mb-4 group-hover:scale-105 transition-transform duration-300">
          {icon}
        </div>
        <h3 className="font-heading font-semibold text-text-primary text-lg mb-2">{title}</h3>
        <p className="font-body text-sm text-text-secondary leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

const MemoizedFeatureCard = memo(FeatureCard);

export default function Features() {
  const { t } = useI18n();

  return (
    <section id="features" className="relative py-28 sm:py-36">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_30%_50%,rgba(108,92,231,0.04),transparent)] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="max-w-2xl mb-16">
          <p className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4 opacity-0 animate-fade-up">
            Features
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text-primary leading-tight opacity-0 animate-fade-up" style={{ animationDelay: '0.05s' }}>
            {t.features.title}
          </h2>
          <p className="mt-4 font-body text-lg text-text-secondary opacity-0 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            {t.features.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {t.features.items.map((item, i) => (
            <MemoizedFeatureCard
              key={i}
              title={item.title}
              description={item.description}
              icon={ICONS[i]}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
