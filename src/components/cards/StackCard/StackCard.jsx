import { StackIcon } from '../../icons/index.js';
import { BentoCard } from '../../ui/BentoCard/BentoCard.jsx';
import LogoLoop from '../../ui/LogoLoop/LogoLoop.jsx';
import { useI18n } from '../../../i18n/I18nProvider.jsx';
import espressif from '../../../assets/logos/tools/espressif.svg';
import stm from '../../../assets/logos/tools/stmicroelectronics.svg';
import arduino from '../../../assets/logos/tools/arduino.svg';
import kicad from '../../../assets/logos/tools/kicad.svg';
import ltspice from '../../../assets/logos/tools/ltspice.svg';
import proteus from '../../../assets/logos/tools/proteus.svg';
import python from '../../../assets/logos/tools/python.svg';
import fastapi from '../../../assets/logos/tools/fastapi.svg';
import react from '../../../assets/logos/tools/react.svg';
import typescript from '../../../assets/logos/tools/typescript.svg';
import firebase from '../../../assets/logos/tools/firebase.svg';
import blender from '../../../assets/logos/tools/blender.svg';
import './StackCard.css';

// Logos: thesvg.org (CC0). Two endless strips going opposite ways (React
// Bits LogoLoop): what Rayane builds hardware with, then software.
const HARDWARE = [
  { name: 'ESP32', logo: espressif },
  { name: 'STM32', logo: stm },
  { name: 'Arduino', logo: arduino },
  { name: 'KiCad', logo: kicad },
  { name: 'LTspice', logo: ltspice },
  { name: 'Proteus', logo: proteus }
];
const SOFTWARE = [
  { name: 'Python', logo: python },
  { name: 'FastAPI', logo: fastapi },
  { name: 'React', logo: react },
  { name: 'TypeScript', logo: typescript },
  { name: 'Firebase', logo: firebase },
  { name: 'Blender', logo: blender }
];

const toLogos = list => list.map(({ name, logo }) => ({ src: logo, alt: name, title: name }));
const HW = toLogos(HARDWARE);
const SW = toLogos(SOFTWARE);

export default function StackCard() {
  const { t } = useI18n();
  return (
    <BentoCard className="cell-folder stack-card">
      <div className="bento-card-inner">
        <div className="card-header">
          <span className="card-header__label">
            <StackIcon size={16} /> {t('hdr.stack')}
          </span>
        </div>
        <div className="stack-card__rows">
          <div className="stack-card__row">
            <span className="stack-card__label">{t('stack.hw')}</span>
            <LogoLoop logos={HW} speed={34} logoHeight={30} gap={30} labels="below" pauseOnHover fadeOut fadeOutWidth={0.15} scaleOnHover ariaLabel={t('stack.hw')} />
          </div>
          <div className="stack-card__row">
            <span className="stack-card__label">{t('stack.sw')}</span>
            <LogoLoop logos={SW} speed={34} direction="right" logoHeight={30} gap={30} labels="below" pauseOnHover fadeOut fadeOutWidth={0.15} scaleOnHover ariaLabel={t('stack.sw')} />
          </div>
        </div>
      </div>
    </BentoCard>
  );
}
