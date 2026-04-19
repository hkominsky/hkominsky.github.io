import { applyTheme, getStoredTheme, changeTheme } from '../ui/theme.ts';
import { mobileMenuInit } from '../ui/mobile-menu.ts';

/**
 * Initializes the theme system with stored or default theme
 */
function initializeTheme(): void {
  const theme: string = getStoredTheme() || "light";
  applyTheme(theme);
}

/**
 * Sets up the theme toggle button event listener
 */
function setupThemeToggle(): void {
  const themeToggleButton: HTMLElement | null = document.querySelector('.theme-toggle-button');
  if (themeToggleButton) {
    themeToggleButton.addEventListener('click', changeTheme);
  }
}

/**
 * Initializes header/footer-dependent UI (theme, mobile menu)
 */
export function componentsInit(): void {
  initializeTheme();
  mobileMenuInit();
  setupThemeToggle();
}