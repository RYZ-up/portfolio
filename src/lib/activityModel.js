// Steps in the busiest hour of a day (profile 1.0, energy 1.0).
const STEPS_PER_PEAK_HOUR = 1150;

// Daily goals the three rings are measured against.
export const GOALS = { steps: 8000, exercise: 30, stand: 12 };

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

// Steps walked during one whole hour of a given weekday.
function hourSteps(weekday, hour) {
  return profileAt(weekday, hour) * STEPS_PER_PEAK_HOUR;
}

/**
 * Everything is a running total of today, so the counter and the rings always
 * agree and both start from zero after midnight:
 *  - steps: cumulative steps (the current hour counts for the part elapsed);
 *  - exercise: brisk minutes (only hours with a sustained pace add any);
 *  - stand: hours in which the visitor moved enough to count as standing.
 */
export function getDayProgress(date = new Date()) {
  const weekday = date.getDay();
  const hour = date.getHours();
  const frac = (date.getMinutes() * 60 + date.getSeconds()) / 3600;

  let steps = 0;
  let exercise = 0;
  let stand = 0;
  for (let h = 0; h <= hour; h++) {
    const part = h === hour ? frac : 1;
    const s = hourSteps(weekday, h);
    steps += s * part;
    exercise += Math.min(1, Math.max(0, (s - 400) / 600)) * 7 * part;
    if (s * part >= 250) stand++;
  }
  return {
    steps: Math.round(steps),
    exercise: Math.round(exercise),
    stand,
    // Real fractions, 0..1 (an untouched ring stays empty, a finished one is full).
    ratios: [
      Math.min(1, steps / GOALS.steps),
      Math.min(1, exercise / GOALS.exercise),
      Math.min(1, stand / GOALS.stand)
    ]
  };
}
