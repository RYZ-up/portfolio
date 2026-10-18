import BorderGlow from '../ui/BorderGlow/BorderGlow.jsx';
import { borderGlowDefaults } from '../ui/BorderGlow/borderGlowDefaults.js';
import useIsMobile from '../../hooks/useIsMobile.js';
import AboutMeCard from './AboutMeCard.jsx';
import GalleryCard from './GalleryCard.jsx';
import KeywordsCard from './KeywordsCard.jsx';
import './Sidebar.css';

export default function Sidebar() {
  // Not just hidden on phones (CSS used to do that): its screenshots
  // duplicate the project cards below anyway, but it still mounted and
  // preloaded/decoded every gallery image regardless — real bandwidth and
  // CPU spent on a slider nobody could see. Not rendered there at all now.
  const isMobile = useIsMobile(700);
  return (
    <BorderGlow
      {...borderGlowDefaults}
      glow={false}
      tiltAmplitude={0}
      backgroundColor="#131316"
      className="sidebar-block"
    >
      <AboutMeCard />
      {!isMobile && <GalleryCard />}
      <KeywordsCard />
    </BorderGlow>
  );
}
