// Centralized project list
const projectMap = [
  'projects/pages/pickaxe-knockout.html',
  'projects/pages/code-scout.html',
  'projects/pages/endzone-analytics.html',
];

/**
 * Navigates to a project by index
 * @param {number} index - Index in the projectMap array
 */
function goToProject(index) {
  const url = projectMap[index];
  if (url) {
    window.location.href = '/' + url;
  }
}

/**
 * Enables or disables a navigation button based on index bounds
 * @param {HTMLElement} button - The navigation button element
 * @param {boolean} isActive - Whether the button should be enabled
 * @param {Function} handler - The function to call on click
 */
function configureNavButton(button, isActive, handler) {
  if (!button) return;

  if (isActive) {
    button.classList.remove('disabled');
    button.style.opacity = 1;
    button.style.pointerEvents = 'auto';
    button.addEventListener('click', handler);
  } else {
    button.classList.add('disabled');
    button.style.opacity = 0.5;
    button.style.pointerEvents = 'none';
  }
}

/**
 * Maps bento grid project cards to detail page clicks
 */
export function projectLinksInit() {
  const cards = document.querySelectorAll('.project-card');
  cards.forEach((card, index) => {
    if (card.classList.contains('project-card--disabled')) return;

    card.style.cursor = "pointer";
    card.addEventListener('click', () => goToProject(index));
  });
}

/**
 * Initializes navigation buttons on project pages
 */
export function initProjectPageNavigation() {
  const currentPath = window.location.pathname.replace(/^\/+/, '');
  const currentIndex = projectMap.indexOf(currentPath);

  const lastBtn = document.querySelector('.project-navigation--last');
  const nextBtn = document.querySelector('.project-navigation--next');

  configureNavButton(lastBtn, currentIndex > 0, () => goToProject(currentIndex - 1));
  configureNavButton(nextBtn, currentIndex < projectMap.length - 1, () => goToProject(currentIndex + 1));
}

/**
 * Determines if the current page is the home page
 * @returns {boolean} True if this is the home page, false otherwise
 */
export function isHomePage() {
  const homeElements = [
    '#projects',
    '#contact',
    '.project-card'
  ];
  
  const hasHomeElements = homeElements.some(selector => 
    document.querySelector(selector) !== null
  );
  
  const projectElements = [
    '.project-container',
    '.project-hero',
    '.project-overview'
  ];
  
  const hasProjectElements = projectElements.some(selector => 
    document.querySelector(selector) !== null
  );
  
  return hasHomeElements && !hasProjectElements;
}