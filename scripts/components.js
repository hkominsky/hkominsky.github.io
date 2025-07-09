import { initProjectPageNavigation, isHomePage } from './navigation.js';
import { applyTheme, getStoredTheme, changeTheme } from './theme.js';
import { mobileMenuInit } from './mobile-menu.js';

/**
 * Loads external HTML components like header and footer
 * Handles async loading and error states
 */
export function componentsInit() {
  fetch('/components/header/header.html')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text();
    })
    .then(data => {
      document.getElementById('header').innerHTML = data;

      // Theme is applied *after* header is loaded
      applyTheme(getStoredTheme() || "light");

      setTimeout(() => {
        mobileMenuInit();
      }, 0);

      // Initialize responsive elements if function exists
      if (typeof responsiveElementsInit === 'function') {
        responsiveElementsInit();
      }

      // Theme toggle event listener also needs to be initialized here
      const themeToggleButton = document.querySelector('.theme-toggle__button');
      if (themeToggleButton) {
        themeToggleButton.addEventListener('click', changeTheme);
      }
    })
    .catch(error => console.error("Error loading header:", error));

  fetch('/components/footer/footer.html')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text();
    })
    .then(data => {
      document.getElementById('footer').innerHTML = data;
    })
    .catch(error => console.error("Error loading footer:", error));
}

/**
 * Loads project-specific components like project navigation
 * Uses async fetch and handles errors gracefully
 */
export function projectComponentsInit() {
  fetch('/components/navigation/navigation.html')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text();
    })
    .then(data => {
      const navContainer = document.getElementById('projectNavigation');
      if (navContainer) {
        navContainer.innerHTML = data;
        initProjectPageNavigation();
      } else {
        console.warn('projectNavigation container not found.');
      }
    })
    .catch(error => console.error("Error loading project navigation:", error));
}

/**
 * Positions project card tags relative to their associated images
 * Ensures tags are properly aligned with the bottom border of project images
 */
export function positionProjectCardTags() {
  document.querySelectorAll('.project-card').forEach(card => {
    const image = card.querySelector('.project-card__image');
    const tags = card.querySelector('.project-card__tags');
    
    if (!image || !tags) return;

    const imageHeight = image.offsetHeight;
    tags.style.top = `${imageHeight}px`;
  });
}

// Set up event listeners for tag positioning
window.addEventListener('DOMContentLoaded', () => {
  if (isHomePage()) {
    positionProjectCardTags();
  }
});

window.addEventListener('resize', () => {
  if (isHomePage()) {
    positionProjectCardTags();
  }
});

/**
 * Placeholder for responsive elements initialization
 * Add your responsive functionality here if needed
 */
function responsiveElementsInit() {
  // Add any responsive initialization code here
  console.log('Responsive elements initialized');
}