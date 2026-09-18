import { BentoCard } from '../../ui/BentoCard/BentoCard.jsx';
import MetallicPaint from '../../ui/MetallicPaint/MetallicPaint.jsx';
import { useI18n } from '../../../i18n/I18nProvider.jsx';
import './ProjectsCard.css';

/** A metallic emblem next to a short list of projects (titles come from the i18n keys). */
export default function ProjectsCard({ className, Icon, titleKey, shapeSvg, projects }) {
  const { t } = useI18n();
  // Give the SVG an intrinsic size (some browsers report 0x0 for a viewBox-only SVG).
  const sizedSvg = /\swidth=/.test(shapeSvg) ? shapeSvg : shapeSvg.replace('<svg ', '<svg width="512" height="512" ');
  const shapeSrc = `data:image/svg+xml;utf8,${encodeURIComponent(sizedSvg)}`;

  return (
    <BentoCard className={className}>
      <div className="bento-card-inner projects-card">
        <div className="card-header">
          <span className="card-header__label">
            <Icon aria-hidden size="1em" /> {t(titleKey)}
          </span>
        </div>
        <div className="projects-card__row">
          <div className="projects-card__paint">
            <MetallicPaint
              imageSrc={shapeSrc}
              tintColor="#ffffff"
              darkColor="#000000"
              lightColor="#ffffff"
              seed={200}
              scale={4.1}
              refraction={0.012}
              blur={0.1}
              speed={0.85}
              brightness={1.1}
              contrast={0.5}
              angle={66}
              fresnel={0.2}
              patternSharpness={0.4}
              waveAmplitude={2.6}
              liquid={0.01}
              noiseScale={2.5}
              chromaticSpread={3}
              distortion={1}
              contour={1}
              mouseAnimation={false}
            />
          </div>
          <ul className="projects-card__projects">
            {projects.map(({ name, desc }) => (
              <li key={name} title={`${t(name)} — ${t(desc)}`}>
                <span className="projects-card__project-name">{t(name)}</span>
                <span className="projects-card__project-desc">{t(desc)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </BentoCard>
  );
}
