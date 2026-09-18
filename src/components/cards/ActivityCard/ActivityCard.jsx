import { useEffect, useMemo, useState } from 'react';
import { FaShoePrints } from 'react-icons/fa';
import { GaugeIcon } from '../../icons/index.js';
import { BentoCard } from '../../ui/BentoCard/BentoCard.jsx';
import { fitness } from '../../../data/stats.js';
import { getRingPercents, getStepsAt } from '../../../lib/activityModel.js';
import { useI18n } from '../../../i18n/I18nProvider.jsx';
import './ActivityCard.css';

const SIZE = 196;
const STROKE = 21;
const GAP = 7;

const RING_COLORS = ['#ff3b5c', '#8fbf3f', '#22d3ee'];

export default function ActivityCard() {
  const { t } = useI18n();
  const [filled, setFilled] = useState(false);
  const [now, setNow] = useState(() => new Date());
  const steps = useMemo(() => getStepsAt(now), [now]);
  const ringPercents = useMemo(() => getRingPercents(now), [now]);

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
            <GaugeIcon aria-hidden size="1.2em" /> {t('hdr.fitness')}
          </span>
        </div>
        <div className="fitness-card__rings">
          <svg className="fitness-rings" viewBox={`0 0 ${SIZE} ${SIZE}`} width={SIZE} height={SIZE}>
            {fitness.rings.map((_, i) => {
              const radius = SIZE / 2 - STROKE / 2 - i * (STROKE + GAP);
              const circumference = 2 * Math.PI * radius;
              const offset = circumference * (1 - ringPercents[i] / 100);
              const color = RING_COLORS[i];
              return (
                <g key={i}>
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
          <FaShoePrints size="1em" className="fitness-card__footprint-icon" />
          <span>{steps}</span>
        </div>
      </div>
    </BentoCard>
  );
}
