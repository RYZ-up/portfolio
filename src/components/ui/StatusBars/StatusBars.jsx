import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { animate, AnimatePresence, motion, useMotionValue, useReducedMotion, useTransform } from 'motion/react';
import './StatusBars.css';

// Adapted from Obsidian UI "Status Bars" (obsidianui.dev/docs/status-bars),
// in plain JS + CSS: one bar per day, oldest on the left; hover (or tap) a
// bar to read that day in a tooltip that glides between bars.
const EASE_OUT = [0.22, 1, 0.36, 1];
const TOOLTIP_SPRING = { type: 'spring', stiffness: 520, damping: 42, mass: 0.6 };

const parseIsoDate = iso => Date.UTC(+iso.slice(0, 4), +iso.slice(5, 7) - 1, +iso.slice(8, 10));

export function getDayStatus(day) {
  if (day.status) return day.status;
  if ((day.downtime ?? 0) > 0) return 'down';
  if ((day.degraded ?? 0) > 0) return 'degraded';
  return 'up';
}

export const getDayUptime = day => day.uptime ?? Math.max(0, 100 - ((day.downtime ?? 0) / 1440) * 100);

const WORDS = {
  en: { up: 'Operational', degraded: 'Degraded', down: 'Outage', none: 'No data', current: { up: 'Operational', degraded: 'Degraded performance', down: 'Outage', none: 'No data' }, checking: 'Checking…', noIncident: 'No incidents', before: 'Before tracking', uptime: 'uptime', today: 'Today', noData: 'No data yet' },
  fr: { up: 'Opérationnel', degraded: 'Dégradé', down: 'Panne', none: 'Pas de données', current: { up: 'Opérationnel', degraded: 'Service dégradé', down: 'Panne', none: 'Pas de données' }, checking: 'Vérification…', noIncident: 'Aucun incident', before: 'Avant le suivi', uptime: 'de disponibilité', today: 'Aujourd’hui', noData: 'Pas encore de données' }
};

const formatDuration = minutes =>
  minutes >= 60 ? `${Math.floor(minutes / 60)}h${minutes % 60 ? ` ${minutes % 60}m` : ''}` : `${Math.max(1, Math.round(minutes))}m`;

