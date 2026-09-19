import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
// The projects page is only needed after a click: keep it out of the first bundle.
const ProjectsPage = lazy(() => import('./components/pages/ProjectsPage/ProjectsPage.jsx'));
import { startTextEncoding } from './lib/encodeDom.js';
import { useI18n } from './i18n/I18nProvider.jsx';
import Nav from './components/layout/Nav.jsx';
import { BorderGlowGroup } from './components/ui/BorderGlow/BorderGlowGroup.jsx';
import SidebarRail from './components/sidebar/SidebarRail.jsx';
import StatusCard from './components/cards/StatusCard/StatusCard.jsx';
import MapCard from './components/cards/MapCard/MapCard.jsx';
import ProjectStackCard from './components/cards/ProjectStackCard/ProjectStackCard.jsx';
import ApiStatusCard from './components/cards/ApiStatusCard/ApiStatusCard.jsx';
import WeatherCard from './components/cards/WeatherCard/WeatherCard.jsx';
import ActivityCard from './components/cards/ActivityCard/ActivityCard.jsx';
import FolderCard from './components/cards/FolderCard/FolderCard.jsx';
import ThemeToggleCard from './components/cards/ThemeToggleCard/ThemeToggleCard.jsx';
import DevProjectsCard from './components/cards/ProjectsCard/DevProjectsCard.jsx';
import SocialsCard from './components/cards/SocialsCard/SocialsCard.jsx';
import EngineeringProjectsCard from './components/cards/ProjectsCard/EngineeringProjectsCard.jsx';
import ChatCard from './components/cards/ChatCard/ChatCard.jsx';
import ToolsCard from './components/cards/ToolsCard/ToolsCard.jsx';

export default function App() {
  const { lang } = useI18n();

  useEffect(() => {
    const preventImageContextMenu = e => {
      if (e.target.closest('img')) {
        e.preventDefault();
      }
    };
    document.addEventListener('contextmenu', preventImageContextMenu);
    return () => document.removeEventListener('contextmenu', preventImageContextMenu);
  }, []);

  // Every so often the whole page's text turns into binary / hex / morse (overlay only).
  // Started only once the page has loaded and the browser is idle, so it never competes with the first render.
  useEffect(() => {
    let stop = null;
    let cancelled = false;
    let idle = 0;
    const start = () => {
      if (cancelled) return;
      stop = startTextEncoding(document.body);
    };
    const whenIdle = () => {
      if ('requestIdleCallback' in window) idle = window.requestIdleCallback(start, { timeout: 3000 });
      else idle = setTimeout(start, 1500);
    };
    if (document.readyState === 'complete') whenIdle();
    else window.addEventListener('load', whenIdle, { once: true });
    return () => {
      cancelled = true;
      window.removeEventListener('load', whenIdle);
      if ('cancelIdleCallback' in window) window.cancelIdleCallback(idle);
      else clearTimeout(idle);
      stop?.();
    };
  }, []);
  // `target` flips at once (the nav bar bounces to/from the centre); `view` follows after a beat,
  // and AnimatePresence fades the old page out before the new one fades in.
  const [target, setTarget] = useState('home');
  const [view, setView] = useState('home');
  // The code overlay is for the home page only.
  useEffect(() => {
    document.body.dataset.encView = view;
  }, [view]);
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);

  const navigate = to => {
    if (to === target) return;
    setTarget(to);
    clearTimeout(timer.current);
    // Short beat: the old page starts fading while the header is still on its way.
    timer.current = setTimeout(() => setView(to), 180);
  };

  const fade = {
    // No scale: a transform-origin in the middle of a page many screens tall would
    // make the content jump. Opacity + a small slide only.
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, y: -16, transition: { duration: 0.32, ease: 'easeIn' } }
  };

  return (
    <>
      <Nav view={view} centered={target === 'projects'} onNavigate={navigate} />
      <main>
      {/* The scroll is reset once the old page is fully gone, so it never jumps while fading. */}
      <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo({ top: 0, left: 0, behavior: 'instant' })}>
        {view === 'projects' ? (
          <motion.div key="projects" {...fade}>
            <Suspense fallback={null}>
              <ProjectsPage />
            </Suspense>
          </motion.div>
        ) : (
          <motion.div key="home" {...fade}>
            {/* Keyed by language: switching remounts every container, so each one re-renders (and replays its intro) in the new language. */}
      <BorderGlowGroup key={lang} className="bento-page">
        <SidebarRail />
        <div className="main-grid">
          <StatusCard />
          <MapCard />
          <ProjectStackCard />
          <ApiStatusCard />
          <WeatherCard />
          <ActivityCard />
          <FolderCard />
          <ThemeToggleCard />
          <DevProjectsCard />
          <SocialsCard />
          <EngineeringProjectsCard />
          <ChatCard />
          <ToolsCard />
        </div>
      </BorderGlowGroup>
          </motion.div>
        )}
      </AnimatePresence>
      </main>
    </>
  );
}
