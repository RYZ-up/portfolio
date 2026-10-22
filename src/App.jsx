import { lazy, Suspense, useEffect } from 'react';
import { Hero } from '@/components/site/hero.jsx';
import { SitePage } from '@/components/site/site-shell.jsx';
import { ProjectsSection } from '@/components/site/projects-section.jsx';
import { KeyboardSection } from '@/components/site/skills-section.jsx';

// Below-the-fold sections ship as their own chunks, fetched as soon as the browser is idle
// so they are ready before anyone scrolls there. Until then an empty section with the same
// id keeps anchor links (#faq, #ia…) working.
const loaders = {
  activite: () => import('@/components/site/activity-section.jsx'),
  ia: () => import('@/components/site/chat-section.jsx').then(mod => ({ default: mod.ChatSection })),
  faq: () => import('@/components/site/faq-section.jsx')
};
const ActivitySection = lazy(loaders.activite);
const ChatSection = lazy(loaders.ia);
const FaqSection = lazy(loaders.faq);

function Deferred({ id, children }) {
  return <Suspense fallback={<section id={id} className="min-h-[70vh] scroll-mt-20" />}>{children}</Suspense>;
}

export default function App() {
  useEffect(() => {
    const preload = () => Object.values(loaders).forEach(load => load());
    if ('requestIdleCallback' in window) {
      const id = requestIdleCallback(preload, { timeout: 2500 });
      return () => cancelIdleCallback(id);
    }
    const id = setTimeout(preload, 1200);
    return () => clearTimeout(id);
  }, []);

  return (
    <SitePage>
      <Hero />
      <ProjectsSection />
      <KeyboardSection />
      <Deferred id="activite">
        <ActivitySection />
      </Deferred>
      <Deferred id="ia">
        <ChatSection />
      </Deferred>
      <Deferred id="faq">
        <FaqSection />
      </Deferred>
    </SitePage>
  );
}