export default function StatusBars({ days, label, current, maxDays = 90, minBarWidth = 3, compact = false, footer = true, loading = false, lang = 'en', className = '' }) {
  const w = WORDS[lang] ?? WORDS.en;
  const locale = lang === 'fr' ? 'fr-FR' : 'en-GB';
  const reduce = useReducedMotion();
  const uid = useId();
  const wrap = useRef(null);
  const [width, setWidth] = useState(0);
  const [active, setActive] = useState(null);
  const [pinned, setPinned] = useState(false);
  const [keyboard, setKeyboard] = useState(false);

  useEffect(() => {
    const element = wrap.current;
    if (!element) return undefined;
    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const gap = 2;
  const fits = width ? Math.floor((width + gap) / (minBarWidth + gap)) : maxDays;
  const count = [maxDays, 60, 30].filter(n => n <= maxDays).find(n => n <= fits) ?? Math.max(1, fits);
  const shown = useMemo(() => {
    const tail = days.slice(-count);
    const pad = Array.from({ length: Math.max(0, count - tail.length) }, () => ({ date: '', status: 'none' }));
    return [...pad, ...tail];
  }, [days, count]);

  const measured = shown.filter(day => day.date && getDayStatus(day) !== 'none');
  const uptime = measured.length ? measured.reduce((sum, day) => sum + getDayUptime(day), 0) / measured.length : null;
  const today = days.length ? getDayStatus(days[days.length - 1]) : 'none';
  const now = current ?? today;

  const dateFormat = useMemo(() => new Intl.DateTimeFormat(locale, { weekday: 'short', month: 'short', day: 'numeric', timeZone: 'UTC' }), [locale]);
  const longFormat = useMemo(() => new Intl.DateTimeFormat(locale, { weekday: 'long', month: 'long', day: 'numeric', timeZone: 'UTC' }), [locale]);
  const axisFormat = useMemo(() => new Intl.DateTimeFormat(locale, { month: 'short', day: 'numeric', timeZone: 'UTC' }), [locale]);
  const percentFormat = useMemo(() => new Intl.NumberFormat(locale, { maximumFractionDigits: 2, minimumFractionDigits: 0 }), [locale]);
  const formatDate = (iso, format) => (iso ? format.format(parseIsoDate(iso)) : '');
  const percent = value => `${percentFormat.format(Math.floor(value * 100) / 100)} %`;
  const firstDate = shown.find(d => d.date)?.date;

  const describe = day => {
    if (!day.date) return w.none;
    const status = getDayStatus(day);
    const parts = [formatDate(day.date, longFormat), w[status]];
    if (status !== 'none') parts.push(`${percent(getDayUptime(day))} ${w.uptime}`);
    for (const incident of day.incidents ?? []) parts.push(incident.minutes ? `${incident.title} (${formatDuration(incident.minutes)})` : incident.title);
    return parts.join(', ');
  };

  // One tooltip glides between bars and stays inside the strip at both ends.
  const tooltipX = useMotionValue(0);
  const tooltipShift = useTransform(tooltipX, x => `${-Math.min(1, Math.max(0, x / (width || 1))) * 100}%`);
  const visible = useRef(false);
  const point = (index, instant) => {
    const x = ((index + 0.5) * (width + gap)) / shown.length - gap / 2;
    if (instant || !visible.current || reduce) tooltipX.jump(x);
    else animate(tooltipX, x, TOOLTIP_SPRING);
    visible.current = true;
    setActive(index);
  };
  const hide = () => {
    visible.current = false;
    setActive(null);
    setPinned(false);
    setKeyboard(false);
  };
  const indexAt = event => {
    const rect = event.currentTarget.getBoundingClientRect();
    return Math.min(shown.length - 1, Math.max(0, Math.floor(((event.clientX - rect.left) / rect.width) * shown.length)));
  };

  // A tap pins the tooltip on touch screens; the next tap elsewhere releases it.
  useEffect(() => {
    if (!pinned) return undefined;
    const away = event => {
      if (!wrap.current?.contains(event.target)) {
        visible.current = false;
        setActive(null);
        setPinned(false);
      }
    };
    document.addEventListener('pointerdown', away);
    return () => document.removeEventListener('pointerdown', away);
  }, [pinned]);

  const tipDay = active !== null ? shown[active] : null;
  const tipStatus = tipDay?.date ? getDayStatus(tipDay) : 'none';
  const cellId = index => `${uid}-day-${index}`;
  const live = !loading && (now === 'down' || now === 'degraded');

  return (
    <div className={`status-bars ${className}`} data-state={loading ? 'loading' : now} aria-busy={loading || undefined}>
      {!compact && (
        <div className="status-bars__head">
          <span className="status-bars__label">{label}</span>
          <span className="status-bars__current">
            <span aria-hidden className="status-bars__dot-wrap">
              {live && <span className={`status-bars__ping is-${now}`} />}
              <span className={`status-bars__dot is-${loading ? 'none' : now}`} />
            </span>
            {loading ? w.checking : w.current[now]}
          </span>
        </div>
      )}

      <div
        ref={wrap}
        className="status-bars__wrap"
        onPointerLeave={event => {
          if (event.pointerType === 'mouse' && !pinned && !keyboard) hide();
        }}
      >
        <div
          role="grid"
          aria-label={`${label}, ${count} days${uptime !== null ? `, ${percent(uptime)} ${w.uptime}` : ''}`}
          aria-readonly
          aria-activedescendant={keyboard && active !== null ? cellId(active) : undefined}
          tabIndex={loading ? -1 : 0}
          data-hovering={active !== null || undefined}
          className="status-bars__strip"
          style={{ gap }}
          onPointerMove={event => {
            if (loading || event.pointerType !== 'mouse' || pinned) return;
            const index = indexAt(event);
            if (index !== active) point(index, false);
          }}
          onPointerDown={event => {
            if (loading || event.pointerType === 'mouse') return;
            const index = indexAt(event);
            if (pinned && index === active) return hide();
            point(index, true);
            setPinned(true);
          }}
          onFocus={event => {
            if (!event.currentTarget.matches(':focus-visible') || loading) return;
            setKeyboard(true);
            point(active ?? shown.length - 1, true);
          }}
          onBlur={hide}
          onKeyDown={event => {
            if (loading) return;
            if (event.key === 'Escape') return hide();
            const last = shown.length - 1;
            const from = active ?? last;
            const to =
              event.key === 'ArrowLeft' ? Math.max(0, from - 1)
              : event.key === 'ArrowRight' ? Math.min(last, from + 1)
              : event.key === 'Home' ? 0
              : event.key === 'End' ? last
              : null;
            if (to === null) return;
            event.preventDefault();
            setKeyboard(true);
            point(to, true);
          }}
        >
          <div role="row" className="status-bars__row">
            {shown.map((day, index) => {
              const status = day.date ? getDayStatus(day) : 'none';
              return (
                <div
                  key={day.date || `pad-${index}`}
                  id={cellId(index)}
                  role="gridcell"
                  aria-label={describe(day)}
                  className={`status-bars__bar is-${loading ? 'loading' : status}${active === index ? ' is-active' : ''}`}
                />
              );
            })}
          </div>
        </div>

        <AnimatePresence>
          {tipDay && !loading && (
            <motion.div
              key="tip"
              aria-hidden
              className="status-bars__tip-anchor"
              style={{ x: tooltipX }}
              initial={{ opacity: 0, y: reduce ? 0 : 3 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.08 } }}
              transition={{ duration: 0.14, ease: EASE_OUT }}
            >
              <motion.div className="status-bars__tip-shift" style={{ x: tooltipShift }}>
                <div className="status-bars__tip">
                  <div className="status-bars__tip-top">
                    <span>{tipDay.date ? formatDate(tipDay.date, dateFormat) : w.before}</span>
                    {tipStatus !== 'none' && <span className="status-bars__tip-pct">{percent(getDayUptime(tipDay))}</span>}
                  </div>
                  <div className="status-bars__tip-status">
                    <span aria-hidden className={`status-bars__dot is-${tipStatus}`} />
                    {w[tipStatus]}
                  </div>
                  {tipStatus === 'up' && !tipDay.incidents?.length && <div className="status-bars__tip-note">{w.noIncident}</div>}
                  {tipDay.incidents?.map((incident, index) => (
                    <div key={index} className="status-bars__tip-incident">
                      {incident.title}
                      {incident.minutes ? <span> · {formatDuration(incident.minutes)}</span> : null}
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {!compact && footer && (
        <div className="status-bars__axis">
          <span>{firstDate ? formatDate(firstDate, axisFormat) : ''}</span>
          <i aria-hidden />
          <span className="status-bars__uptime">
            {loading ? w.checking : uptime === null ? w.noData : `${percent(uptime)} ${w.uptime}`}
          </span>
          <i aria-hidden />
          <span>{w.today}</span>
        </div>
      )}
    </div>
  );
}
