import { projectPageNavigationInit } from '../navigation/navigation.js';
import { applyTheme, getStoredTheme, changeTheme } from '../ui/theme.js';
import { mobileMenuInit } from '../ui/mobile-menu.js';

/**
 * Initializes the theme system with stored or default theme
 */
function initializeTheme() {
  const theme = getStoredTheme() || "light";
  applyTheme(theme);
}

/**
 * Sets up the theme toggle button event listener
 */
function setupThemeToggle() {
  const themeToggleButton = document.querySelector('.theme-toggle-button');
  if (themeToggleButton) {
    themeToggleButton.addEventListener('click', changeTheme);
  }
}

/**
 * Initializes header/footer-dependent UI (theme, mobile menu)
 */
export function componentsInit() {
  initializeTheme();
  mobileMenuInit();
  setupThemeToggle();
}