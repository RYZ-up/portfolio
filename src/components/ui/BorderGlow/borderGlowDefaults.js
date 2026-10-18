export const borderGlowDefaults = {
  glowColor: '256 90% 74%',
  glowIntensity: 0.35,
  glowRadius: 24,
  borderRadius: 14,
  backgroundColor: '#fbf8f2',
  // Kept subtle on purpose (user: the hover was far too strong): about ±3°.
  tiltAmplitude: 1.5,
  // A full rainbow spread instead of a purple/blue-only trio, so the mesh
  // glow that follows the cursor reads as genuinely multicolor everywhere
  // this config is used (every bento card + the sidebar block).
  colors: ['#7C5CFF', '#ff6ec7', '#4ade80', '#38bdf8', '#2dd4bf', '#fbbf24', '#fb7185'],
  edgeSensitivity: 5
};
