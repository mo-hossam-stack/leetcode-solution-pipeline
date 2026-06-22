import { I18nProvider, useI18n } from './i18n';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import ToolSection from './components/ToolSection';
import Footer from './components/Footer';
import './index.css';

function AppContent() {
  const { lang } = useI18n();

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <Header />
      <Hero />
      <Features />
      <HowItWorks />
      <ToolSection />
      <Footer />
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
