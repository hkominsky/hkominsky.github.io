import { applyTheme, getStoredTheme } from './theme.js';
import { componentsInit, projectComponentsInit } from './components.js';
import { contactFormInit } from './contact.js';
import { projectLinksInit, isHomePage, headerNavigationInit, validateAndRedirect } from './navigation.js';
import { scrollAnimationInit, handleAnimationState } from './animations.js';

// Checks if the current url is valid. Redirects if not.
validateAndRedirect();

// Handles content loading.
document.addEventListener("DOMContentLoaded", () => {
  // Applies global components and stylings
  applyTheme(getStoredTheme() || "light");
  componentsInit();
  scrollAnimationInit();

  // Check if on the home page
  if (isHomePage()) {
    handleAnimationState();
    headerNavigationInit();
    contactFormInit();
    projectLinksInit();
  } else {
    projectComponentsInit();
  }
});