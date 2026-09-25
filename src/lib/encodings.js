import { useSyncExternalStore } from 'react';
import { isLowPower } from './device.js';

// Notations the left column cycles through, plus the shared clock that keeps
// whole page in step (see encodeDom.js). `null` encode = the normal readable text.
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
  { label: 'hex', encode: s => bytes(s).map(b => '0x' + b.toString(16).toUpperCase().padStart(2, '0')).join(' ') },
  { label: 'morse', encode: toMorse },
  { label: 'ascii', encode: s => bytes(s).join(' ') },
  { label: 'octal', encode: s => bytes(s).map(b => '0o' + b.toString(8).padStart(3, '0')).join(' ') },
  { label: 'base64', encode: s => 'b64:' + btoa(bytes(s).map(b => String.fromCharCode(b)).join('')) }
];

// Scheduling. At start-up only: hex 2 s, morse 2 s, then the real text for
// good. After that nothing rotates any more: the page stays in its language
// until another one is picked in the language menu. The start-up pass only runs
// on a desktop-class screen; a notation picked in the menu is permanent and
// works everywhere.
const IDX = label => FORMATS.findIndex(f => f.label === label);
const INTRO = [
  { i: IDX('hex'), ms: 2000 },
  { i: IDX('morse'), ms: 2000 },
  { i: 0, ms: 0 } // resting state: no timer
];
const REST = INTRO.length - 1;
const stepAt = n => INTRO[Math.min(n, REST)];

const AUTO_MQ = '(min-width: 1200px) and (hover: hover) and (pointer: fine)';
const STORAGE_KEY = 'portfolio-code';
// Not on small machines either: each pass re-measures and rewrites every text
// block of the page, a visible hitch on a weak CPU right after load.
const autoAllowed = () =>
  !isLowPower &&
  typeof matchMedia === 'function' &&
  matchMedia(AUTO_MQ).matches &&
  !matchMedia('(prefers-reduced-motion: reduce)').matches;

function loadChoice() {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return FORMATS.some(f => f.encode && f.label === v) ? v : null;
  } catch {
    return null;
  }
}

let choice = loadChoice();
let stepNo = 0;
let index = 0;
let timer = null;
const listeners = new Set();
const choiceListeners = new Set();

const notify = () => listeners.forEach(l => l());

function step() {
  stepNo = Math.min(stepNo + 1, REST);
  index = stepAt(stepNo).i;
  notify();
  timer = stepNo < REST ? setTimeout(step, stepAt(stepNo).ms) : null;
}

// Recompute the current notation (and its timer) from the state above.
function settle() {
  clearTimeout(timer);
  timer = null;
  if (choice) index = IDX(choice);
  else if (listeners.size && stepNo < REST && autoAllowed()) {
    index = stepAt(stepNo).i;
    timer = setTimeout(step, stepAt(stepNo).ms);
  } else {
    // The start-up pass is decided once: if it is not allowed right now (phone,
    // reduced motion, ...) it is dropped for the whole visit, so rotating the
    // device or resizing the window later can never bring hex / morse back.
    if (!choice) stepNo = REST;
    index = 0;
  }
}

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
  if (!label) stepNo = REST; // back to a real language: stay there
  settle();
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

const onMediaChange = () => {
  settle();
  notify();
};

export function subscribeFormat(listener) {
  listeners.add(listener);
  if (listeners.size === 1) {
    matchMedia(AUTO_MQ).addEventListener?.('change', onMediaChange);
    matchMedia('(prefers-reduced-motion: reduce)').addEventListener?.('change', onMediaChange);
    settle();
  }
  return () => {
    listeners.delete(listener);
    if (!listeners.size) {
      matchMedia(AUTO_MQ).removeEventListener?.('change', onMediaChange);
      matchMedia('(prefers-reduced-motion: reduce)').removeEventListener?.('change', onMediaChange);
      clearTimeout(timer);
      timer = null;
    }
  };
}
