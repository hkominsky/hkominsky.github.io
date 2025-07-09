/**
 * Initializes mobile menu functionality
 * Sets up menu toggle, click handlers, and outside click detection
 */
export function mobileMenuInit() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav__list');
  const header = document.querySelector('.header');
  
  if (!menuToggle || !navMenu) return;

  menuToggle.addEventListener('click', () => toggleMenu(menuToggle, navMenu, header));

  document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => toggleMenu(menuToggle, navMenu, header, false));
  });

  document.addEventListener('click', (event) => {
    if (!navMenu.contains(event.target) && 
        !menuToggle.contains(event.target) && 
        navMenu.classList.contains('nav__list--active')) {
      toggleMenu(menuToggle, navMenu, header, false);
    }
  });
}

/**
 * Toggles the mobile menu state
 * @param {HTMLElement} toggle - The menu toggle button element
 * @param {HTMLElement} menu - The menu container element
 * @param {HTMLElement} header - The header element
 * @param {boolean|null} state - Optional explicit state (true=open, false=closed, null=toggle)
 */
function toggleMenu(toggle, menu, header, state = null) {
  const body = document.body;

  const shouldOpen = state === null ? !menu.classList.contains('nav__list--active') : state;

  toggle.classList.toggle('menu-toggle--active', shouldOpen);
  menu.classList.toggle('nav__list--active', shouldOpen);
  body.classList.toggle('no-scroll', shouldOpen);
  header.classList.toggle('header--mobile-menu-open', shouldOpen);
}