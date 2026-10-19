import { useEffect, useMemo, useState } from 'react';
import { FlameIcon } from '../../icons/index.js';
import { BentoCard } from '../../ui/BentoCard/BentoCard.jsx';
import { getDayProgress } from '../../../lib/activityModel.js';
import { useI18n } from '../../../i18n/I18nProvider.jsx';
import './ActivityCard.css';

const SIZE = 196;
const STROKE = 21;
const GAP = 7;

const RING_COLORS = ['#ff3b5c', '#8fbf3f', '#22d3ee'];

export default function ActivityCard() {
  const { t, lang } = useI18n();
  const [filled, setFilled] = useState(false);
  const [now, setNow] = useState(() => new Date());
  const day = useMemo(() => getDayProgress(now), [now]);

  // Re-read the clock every minute so steps and rings follow the time of day.
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = requestAnimationFrame(() => setTimeout(() => setFilled(true), 50));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <BentoCard className="cell-activity">
      <div className="bento-card-inner fitness-card">
        <div className="card-header">
          <span className="card-header__label">
            <FlameIcon aria-hidden size={16} /> {t('hdr.fitness')}
          </span>
        </div>
        <div className="fitness-card__rings">
          <svg className="fitness-rings" viewBox={`0 0 ${SIZE} ${SIZE}`} width={SIZE} height={SIZE}>
            {RING_COLORS.map((_, i) => {
              const radius = SIZE / 2 - STROKE / 2 - i * (STROKE + GAP);
              const circumference = 2 * Math.PI * radius;
              const offset = circumference * (1 - day.ratios[i]);
              const color = RING_COLORS[i];
              return (
                <g key={i} role="presentation">
                  <circle
                    className="fitness-rings__track"
                    cx={SIZE / 2}
                    cy={SIZE / 2}
                    r={radius}
                    strokeWidth={STROKE}
                    style={{ stroke: color }}
                  />
                  <circle
                    className="fitness-rings__progress"
                    cx={SIZE / 2}
                    cy={SIZE / 2}
                    r={radius}
                    strokeWidth={STROKE}
                    style={{
                      // A round cap would draw a dot on an empty ring.
                      opacity: day.ratios[i] > 0 ? 1 : 0,
                      stroke: color,
                      strokeDasharray: circumference,
                      strokeDashoffset: filled ? offset : circumference,
                      transitionDelay: `${i * 120}ms`
                    }}
                  />
                </g>
              );
            })}
          </svg>
        </div>
        <div className="fitness-card__footprint-decor">
          <svg className="fitness-card__footprint-icon" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            {/* Two shoe prints: a sole and a separate heel each, the right one ahead. */}
            <path fill="currentColor" d="M3.9 11.2C3.5 7.8 4.9 5 7.1 4.8c2.2-.2 3.7 2.4 3.5 5.5-.1 1.5-.7 2.8-.4 4.5l-5.3 1.4c-.5-1.7-.9-3.2-1-5Z" />
            <path fill="currentColor" d="M5.2 17.9l5.1-1.4c.7 2.6-.3 5-2.2 5.5-1.8.4-2.7-1.7-2.9-4.1Z" />
            <path fill="currentColor" d="M20.1 8.2c.4-3.4-1-6.2-3.2-6.4-2.2-.2-3.7 2.4-3.5 5.5.1 1.5.7 2.8.4 4.5l5.3 1.4c.5-1.7.9-3.2 1-5Z" />
            <path fill="currentColor" d="M18.8 14.9l-5.1-1.4c-.7 2.6.3 5 2.2 5.5 1.8.4 2.7-1.7 2.9-4.1Z" />
          </svg>
          <span>{day.steps.toLocaleString(lang === 'fr' ? 'fr-FR' : 'en-GB')}</span>
        </div>
      </div>
    </BentoCard>
  );
}
