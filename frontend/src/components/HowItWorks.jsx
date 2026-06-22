import { memo } from 'react';
import { useI18n } from '../i18n';

function StepCard({ step, index }) {
  return (
    <div className="relative opacity-0 animate-fade-up" style={{ animationDelay: `${0.1 + index * 0.12}s` }}>
      {index < 2 && (
        <div className="hidden lg:block absolute top-12 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-px bg-gradient-to-r from-accent/40 to-transparent pointer-events-none" />
      )}
      <div className="relative flex flex-col items-center text-center">
        <div className="w-12 h-12 rounded-full bg-accent-soft border border-accent/20 flex items-center justify-center mb-6">
          <span className="font-heading text-sm font-bold text-accent">{step.number}</span>
        </div>
        <h3 className="font-heading text-xl font-semibold text-text-primary mb-3">{step.title}</h3>
        <p className="font-body text-sm text-text-secondary leading-relaxed max-w-sm">{step.description}</p>
      </div>
    </div>
  );
}

const MemoizedStepCard = memo(StepCard);

export default function HowItWorks() {
  const { t } = useI18n();

  return (
    <section id="how-it-works" className="relative py-28 sm:py-36">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_70%_60%,rgba(0,210,255,0.04),transparent)] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="max-w-2xl mb-16">
          <p className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-secondary mb-4 opacity-0 animate-fade-up">
            Workflow
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text-primary leading-tight opacity-0 animate-fade-up" style={{ animationDelay: '0.05s' }}>
            {t.howItWorks.title}
          </h2>
          <p className="mt-4 font-body text-lg text-text-secondary opacity-0 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            {t.howItWorks.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
          {t.howItWorks.steps.map((step, i) => (
            <MemoizedStepCard key={i} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
