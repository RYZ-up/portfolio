import { StackIcon } from '../../icons/index.js';
import { BentoCard } from '../../ui/BentoCard/BentoCard.jsx';
import ElasticStack from '../../ui/ElasticStack/ElasticStack.jsx';
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

// Logos: thesvg.org (CC0). Two rows: what Rayane builds hardware with, and
// what he writes software with.
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
            <ElasticStack items={HARDWARE} label={t('stack.hw')} />
          </div>
          <div className="stack-card__row">
            <span className="stack-card__label">{t('stack.sw')}</span>
            <ElasticStack items={SOFTWARE} label={t('stack.sw')} />
          </div>
        </div>
      </div>
    </BentoCard>
  );
}
