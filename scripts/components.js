import { initProjectPageNavigation, isHomePage } from './navigation.js';
import { applyTheme, getStoredTheme, changeTheme } from './theme.js';
import { mobileMenuInit } from './mobile-menu.js';

/**
 * Fetches HTML from a given URL and inserts it into a target element by ID.
 * Handles fetch errors and logs them.
 * @param {string} url - URL to fetch HTML from
 * @param {string} targetElementId - ID of the element to insert HTML into
 * @returns {Promise<void>}
 */
async function fetchAndInsertHTML(url, targetElementId) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const html = await response.text();
    const targetElement = document.getElementById(targetElementId);
    if (targetElement) {
      targetElement.innerHTML = html;
    } else {
      console.warn(`Element with ID "${targetElementId}" not found.`);
    }
  } catch (error) {
    console.error(`Error loading ${targetElementId}:`, error);
  }
}

/**
 * Loads external HTML components like header and footer
 * Applies theme and initializes mobile menu and theme toggle after header loads
 */
export async function componentsInit() {
  await fetchAndInsertHTML('/components/header/header.html', 'header');

  applyTheme(getStoredTheme() || "light");

  // Initialize mobile menu after header is inserted
  mobileMenuInit();

  const themeToggleButton = document.querySelector('.theme-toggle__button');
  if (themeToggleButton) {
    themeToggleButton.addEventListener('click', changeTheme);
  }

  await fetchAndInsertHTML('/components/footer/footer.html', 'footer');
}

/**
 * Loads project-specific components like project navigation
 * Initializes project page navigation after insertion
 */
export async function projectComponentsInit() {
  await fetchAndInsertHTML('/components/navigation/navigation.html', 'projectNavigation');

  const navContainer = document.getElementById('projectNavigation');
  if (navContainer) {
    initProjectPageNavigation();
  }
}