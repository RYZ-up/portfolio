import BorderGlow from '../ui/BorderGlow/BorderGlow.jsx';
import { borderGlowDefaults } from '../ui/BorderGlow/borderGlowDefaults.js';
import AboutMeCard from './AboutMeCard.jsx';
import FunFactsCard from './FunFactsCard.jsx';
import GalleryCard from './GalleryCard.jsx';
import ContactCard from './ContactCard.jsx';
import './Sidebar.css';

export default function Sidebar() {
  return (
    <BorderGlow
      {...borderGlowDefaults}
      borderRadius={0}
      tiltAmplitude={0}
      glow={false}
      backgroundColor="#131316"
      className="sidebar-block"
    >
      <AboutMeCard />
      <FunFactsCard />
      <GalleryCard />
      <ContactCard />
    </BorderGlow>
  );
}
