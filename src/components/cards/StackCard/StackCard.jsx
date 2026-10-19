import { StackIcon } from '../../icons/index.js';
import { BentoCard } from '../../ui/BentoCard/BentoCard.jsx';
import { useI18n } from '../../../i18n/I18nProvider.jsx';
import './StackCard.css';

// Logos: theSVG, Simple Icons, and the upstream Ollama / Hermes projects,
// in src/assets/logos/tools.
// Three endless strips going opposite ways (CSS strips): what Rayane
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

// A plain CSS strip: two copies sliding by half their width. Replaces the
// React Bits LogoLoop, whose per-frame JS was the heaviest script on a phone
// and whose items spilled out of the card.
function CssLoop({ logos, direction, label }) {
  return (
    <div className={`stack-loop stack-loop--${direction}`} role="list" aria-label={label}>
      <div className="stack-loop__track">
        {[0, 1, 2, 3].map(copy =>
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
              <CssLoop logos={r.logos} direction={r.direction} label={t(r.key)} />
            </div>
          ))}
        </div>
      </div>
    </BentoCard>
  );
}
