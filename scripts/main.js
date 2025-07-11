import { applyTheme, getStoredTheme } from './theme.js';
import { componentsInit, projectComponentsInit, initExperienceCarousel } from './components.js';
import { contactFormInit } from './contact.js';
import { projectLinksInit, isHomePage, headerNavigationInit } from './navigation.js';
import { scrollAnimationInit, handleAnimationState } from './animations.js';
import { loadProjectData } from './project-loader.js';

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
    initExperienceCarousel();
  } else {
    projectComponentsInit();
    loadProjectData();
  }
});