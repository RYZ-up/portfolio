// "Small machine" detection, decided once per visit: few CPU threads or little
// memory (entry-level laptops, usually with an integrated GPU), or the
// browser's data-saver switch. Only purely decorative, always-running
// effects are dropped there; the page itself looks the same.
// `deviceMemory` only exists in Chromium, elsewhere the thread count decides.
export const isLowPower = (() => {
  if (typeof navigator === 'undefined') return false;
  const cores = navigator.hardwareConcurrency || 8;
  const memory = navigator.deviceMemory || 8;
  return cores <= 4 || memory <= 4 || navigator.connection?.saveData === true;
})();
