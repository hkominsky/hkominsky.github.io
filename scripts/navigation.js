// Centralized project list with full URL paths
const projectMap = [
  { path: 'projects/pages/pickaxe-knockout/' },
  { path: 'projects/pages/code-scout/' },
  { path: 'projects/pages/endzone-analytics/' },
  { path: 'projects/pages/myolog/' },
  { path: 'projects/pages/market-brief/' },
  { path: 'projects/pages/perks-ffa/' }
];

/**
 * Navigates to a project using full URLs
 * @param {number} index - Index in the projectMap array
 */
function goToProject(index) {
  const project = projectMap[index];
  if (project) {
    window.location.href = '/' + project.path;
  }
}

/**
 * Gets the current project index based on the URL path
 * @returns {number} Current project index, or -1 if not found
 */
function getCurrentProjectIndex() {
  const currentPath = window.location.pathname.replace(/^\/+/, '').replace(/\/+$/, '');

  return projectMap.findIndex(p => p.path.replace(/\/+$/, '') === currentPath);
}

/**
 * Enables or disables a navigation button based on index bounds
 * @param {HTMLElement} button - The navigation button element
 * @param {boolean} isActive - Whether the button should be enabled
 * @param {Function} handler - The function to call on click
 */
function configureNavButton(button, isActive, handler) {
  if (!button) return;

  const newButton = button.cloneNode(true);
  button.parentNode.replaceChild(newButton, button);

  if (isActive) {
    newButton.classList.remove('disabled');
    newButton.style.opacity = 1;
    newButton.style.pointerEvents = 'auto';
    newButton.addEventListener('click', handler);
  } else {
    newButton.classList.add('disabled');
    newButton.style.opacity = 0.5;
    newButton.style.pointerEvents = 'none';
  }
}

/**
 * Maps bento grid project cards to detail page clicks
 */
export function projectLinksInit() {
  const cards = document.querySelectorAll('.project-card');
  cards.forEach((card, index) => {
    if (card.classList.contains('project-card-disabled')) return;

    card.style.cursor = "pointer";
    card.addEventListener('click', (e) => {
      e.preventDefault();
      goToProject(index);
    });
  });
}

/**
 * Initializes navigation buttons on project pages
 */
export function initProjectPageNavigation() {
  const currentIndex = getCurrentProjectIndex();

  if (currentIndex === -1) return;

  const lastBtn = document.querySelector('.project-navigation-last');
  const nextBtn = document.querySelector('.project-navigation-next');

  configureNavButton(lastBtn, currentIndex > 0, () => goToProject(currentIndex - 1));
  configureNavButton(nextBtn, currentIndex < projectMap.length - 1, () => goToProject(currentIndex + 1));
}

/**
 * Gets the project name from the current URL for data loading
 * @returns {string} Project name/folder
 */
export function getProjectName() {
  const path = window.location.pathname.replace(/^\/+/, '').replace(/\/+$/, '');

  const pathMatch = path.match(/^projects\/pages\/([^\/]+)/);
  if (pathMatch) {
    return pathMatch[1];
  }

  const filename = path.split('/').pop();
  return filename.replace('.html', '');
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

/**
 * Initializes navigation and smooth scrolling functionality
 * Handles hash-based navigation and smooth scroll behavior
 */
export function headerNavigationInit() {
  const pageOffset = 110;

  setTimeout(() => {
    if (window.location.hash) {
      scrollToSection(window.location.hash.substring(1), pageOffset);
    }
  }, 100);

  document.addEventListener('click', (e) => {
    const anchor = e.target.closest("a[href^='#']");
    if (anchor) {
      const href = anchor.getAttribute("href");
      const sectionId = href.substring(1);

      if (sectionId && document.getElementById(sectionId)) {
        e.preventDefault();

        scrollToSection(sectionId, pageOffset);

        history.replaceState(null, '', `#${sectionId}`);
      }
    }
  });

  window.addEventListener('hashchange', () => {
    if (window.location.hash) {
      scrollToSection(window.location.hash.substring(1), pageOffset);
    }
  });
}

/**
 * Scrolls to a specific section with smooth animation
 * @param {string} sectionId - The ID of the section to scroll to
 * @param {number} offset - Pixel offset from the top of the section
 */
function scrollToSection(sectionId, offset) {
  const targetElement = document.getElementById(sectionId);
  if (targetElement) {
    window.scrollTo({
      top: targetElement.offsetTop - offset,
      behavior: "smooth"
    });
  }
}