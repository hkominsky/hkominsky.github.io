import { initProjectPageNavigation } from '../navigation/navigation.js';
import { applyTheme, getStoredTheme, changeTheme } from '../ui/theme.js';
import { mobileMenuInit } from '../ui/mobile-menu.js';

/**
 * Fetches HTML from a given URL and inserts it into a target element by ID.
 * @param {string} url - URL to fetch HTML from
 * @param {string} targetElementId - ID of the element to insert HTML into
 * @returns {Promise<void>} Promise that resolves when HTML is fetched and inserted
 */
async function fetchAndInsertHTML(url, targetElementId) {
  try {
    const html = await fetchHTML(url);
    insertHTMLIntoElement(html, targetElementId);
  } catch (error) {
    console.error(`Error loading ${targetElementId}:`, error);
  }
}

/**
 * Fetches HTML content from a URL
 * @param {string} url - URL to fetch from
 * @returns {Promise<string>} The HTML content
 * @throws {Error} If the fetch fails or returns a non-OK status
 */
async function fetchHTML(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.text();
}

/**
 * Inserts HTML content into a target element
 * @param {string} html - The HTML content to insert
 * @param {string} elementId - The ID of the target element
 */
function insertHTMLIntoElement(html, elementId) {
  const targetElement = document.getElementById(elementId);
  if (targetElement) {
    targetElement.innerHTML = html;
  } else {
    console.warn(`Element with ID "${elementId}" not found.`);
  }
}

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
 * Loads external HTML components like header and footer
 */
export async function componentsInit() {
  await fetchAndInsertHTML('/components/header/header.html', 'header');
  
  initializeTheme();
  mobileMenuInit();
  setupThemeToggle();
  
  await fetchAndInsertHTML('/components/footer/footer.html', 'footer');
}

/**
 * Loads project-specific components like project navigation
 */
export async function projectComponentsInit() {
  await fetchAndInsertHTML('/components/navigation/navigation.html', 'projectNavigation');
  
  const navContainer = document.getElementById('projectNavigation');
  if (navContainer) {
    initProjectPageNavigation();
  }
}