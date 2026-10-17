import { useSyncExternalStore } from 'react';

// Optional notations selected in the language menu. `null` encode = readable text.
const bytes = s => Array.from(new TextEncoder().encode(s));

const MORSE = {
  a: '.-', b: '-...', c: '-.-.', d: '-..', e: '.', f: '..-.', g: '--.', h: '....', i: '..', j: '.---',
  k: '-.-', l: '.-..', m: '--', n: '-.', o: '---', p: '.--.', q: '--.-', r: '.-.', s: '...', t: '-',
  u: '..-', v: '...-', w: '.--', x: '-..-', y: '-.--', z: '--..',
  0: '-----', 1: '.----', 2: '..---', 3: '...--', 4: '....-', 5: '.....', 6: '-....', 7: '--...', 8: '---..', 9: '----.',
  '.': '.-.-.-', ',': '--..--', '?': '..--..', '!': '-.-.--', ':': '---...', '@': '.--.-.', '-': '-....-', "'": '.----.', '/': '-..-.'
};

function toMorse(s) {
  const plain = s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[’‘]/g, "'").toLowerCase();
  return plain
    .split(/\s+/)
    .filter(Boolean)
    .map(word => Array.from(word).map(c => MORSE[c]).filter(Boolean).join(' '))
    .join(' / ');
}

export const FORMATS = [
  { label: 'text', encode: null },
  { label: 'binary', encode: s => '0b' + bytes(s).map(b => b.toString(2).padStart(8, '0')).join(' ') },
  { label: 'morse', encode: toMorse }
];

const IDX = label => FORMATS.findIndex(f => f.label === label);
const STORAGE_KEY = 'portfolio-code';

function loadChoice() {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return FORMATS.some(f => f.encode && f.label === v) ? v : null;
  } catch {
    return null;
  }
}

let choice = loadChoice();
let index = choice ? IDX(choice) : 0;
const listeners = new Set();
const choiceListeners = new Set();

const notify = () => listeners.forEach(l => l());

export const getFormatIndex = () => index;
export const getChoice = () => choice;

/** Pick a notation for good (label), or go back to a real language (null). */
export function setChoice(label) {
  choice = label;
  try {
    if (label) localStorage.setItem(STORAGE_KEY, label);
    else localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
  index = choice ? IDX(choice) : 0;
  notify();
  choiceListeners.forEach(l => l());
}

export const useCodeChoice = () =>
  useSyncExternalStore(
    l => {
      choiceListeners.add(l);
      return () => choiceListeners.delete(l);
    },
    getChoice,
    () => null
  );

export function subscribeFormat(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
