// Deterministic "online / do not disturb / offline" schedule for the Status card.
//
// Weekdays (Mon–Fri): online from a late-morning start through the evening and
// into the night, usually until ~2h30, sometimes until ~5h. Short offline
// breaks for lunch and dinner. Weekends behave differently: later start, a
// long afternoon break, and a slightly earlier night.
//
// While online, focus blocks switch the status to "do not disturb": a work
// session in the afternoon and a late-evening one on weekdays, a single evening
// block on weekends.
//
// Everything is derived from the calendar date (Europe/Paris), so the same
// moment always gives the same answer on every render and for every visitor.

const TZ = 'Europe/Paris';

function hashInt(n) {
  let x = n | 0;
  x = ((x >> 16) ^ x) * 0x45d9f3b;
  x = ((x >> 16) ^ x) * 0x45d9f3b;
  x = (x >> 16) ^ x;
  return x >>> 0;
}

// 0–1 value, stable for a given (day number, salt).
const rand = (dayNum, salt) => (hashInt(dayNum * 131 + salt * 7919 + 17) % 1000) / 1000;

const between = (dayNum, salt, lo, hi) => lo + rand(dayNum, salt) * (hi - lo);

// Wall-clock parts in Paris, plus a day number that is unique per calendar date.
function parisParts(date) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: TZ,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    hourCycle: 'h23'
  }).formatToParts(date);
  const get = type => parts.find(p => p.type === type)?.value;
  const weekdayIndex = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
  const dayNum = Math.floor(Date.UTC(+get('year'), +get('month') - 1, +get('day')) / 86400000);
  return { dayNum, weekday: weekdayIndex, minutes: +get('hour') * 60 + +get('minute') };
}

const weekdayOf = dayNum => new Date(dayNum * 86400000).getUTCDay();

// Session for a given day, in minutes from that day's midnight. `end` may go
// past 1440 (it then continues into the next morning). `breaks` are offline gaps.
function sessionFor(dayNum) {
  const weekend = [0, 6].includes(weekdayOf(dayNum));

  if (!weekend) {
    const start = between(dayNum, 1, 9 * 60, 10 * 60 + 45);
    // ~25% of weekday nights run until ~5h, the rest until about 2h30.
    const late = rand(dayNum, 2) < 0.25;
    const end = 24 * 60 + (late ? between(dayNum, 3, 4 * 60 + 30, 5 * 60 + 10) : between(dayNum, 4, 2 * 60, 2 * 60 + 45));
    const lunch = between(dayNum, 5, 12 * 60 + 40, 13 * 60 + 30);
    const dinner = between(dayNum, 6, 19 * 60 + 30, 20 * 60 + 30);
    const focusPm = between(dayNum, 15, 14 * 60 + 15, 15 * 60 + 30);
    const focusNight = between(dayNum, 16, 22 * 60, 22 * 60 + 40);
    return {
      start,
      end,
      breaks: [
        [lunch, lunch + between(dayNum, 7, 30, 55)],
        [dinner, dinner + between(dayNum, 8, 35, 60)]
      ],
      dnd: [
        [focusPm, focusPm + between(dayNum, 17, 100, 170)],
        [focusNight, focusNight + between(dayNum, 18, 60, 100)]
      ]
    };
  }

  const start = between(dayNum, 11, 11 * 60 + 30, 13 * 60 + 30);
  const end = 24 * 60 + between(dayNum, 12, 30, 3 * 60 + 30);
  const outing = between(dayNum, 13, 15 * 60, 16 * 60 + 30);
  const focus = between(dayNum, 19, 18 * 60 + 30, 20 * 60);
  return {
    start,
    end,
    breaks: [[outing, outing + between(dayNum, 14, 90, 180)]],
    dnd: [[focus, focus + between(dayNum, 20, 70, 120)]]
  };
}

const inside = (m, [a, b]) => m >= a && m < b;

/** Presence at a given moment: 'online', 'dnd' (do not disturb) or 'offline'. */
export function getPresenceAt(date = new Date()) {
  const { dayNum, minutes } = parisParts(date);

  // Tail of yesterday's session that runs past midnight.
  const yesterday = sessionFor(dayNum - 1);
  const yMinutes = minutes + 1440;
  if (yMinutes < yesterday.end && !yesterday.breaks.some(b => inside(yMinutes, b))) {
    return yesterday.dnd.some(b => inside(yMinutes, b)) ? 'dnd' : 'online';
  }

  const today = sessionFor(dayNum);
  if (minutes < today.start || minutes >= today.end) return 'offline';
  if (today.breaks.some(b => inside(minutes, b))) return 'offline';
  return today.dnd.some(b => inside(minutes, b)) ? 'dnd' : 'online';
}
