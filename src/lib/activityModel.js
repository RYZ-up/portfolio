export const STEPS_MIN = 10;
export const STEPS_MAX = 2954;

// Activity profile per hour of day (0–1). Anchors are interpolated linearly
// between whole hours so the value glides through the day instead of jumping.
// Weekdays: commute peaks, lunch walk, evening errands. Weekends: later start,
// broad late-morning / afternoon outing. Friday and Saturday evenings run later.
const WEEKDAY = [
  0.00, 0.00, 0.00, 0.00, 0.00, 0.03, 0.12, 0.45, 0.95, 0.55, 0.30, 0.42,
  0.78, 0.60, 0.28, 0.30, 0.38, 0.62, 0.90, 0.55, 0.30, 0.16, 0.06, 0.01
];
const WEEKEND = [
  0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.02, 0.06, 0.14, 0.32, 0.62, 0.85,
  0.75, 0.55, 0.70, 0.92, 0.80, 0.60, 0.48, 0.38, 0.30, 0.20, 0.10, 0.03
];
const LATE_NIGHT = [0.14, 0.08, 0.03, 0, 0]; // Fri/Sat after-midnight carry-over (h 0..4)

// Per-day energy multiplier (Sun..Sat): mid-week is busiest, Sunday laziest.
const DAY_ENERGY = [0.72, 0.9, 1.0, 0.96, 1.0, 0.94, 1.0];

function hashInt(n) {
  let x = n | 0;
  x = ((x >> 16) ^ x) * 0x45d9f3b;
  x = ((x >> 16) ^ x) * 0x45d9f3b;
  x = (x >> 16) ^ x;
  return x >>> 0;
}

// Deterministic 0–1 jitter per weekday+hour: same hour, same value on every render.
function jitter(weekday, hour) {
  return (hashInt(weekday * 31 + hour * 7 + 12345) % 1000) / 1000;
}

function profileAt(weekday, hour) {
  const weekend = weekday === 0 || weekday === 6;
  const base = (weekend ? WEEKEND : WEEKDAY)[hour];
  const prevDay = (weekday + 6) % 7;
  const carry = hour < LATE_NIGHT.length && (prevDay === 5 || prevDay === 6) ? LATE_NIGHT[hour] : 0;
  const level = Math.max(base, carry);
  const noise = 0.85 + jitter(weekday, hour) * 0.3; // ±15% per hour, stable
  return level * DAY_ENERGY[weekday] * noise;
}

export function getStepsAt(date = new Date()) {
  const weekday = date.getDay();
  const hour = date.getHours();
  const t = date.getMinutes() / 60;
  const nextWeekday = hour === 23 ? (weekday + 1) % 7 : weekday;
  const a = profileAt(weekday, hour);
  const b = profileAt(nextWeekday, (hour + 1) % 24);
  const level = a + (b - a) * t;
  const steps = STEPS_MIN + level * (STEPS_MAX - STEPS_MIN);
  return Math.round(Math.min(STEPS_MAX, Math.max(STEPS_MIN, steps)));
}

// Three ring fill percents (15–96) derived from the live step count plus how
// the rest of the day has gone, so rings and counter always tell one story.
export function getRingPercents(date = new Date()) {
  const steps = getStepsAt(date);
  const weekday = date.getDay();
  const hour = date.getHours();
  const move = steps / STEPS_MAX;

  let dayTotal = 0;
  let goneTotal = 0;
  for (let h = 0; h < 24; h++) {
    const s = getStepsAt(new Date(2024, 0, 7 + weekday, h, 30));
    dayTotal += s;
    if (h <= hour) goneTotal += s;
  }
  const progress = goneTotal / dayTotal;

  let activeHours = 0;
  for (let h = 0; h <= hour; h++) {
    if (getStepsAt(new Date(2024, 0, 7 + weekday, h, 30)) > 600) activeHours++;
  }
  const stand = Math.min(1, activeHours / 12);

  const clamp = v => Math.round(15 + Math.min(1, Math.max(0, v)) * 81);
  return [clamp(move), clamp(progress), clamp(stand)];
}
