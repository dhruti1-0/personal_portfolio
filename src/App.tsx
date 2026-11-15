import {MotionConfig} from 'motion/react';
import {useCallback, useEffect, useRef, useState} from 'react';
import {AboutSection} from './components/AboutSection';
import {ContactSection} from './components/ContactSection';
import {EducationSection} from './components/EducationSection';
import {Footer} from './components/Footer';
import {HeroSection} from './components/HeroSection';
import {Navbar} from './components/Navbar';
import {SkillsSection} from './components/SkillsSection';
import {fetchVisitorCount, type VisitorCountResult} from './services/api';

export default function App() {
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const [visitorState, setVisitorState] = useState<VisitorCountResult>({
    status: 'unconfigured',
    count: null,
  });
  const [visitorLoading, setVisitorLoading] = useState(false);

  const loadVisitorCount = useCallback(async (signal?: AbortSignal) => {
    setVisitorLoading(true);
    const result = await fetchVisitorCount(signal);
    if (!signal?.aborted) {
      setVisitorState(result);
      setVisitorLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    void loadVisitorCount(controller.signal);
    return () => controller.abort();
  }, [loadVisitorCount]);

  const handleNavigateContact = useCallback(() => {
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({behavior: 'smooth', block: 'start'});
      window.setTimeout(() => {
        nameInputRef.current?.focus({preventScroll: true});
      }, 350);
    }
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#060608] text-zinc-100">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-lg focus:bg-lime-400 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-zinc-950"
        >
          Skip to main content
        </a>

        <Navbar onNavigateContact={handleNavigateContact} />

        <main id="main-content">
          <HeroSection
            onNavigateContact={handleNavigateContact}
            visitorState={visitorState}
            visitorLoading={visitorLoading}
            onRefreshVisitors={() => void loadVisitorCount()}
          />
          <AboutSection />
          <EducationSection />
          <SkillsSection />
          <ContactSection nameInputRef={nameInputRef} visitorState={visitorState} />
        </main>

        <Footer />
      </div>
    </MotionConfig>
  );
}
