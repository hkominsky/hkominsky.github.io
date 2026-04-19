import { applyTheme, getStoredTheme } from '../ui/theme.ts';
import { componentsInit } from './components.ts';
import { projectLinksInit, isHomePage, projectPageNavigationInit } from '../navigation/navigation.ts';
import { headerNavigationInit } from '../navigation/header-navigation.ts';
import { scrollAnimationInit, handleAnimationState } from '../ui/animations.ts';
import { loadProjectData } from '../projects/project-loader.ts';

// Handles content loading
document.addEventListener("DOMContentLoaded", (): void => {
  applyTheme(getStoredTheme() || "light");
  componentsInit();
  scrollAnimationInit();
 
  if (isHomePage()) {
    handleAnimationState();
    headerNavigationInit();
    projectLinksInit();
  } else {
    projectPageNavigationInit();
    loadProjectData();
  }
});