import { computeDepthMap } from './depthMap.js';

// Solves the depth map off the main thread so page load and scrolling never
// stall on it.
self.onmessage = event => {
  const { id, data, width, height } = event.data;
  const out = computeDepthMap(data, width, height);
  self.postMessage({ id, out, width, height }, [out.buffer]);
};
