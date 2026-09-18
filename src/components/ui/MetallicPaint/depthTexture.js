import { computeDepthMap } from './depthMap.js';

// Depth textures are built once per image and cached for the whole session, so a
// remount (the page remounts every card on a language switch) or a second
// consumer never pays for the solve again.
//
// The texture only ever fills a card-sized box (a few hundred px), so 512px is
// plenty; the old 500-1000px range cost 4x more CPU for no visible gain.
const MAX_SIZE = 512;
const MIN_SIZE = 256;

const cache = new Map(); // src -> Promise<ImageData>

let worker = null;
let workerBroken = false;
let nextId = 1;
const pending = new Map();

function getWorker() {
  if (workerBroken || typeof Worker === 'undefined') return null;
  if (worker) return worker;
  try {
    worker = new Worker(new URL('./depthWorker.js', import.meta.url), { type: 'module' });
    worker.onmessage = ({ data: { id, out } }) => {
      pending.get(id)?.resolve(out);
      pending.delete(id);
    };
    worker.onerror = () => {
      workerBroken = true;
      worker = null;
      pending.forEach(({ reject }) => reject(new Error('depth worker failed')));
      pending.clear();
    };
  } catch {
    workerBroken = true;
    worker = null;
  }
  return worker;
}

// Not transferred (structured copy, ~1 MB): if the worker fails the main thread
// can still solve from the same pixels.
function solve(data, width, height) {
  const w = getWorker();
  const onMainThread = () => computeDepthMap(data, width, height);
  if (!w) return Promise.resolve(onMainThread());
  return new Promise((resolve, reject) => {
    const id = nextId++;
    pending.set(id, { resolve, reject });
    w.postMessage({ id, data, width, height });
  }).catch(onMainThread);
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('image failed to load'));
    img.src = src;
  });
}

async function build(src) {
  const img = await loadImage(src);
  // SVGs without an intrinsic size report 0 in some browsers: fall back to a square.
  let width = img.naturalWidth || MAX_SIZE;
  let height = img.naturalHeight || MAX_SIZE;
  const longest = Math.max(width, height);
  const scale = longest > MAX_SIZE ? MAX_SIZE / longest : longest < MIN_SIZE ? MIN_SIZE / longest : 1;
  width = Math.max(1, Math.round(width * scale));
  height = Math.max(1, Math.round(height * scale));

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  ctx.drawImage(img, 0, 0, width, height);
  const { data } = ctx.getImageData(0, 0, width, height);

  const out = await solve(data, width, height);
  return new ImageData(out, width, height);
}

export function loadDepthImageData(src) {
  let promise = cache.get(src);
  if (!promise) {
    promise = build(src);
    cache.set(src, promise);
    promise.catch(() => cache.delete(src)); // a failure may be retried
  }
  return promise;
}
