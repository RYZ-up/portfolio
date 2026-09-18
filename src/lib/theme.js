// Theme helpers. Storage can be unavailable (private mode, blocked cookies):
// every access is guarded so a locked-down browser degrades to "dark" instead
// of throwing and unmounting the app.
const BAR_COLORS = { dark: '#0a0a0c', light: '#1f1f23' };

export function readStoredTheme() {
  try {
    return localStorage.getItem('theme') === 'light';
  } catch {
    return false;
  }
}

export function storeTheme(isLight) {
  try {
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  } catch {
    /* storage unavailable: the theme just won't persist */
  }
}

/** Switches the root class and the browser-UI colour (Android/Safari address bar). */
export function applyTheme(isLight) {
  document.documentElement.classList.toggle('theme-light', isLight);
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', isLight ? BAR_COLORS.light : BAR_COLORS.dark);
}
