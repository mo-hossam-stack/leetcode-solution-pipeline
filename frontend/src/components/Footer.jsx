import { useI18n } from '../i18n';

const STATS_DATA = [
  { key: 'languages', value: '10+' },
  { key: 'fidelity', value: '100%' },
  { key: 'ai', value: 'LLaMA 3.3' },
  { key: 'openSource', value: 'MIT' },
];

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer>
      <div className="border-t border-border-subtle bg-bg-secondary/50">
        <div className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-12">
            {STATS_DATA.map((stat) => (
              <div key={stat.key} className="text-center">
                <div className="font-heading text-2xl sm:text-3xl font-bold text-accent mb-1">{stat.value}</div>
                <div className="font-body text-sm text-text-tertiary">{t.stats[stat.key]}</div>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-md bg-accent flex items-center justify-center text-[8px] font-bold text-white">
                LF
              </span>
              <span className="font-body text-xs text-text-tertiary">
                {t.footer.description}
              </span>
            </div>

            <div className="flex items-center gap-6">
              <a
                href="https://github.com/mo-hossam-stack/leetcode-solution-pipeline"
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-xs text-text-tertiary hover:text-text-secondary transition-colors"
              >
                {t.footer.github}
              </a>
              <a
                href="https://github.com/mo-hossam-stack/leetcode-solution-pipeline/blob/main/CONTRIBUTING.md"
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-xs text-text-tertiary hover:text-text-secondary transition-colors"
              >
                {t.footer.contribute}
              </a>
              <a
                href="https://github.com/mo-hossam-stack/leetcode-solution-pipeline/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-xs text-text-tertiary hover:text-text-secondary transition-colors"
              >
                {t.footer.report}
              </a>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="font-body text-xs text-text-tertiary/60">
              &copy; {new Date().getFullYear()} {t.footer.builtBy}{' '}
              <a
                href="https://github.com/mo-hossam-stack"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent-hover transition-colors"
              >
                mo-hossam-stack
              </a>
              . {t.footer.rights}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
