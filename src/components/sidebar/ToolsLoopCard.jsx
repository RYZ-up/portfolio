import LogoLoop from '../ui/LogoLoop/LogoLoop.jsx';
import { useI18n } from '../../i18n/I18nProvider.jsx';
import useIsMobile from '../../hooks/useIsMobile.js';
import './Sidebar.css';

// The tools Rayane works with, as an endless strip of logos (React Bits
// LogoLoop), under the carousel: it takes the height the carousel leaves. Logos from thesvg.org (src/assets/logos/tools).
const files = import.meta.glob('../../assets/logos/tools/*.svg', { eager: true, import: 'default' });
const NAMES = {
  espressif: 'ESP32', stmicroelectronics: 'STM32', arduino: 'Arduino', kicad: 'KiCad', ltspice: 'LTspice',
  proteus: 'Proteus', python: 'Python', fastapi: 'FastAPI', react: 'React', typescript: 'TypeScript',
  firebase: 'Firebase', netlify: 'Netlify', blender: 'Blender'
};
const HARDWARE = ['espressif', 'stmicroelectronics', 'arduino', 'kicad', 'ltspice', 'proteus'];
const logo = key => {
  const src = files[`../../assets/logos/tools/${key}.svg`];
  return src && { src, alt: NAMES[key], title: NAMES[key] };
};
const HW = HARDWARE.map(logo).filter(Boolean);
const SW = Object.keys(NAMES).filter(k => !HARDWARE.includes(k)).map(logo).filter(Boolean);

export default function ToolsLoopCard() {
  const { t } = useI18n();
  // Phones: a static row of logos. The animated strip recomputes every logo on
  // each frame, which was the main cost of scrolling the home page there.
  const phone = useIsMobile(700);
  if (phone) {
    return (
      <section className="sidebar-section tools-loop tools-loop--static" aria-label={t('hdr.stack')}>
        <ul>
          {[...HW, ...SW].map(l => (
            <li key={l.alt}>
              <img src={l.src} alt={l.alt} title={l.title} loading="lazy" draggable={false} />
            </li>
          ))}
        </ul>
      </section>
    );
  }
  return (
    <section className="sidebar-section tools-loop" aria-label={t('hdr.stack')}>
      {/* Two rows going opposite ways: electronics tools, then software. */}
      <LogoLoop logos={HW} speed={34} logoHeight={30} gap={34} labels="below" pauseOnHover fadeOut fadeOutWidth={0.18} scaleOnHover ariaLabel="Hardware" />
      <LogoLoop logos={SW} speed={34} direction="right" logoHeight={30} gap={34} labels="below" pauseOnHover fadeOut fadeOutWidth={0.18} scaleOnHover ariaLabel="Software" />
    </section>
  );
}
