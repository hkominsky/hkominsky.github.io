/**
 * Initializes the mobile menu functionality, including toggle behavior
 */
export function mobileMenuInit() {
  const menuElements = getMenuElements();
  if (!menuElements) return;

  const { menuToggle, menuToggleButton, navMenu, header } = menuElements;

  setupMenuHeight(navMenu, header);
  setupMenuToggleButton(menuToggleButton, menuToggle, navMenu, header);
  setupNavLinkHandlers(menuToggle, navMenu, header);
  setupOutsideClickHandler(menuToggle, navMenu, header);
}

/**
 * Gets all required menu elements
 * @returns {Object|null} Object containing menu elements, or null if any are missing
 */
function getMenuElements() {
  const menuToggle = document.querySelector('.menu-toggle');
  const menuToggleButton = document.querySelector('.menu-toggle-button');
  const navMenu = document.querySelector('.nav-list');
  const header = document.querySelector('header');

  if (!menuToggle || !menuToggleButton || !navMenu || !header) {
    return null;
  }

  return { menuToggle, menuToggleButton, navMenu, header };
}

/**
 * Sets up the menu toggle button click handler
 * @param {HTMLElement} button - The menu toggle button
 * @param {HTMLElement} menuToggle - The menu toggle wrapper element
 * @param {HTMLElement} navMenu - The navigation menu element
 * @param {HTMLElement} header - The header element
 */
function setupMenuToggleButton(button, menuToggle, navMenu, header) {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    setMenuHeight(navMenu, header);
    toggleMenu(menuToggle, navMenu);
    button.blur();
  });
}

/**
 * Sets up click handlers for navigation links to close the menu
 * @param {HTMLElement} menuToggle - The menu toggle wrapper element
 * @param {HTMLElement} navMenu - The navigation menu element
 * @param {HTMLElement} header - The header element
 */
function setupNavLinkHandlers(menuToggle, navMenu, header) {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      closeMenu(menuToggle, navMenu);
      link.blur();
    });
  });
}

/**
 * Sets up handler to close menu when clicking outside
 * @param {HTMLElement} menuToggle - The menu toggle wrapper element
 * @param {HTMLElement} navMenu - The navigation menu element
 * @param {HTMLElement} header - The header element
 */
function setupOutsideClickHandler(menuToggle, navMenu, header) {
  document.addEventListener('click', (event) => {
    if (isClickOutsideMenu(event.target, navMenu, menuToggle) && isMenuOpen(navMenu)) {
      closeMenu(menuToggle, navMenu);
    }
  });
}

/**
 * Checks if a click occurred outside the menu
 * @param {HTMLElement} target - The clicked element
 * @param {HTMLElement} navMenu - The navigation menu element
 * @param {HTMLElement} menuToggle - The menu toggle wrapper element
 * @returns {boolean} True if click was outside the menu
 */
function isClickOutsideMenu(target, navMenu, menuToggle) {
  return !navMenu.contains(target) && !menuToggle.contains(target);
}

/**
 * Checks if the menu is currently open
 * @param {HTMLElement} navMenu - The navigation menu element
 * @returns {boolean} True if menu is open
 */
function isMenuOpen(navMenu) {
  return navMenu.classList.contains('nav-list-active');
}

/**
 * Adds event listeners to update the menu height on load, resize, and orientation change
 * @param {HTMLElement} navMenu - The navigation menu element
 * @param {HTMLElement} header - The header element
 */
function setupMenuHeight(navMenu, header) {
  const updateHeight = () => setMenuHeight(navMenu, header);

  window.addEventListener('load', updateHeight);
  window.addEventListener('resize', updateHeight);
  window.addEventListener('orientationchange', updateHeight);

  updateHeight();
}

/**
 * Sets the height of the navigation menu based on viewport height and header height
 * Only sets height on screens 768px or less; resets on larger screens
 * @param {HTMLElement} navMenu - The navigation menu element
 * @param {HTMLElement} header - The header element
 */
function setMenuHeight(navMenu, header) {
  if (!isMobileView()) {
    navMenu.style.height = '';
    return;
  }

  const menuHeight = calculateMenuHeight(header);
  navMenu.style.height = `${menuHeight}px`;
}

/**
 * Checks if the current view is mobile (768px or less)
 * @returns {boolean} True if mobile view
 */
function isMobileView() {
  return window.innerWidth <= 768;
}

/**
 * Calculates the menu height based on viewport and header height
 * @param {HTMLElement} header - The header element
 * @returns {number} The calculated menu height in pixels
 */
function calculateMenuHeight(header) {
  const viewportHeight = window.innerHeight;
  const headerHeight = header.offsetHeight;
  return viewportHeight - headerHeight;
}

/**
 * Toggles the mobile menu open or closed
 * @param {HTMLElement} menuToggle - The menu toggle wrapper element
 * @param {HTMLElement} navMenu - The navigation menu element
 * @param {boolean|null} [forceClose=null] - If false, forces close; if true, forces open; if null, toggles
 */
function toggleMenu(menuToggle, navMenu, forceClose = null) {
  const shouldClose = forceClose === false || (forceClose === null && isMenuOpen(navMenu));

  if (shouldClose) {
    closeMenu(menuToggle, navMenu);
  } else {
    openMenu(menuToggle, navMenu);
  }
}

/**
 * Opens the mobile menu
 * @param {HTMLElement} menuToggle - The menu toggle wrapper element
 * @param {HTMLElement} navMenu - The navigation menu element
 */
function openMenu(menuToggle, navMenu) {
  navMenu.classList.add('nav-list-active');
  menuToggle.classList.add('menu-toggle-active');
  document.body.classList.add('no-scroll');
}

/**
 * Closes the mobile menu
 * @param {HTMLElement} menuToggle - The menu toggle wrapper element
 * @param {HTMLElement} navMenu - The navigation menu element
 */
function closeMenu(menuToggle, navMenu) {
  navMenu.classList.remove('nav-list-active');
  menuToggle.classList.remove('menu-toggle-active');
  document.body.classList.remove('no-scroll');
}

/**
 * Initializes the theme toggle button to switch themes on click
 */
export function themeToggleInit() {
  const themeToggleButton = document.querySelector('.theme-toggle-button');
  if (!themeToggleButton) return;

  themeToggleButton.addEventListener('click', (e) => {
    e.preventDefault();
    changeTheme();
    themeToggleButton.blur();
  });
}