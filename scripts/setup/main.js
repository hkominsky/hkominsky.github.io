import { applyTheme, getStoredTheme } from '../ui/theme.js';
import { componentsInit } from './components.js';
import { initExperienceCarousel } from '../ui/carousel.js';
import { projectLinksInit, isHomePage, projectPageNavigationInit } from '../navigation/navigation.js';
import { headerNavigationInit } from '../navigation/header-navigation.js';
import { scrollAnimationInit, handleAnimationState } from '../ui/animations.js';
import { loadProjectData } from '../projects/project-loader.js';

// Handles content loading.
document.addEventListener("DOMContentLoaded", () => {
  applyTheme(getStoredTheme() || "light");
  componentsInit();
  scrollAnimationInit();
 
  if (isHomePage()) {
    handleAnimationState();
    headerNavigationInit();
    projectLinksInit();
    initExperienceCarousel();
  } else {
    projectPageNavigationInit();
    loadProjectData();
  }
});