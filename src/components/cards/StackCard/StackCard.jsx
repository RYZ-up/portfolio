import { StackIcon } from '../../icons/index.js';
import { BentoCard } from '../../ui/BentoCard/BentoCard.jsx';
import LogoLoop from '../../ui/LogoLoop/LogoLoop.jsx';
import useIsMobile from '../../../hooks/useIsMobile.js';
import { isLowPower } from '../../../lib/device.js';
import { useI18n } from '../../../i18n/I18nProvider.jsx';
import './StackCard.css';

// Logos: theSVG, Simple Icons, and the upstream Ollama / Hermes projects,
// in src/assets/logos/tools.
// Three endless strips going opposite ways (React Bits LogoLoop): what Rayane
// builds hardware with, the languages and web tools he writes in, then the
// services and tools around them. Every one appears in one of his projects.
const files = import.meta.glob('../../../assets/logos/tools/*.svg', { eager: true, import: 'default' });
const logo = (file, name) => ({ src: files[`../../../assets/logos/tools/${file}.svg`], alt: name, title: name });

const HW = [
  logo('espressif', 'ESP32'),
  logo('stmicroelectronics', 'STM32'),
  logo('arduino', 'Arduino'),
  logo('kicad', 'KiCad'),
  logo('ltspice', 'LTspice'),
  logo('proteus', 'Proteus')
];
const LANGS = [
  logo('python', 'Python'),
  logo('cplusplus', 'C++'),
  logo('javascript', 'JavaScript'),
  logo('typescript', 'TypeScript'),
  logo('html5', 'HTML'),
  logo('css', 'CSS'),
  logo('react', 'React'),
  logo('vite', 'Vite'),
  logo('fastapi', 'FastAPI'),
  logo('nodedotjs', 'Node.js')
];
const TOOLS = [
  logo('ollama', 'Ollama'),
  logo('hermes', 'Hermes'),
  logo('claude', 'Claude'),
  logo('chatgpt', 'ChatGPT'),
  logo('firebase', 'Firebase'),
  logo('netlify', 'Netlify'),
  logo('cloudflare', 'Cloudflare'),
  logo('stripe', 'Stripe'),
  logo('sqlite', 'SQLite'),
  logo('scikitlearn', 'scikit-learn'),
  logo('huggingface', 'Hugging Face'),
  logo('chartdotjs', 'Chart.js'),
  logo('git', 'Git'),
  logo('githubactions', 'GitHub Actions'),
  logo('vitest', 'Vitest'),
  logo('blender', 'Blender'),
  logo('godaddy', 'GoDaddy')
];

const ROWS = [
  { key: 'stack.hw', logos: HW, direction: 'left' },
  { key: 'stack.sw', logos: LANGS, direction: 'right' },
  { key: 'stack.tools', logos: TOOLS, direction: 'left' }
];

// Phones and small machines: a plain CSS strip (two copies sliding by half
// their width) instead of LogoLoop's per-frame JS, which was the heaviest
// script on a throttled phone.
function CssLoop({ logos, direction, label }) {
  return (
    <div className={`stack-loop stack-loop--${direction}`} role="list" aria-label={label}>
      <div className="stack-loop__track">
        {[0, 1].map(copy =>
          logos.map(l => (
            <span className="stack-loop__item" role="listitem" aria-hidden={copy ? 'true' : undefined} key={`${copy}-${l.alt}`}>
              <img src={l.src} alt={copy ? '' : l.alt} width="26" height="26" loading="lazy" decoding="async" />
              <small>{l.alt}</small>
            </span>
          ))
        )}
      </div>
    </div>
  );
}

export default function StackCard() {
  const { t } = useI18n();
  const lite = useIsMobile() || isLowPower;
  return (
    <BentoCard className="cell-folder stack-card">
      <div className="bento-card-inner">
        <div className="card-header">
          <span className="card-header__label">
            <StackIcon size={16} /> {t('hdr.stack')}
          </span>
        </div>
        <div className="stack-card__rows">
          {ROWS.map(r => (
            <div className="stack-card__row" key={r.key}>
              <span className="stack-card__label">{t(r.key)}</span>
              {lite ? (
                <CssLoop logos={r.logos} direction={r.direction} label={t(r.key)} />
              ) : (
              <LogoLoop logos={r.logos} speed={30} direction={r.direction} logoHeight={26} gap={28} labels="below" pauseOnHover fadeOut fadeOutWidth={0.15} scaleOnHover ariaLabel={t(r.key)} />
              )}
            </div>
          ))}
        </div>
      </div>
    </BentoCard>
  );
}
