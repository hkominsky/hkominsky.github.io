/**
 * Initializes the mobile menu functionality, including toggle behavior,
 * dynamic height adjustment, and outside click closing.
 */
export function mobileMenuInit() {
  const menuToggle = document.querySelector('.menu-toggle');
  const menuToggleButton = document.querySelector('.menu-toggle__button');
  const navMenu = document.querySelector('.nav__list');
  const header = document.querySelector('header');

  if (!menuToggle || !menuToggleButton || !navMenu || !header) return;

  setupMenuHeight(navMenu, header);

  menuToggleButton.addEventListener('click', (e) => {
    e.preventDefault();
    setMenuHeight(navMenu, header);
    toggleMenu(menuToggle, navMenu, header);
    menuToggleButton.blur();
  });

  document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      toggleMenu(menuToggle, navMenu, header, false);
      link.blur();
    });
  });

  document.addEventListener('click', (event) => {
    if (
      !navMenu.contains(event.target) &&
      !menuToggle.contains(event.target) &&
      navMenu.classList.contains('nav__list--active')
    ) {
      toggleMenu(menuToggle, navMenu, header, false);
    }
  });
}

/**
 * Adds event listeners to update the menu height on load, resize, and orientation change.
 * @param {HTMLElement} navMenu - The navigation menu element
 * @param {HTMLElement} header - The header element
 */
function setupMenuHeight(navMenu, header) {
  const updateHeight = () => setMenuHeight(navMenu, header);

  window.addEventListener('load', updateHeight);
  window.addEventListener('resize', updateHeight);
  window.addEventListener('orientationchange', updateHeight);

  // Initial height set
  updateHeight();
}

/**
 * Sets the height of the navigation menu based on viewport height and header height.
 * Only sets height on screens 768px or less; resets on larger screens.
 * @param {HTMLElement} navMenu - The navigation menu element
 * @param {HTMLElement} header - The header element
 */
function setMenuHeight(navMenu, header) {
  if (window.innerWidth > 768) {
    navMenu.style.height = '';
    return;
  }

  const viewportHeight = window.innerHeight;
  const headerHeight = header.offsetHeight;
  const menuHeight = viewportHeight - headerHeight;
  navMenu.style.height = `${menuHeight}px`;
}

/**
 * Toggles the mobile menu open or closed.
 * @param {HTMLElement} menuToggle - The menu toggle wrapper element
 * @param {HTMLElement} navMenu - The navigation menu element
 * @param {HTMLElement} header - The header element (not used currently, but included for potential future use)
 * @param {boolean|null} [forceClose=null] - If true, forces menu closed; if false, forces open; if null, toggles
 */
function toggleMenu(menuToggle, navMenu, header, forceClose = null) {
  const isActive = navMenu.classList.contains('nav__list--active');

  if (forceClose === false || (forceClose === null && isActive)) {
    navMenu.classList.remove('nav__list--active');
    menuToggle.classList.remove('menu-toggle--active');
    document.body.classList.remove('no-scroll');
  } else {
    navMenu.classList.add('nav__list--active');
    menuToggle.classList.add('menu-toggle--active');
    document.body.classList.add('no-scroll');
  }
}

/**
 * Initializes the theme toggle button to switch themes on click.
 * Assumes a global `changeTheme` function is defined elsewhere.
 */
export function themeToggleInit() {
  const themeToggleButton = document.querySelector('.theme-toggle__button');
  if (!themeToggleButton) return;

  themeToggleButton.addEventListener('click', (e) => {
    e.preventDefault();
    changeTheme();
    themeToggleButton.blur();
  });
}