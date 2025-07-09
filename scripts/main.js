import { applyTheme, getStoredTheme } from './theme.js';
import { componentsInit, projectComponentsInit, positionProjectCardTags } from './components.js';
import { contactFormInit } from './contact.js';
import { projectLinksInit, isHomePage, headerNavigationInit } from './navigation.js';
import { scrollAnimationInit, handleAnimationState } from './animations.js';

document.addEventListener("DOMContentLoaded", () => {
  // Always apply theme, components, and animations regardless of page
  applyTheme(getStoredTheme() || "light");
  componentsInit();
  scrollAnimationInit();

  // Check if this is the home page before running other functions
  if (isHomePage()) {
    // Check if animations should be skipped 
    handleAnimationState();
    
    // Initialize all core home page components
    headerNavigationInit();
    contactFormInit();
    projectLinksInit();

    // Position project card tags after layout is complete
    positionProjectCardTags();
  } else {
    projectComponentsInit();
  }
});