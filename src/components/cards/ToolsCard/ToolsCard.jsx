import { BentoCard } from '../../ui/BentoCard/BentoCard.jsx';
import { hardwareItems, softwareItems } from '../../../data/tools.js';
import espressifLogo from '../../../assets/logos/tools/espressif.svg';
import stmicroelectronicsLogo from '../../../assets/logos/tools/stmicroelectronics.svg';
import arduinoLogo from '../../../assets/logos/tools/arduino.svg';
import kicadLogo from '../../../assets/logos/tools/kicad.svg';
import ltspiceLogo from '../../../assets/logos/tools/ltspice.svg';
import proteusLogo from '../../../assets/logos/tools/proteus.svg';
import {
  CpuIcon,
  GearIcon,
  TerminalIcon,
  AppleBrandLogo,
  DeviceAirpodsIcon,
  PythonIcon,
  GithubIcon,
  GitlabIcon
} from '../../icons/index.js';
import { useI18n } from '../../../i18n/I18nProvider.jsx';
import './ToolsCard.css';

// Logos sourced from https://thesvg.org (CC0 / free for any project, no
// attribution required) for brands with no equivalent on itshover.com;
// every other icon comes from https://www.itshover.com/icons. Items
// without any mark (e.g. the Basys FPGA board) fall back to CpuIcon
// instead of a broken <img> src.
const HARDWARE_LOGOS = {
  ESP32: espressifLogo,
  STM32: stmicroelectronicsLogo,
  Arduino: arduinoLogo,
  'PC (RTX 4060 Ti 8GB, 32GB RAM)': TerminalIcon,
  'MacBook Pro': AppleBrandLogo,
  AirPods: DeviceAirpodsIcon
};

const SOFTWARE_LOGOS = {
  Python: PythonIcon,
  KiCad: kicadLogo,
  LTspice: ltspiceLogo,
  Proteus: proteusLogo,
  GitHub: GithubIcon,
  GitLab: GitlabIcon
};

const ItemIcon = ({ item, logos }) => {
  const logo = logos[item];
  if (!logo) return <CpuIcon aria-hidden size="1em" />;
  if (typeof logo === 'string') return <img src={logo} alt="" draggable={false} />;
  const Icon = logo;
  return <Icon aria-hidden size="1em" />;
};

export default function ToolsCard() {
  const { t } = useI18n();
  return (
    <BentoCard className="cell-tools">
      <div className="bento-card-inner">
        <div className="card-header">
          <span className="card-header__label">
            <GearIcon aria-hidden size="1em" /> {t('hdr.whatIUse')}
          </span>
        </div>
        <div className="tools-card__cols">
          <div className="tools-card__col">
            <h4>{t('use.hardware')}</h4>
            <ul>
              {hardwareItems.map(item => (
                <li key={item}>
                  <ItemIcon item={item} logos={HARDWARE_LOGOS} /> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="tools-card__col">
            <h4>{t('use.software')}</h4>
            <ul>
              {softwareItems.map(item => (
                <li key={item}>
                  <ItemIcon item={item} logos={SOFTWARE_LOGOS} /> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </BentoCard>
  );
}
