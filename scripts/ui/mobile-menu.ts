/**
 * Menu elements interface
 */
interface MenuElements {
  menuToggle: HTMLElement;
  menuToggleButton: HTMLElement;
  navMenu: HTMLElement;
  header: HTMLElement;
}

/**
 * Initializes the mobile menu functionality, including toggle behavior
 */
export function mobileMenuInit(): void {
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
 * @returns Object containing menu elements, or null if any are missing
 */
function getMenuElements(): MenuElements | null {
  const menuToggle = document.querySelector<HTMLElement>('.menu-toggle');
  const menuToggleButton = document.querySelector<HTMLElement>('.menu-toggle-button');
  const navMenu = document.querySelector<HTMLElement>('.nav-list');
  const header = document.querySelector<HTMLElement>('header');

  if (!menuToggle || !menuToggleButton || !navMenu || !header) {
    return null;
  }

  return { menuToggle, menuToggleButton, navMenu, header };
}

/**
 * Sets up the menu toggle button click handler
 * @param button - The menu toggle button
 * @param menuToggle - The menu toggle wrapper element
 * @param navMenu - The navigation menu element
 * @param header - The header element
 */
function setupMenuToggleButton(
  button: HTMLElement,
  menuToggle: HTMLElement,
  navMenu: HTMLElement,
  header: HTMLElement
): void {
  button.addEventListener('click', (e: Event): void => {
    e.preventDefault();
    setMenuHeight(navMenu, header);
    toggleMenu(menuToggle, navMenu);
    button.blur();
  });
}

/**
 * Sets up click handlers for navigation links to close the menu
 * @param menuToggle - The menu toggle wrapper element
 * @param navMenu - The navigation menu element
 * @param header - The header element
 */
function setupNavLinkHandlers(
  menuToggle: HTMLElement,
  navMenu: HTMLElement,
  header: HTMLElement
): void {
  document.querySelectorAll<HTMLElement>('.nav-link').forEach((link: HTMLElement): void => {
    link.addEventListener('click', (): void => {
      closeMenu(menuToggle, navMenu);
      link.blur();
    });
  });
}

/**
 * Sets up handler to close menu when clicking outside
 * @param menuToggle - The menu toggle wrapper element
 * @param navMenu - The navigation menu element
 * @param header - The header element
 */
function setupOutsideClickHandler(
  menuToggle: HTMLElement,
  navMenu: HTMLElement,
  header: HTMLElement
): void {
  document.addEventListener('click', (event: MouseEvent): void => {
    const target = event.target as HTMLElement;
    if (isClickOutsideMenu(target, navMenu, menuToggle) && isMenuOpen(navMenu)) {
      closeMenu(menuToggle, navMenu);
    }
  });
}

/**
 * Checks if a click occurred outside the menu
 * @param target - The clicked element
 * @param navMenu - The navigation menu element
 * @param menuToggle - The menu toggle wrapper element
 * @returns True if click was outside the menu
 */
function isClickOutsideMenu(
  target: HTMLElement,
  navMenu: HTMLElement,
  menuToggle: HTMLElement
): boolean {
  return !navMenu.contains(target) && !menuToggle.contains(target);
}

/**
 * Checks if the menu is currently open
 * @param navMenu - The navigation menu element
 * @returns True if menu is open
 */
function isMenuOpen(navMenu: HTMLElement): boolean {
  return navMenu.classList.contains('nav-list-active');
}

/**
 * Adds event listeners to update the menu height on load, resize, and orientation change
 * @param navMenu - The navigation menu element
 * @param header - The header element
 */
function setupMenuHeight(navMenu: HTMLElement, header: HTMLElement): void {
  const updateHeight = (): void => setMenuHeight(navMenu, header);

  window.addEventListener('load', updateHeight);
  window.addEventListener('resize', updateHeight);
  window.addEventListener('orientationchange', updateHeight);

  updateHeight();
}

/**
 * Sets the height of the navigation menu based on viewport height and header height
 * Only sets height on screens 768px or less; resets on larger screens
 * @param navMenu - The navigation menu element
 * @param header - The header element
 */
function setMenuHeight(navMenu: HTMLElement, header: HTMLElement): void {
  if (!isMobileView()) {
    navMenu.style.height = '';
    return;
  }

  const menuHeight: number = calculateMenuHeight(header);
  navMenu.style.height = `${menuHeight}px`;
}

/**
 * Checks if the current view is mobile (768px or less)
 * @returns True if mobile view
 */
function isMobileView(): boolean {
  return window.innerWidth <= 768;
}

/**
 * Calculates the menu height based on viewport and header height
 * @param header - The header element
 * @returns The calculated menu height in pixels
 */
function calculateMenuHeight(header: HTMLElement): number {
  const viewportHeight: number = window.innerHeight;
  const headerHeight: number = header.offsetHeight;
  return viewportHeight - headerHeight;
}

/**
 * Toggles the mobile menu open or closed
 * @param menuToggle - The menu toggle wrapper element
 * @param navMenu - The navigation menu element
 * @param forceClose - If false, forces close; if true, forces open; if null, toggles
 */
function toggleMenu(
  menuToggle: HTMLElement,
  navMenu: HTMLElement,
  forceClose: boolean | null = null
): void {
  const shouldClose: boolean = forceClose === false || (forceClose === null && isMenuOpen(navMenu));

  if (shouldClose) {
    closeMenu(menuToggle, navMenu);
  } else {
    openMenu(menuToggle, navMenu);
  }
}

/**
 * Opens the mobile menu
 * @param menuToggle - The menu toggle wrapper element
 * @param navMenu - The navigation menu element
 */
function openMenu(menuToggle: HTMLElement, navMenu: HTMLElement): void {
  navMenu.classList.add('nav-list-active');
  menuToggle.classList.add('menu-toggle-active');
  document.body.classList.add('no-scroll');
}

/**
 * Closes the mobile menu
 * @param menuToggle - The menu toggle wrapper element
 * @param navMenu - The navigation menu element
 */
function closeMenu(menuToggle: HTMLElement, navMenu: HTMLElement): void {
  navMenu.classList.remove('nav-list-active');
  menuToggle.classList.remove('menu-toggle-active');
  document.body.classList.remove('no-scroll');
}

/**
 * Initializes the theme toggle button to switch themes on click
 */
export function themeToggleInit(): void {
  const themeToggleButton = document.querySelector<HTMLElement>('.theme-toggle-button');
  if (!themeToggleButton) return;

  themeToggleButton.addEventListener('click', (e: Event): void => {
    e.preventDefault();
    changeTheme();
    themeToggleButton.blur();
  });
}

// This import is needed for the changeTheme function
declare function changeTheme(): void;