/**
 * Initializes mobile menu functionality
 * Sets up menu toggle, click handlers, and outside click detection
 */
export function mobileMenuInit() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav__list');
  const header = document.querySelector('header');

  if (!menuToggle || !navMenu || !header) return;

  // Function to set menu height dynamically ONLY on mobile
  function setMenuHeight() {
    if (window.innerWidth > 768) {
      navMenu.style.height = ''; // reset height on desktop
      return;
    }

    const viewportHeight = window.innerHeight;
    const headerHeight = header.offsetHeight;
    const menuHeight = viewportHeight - headerHeight;
    navMenu.style.height = menuHeight + 'px';
  }

  // Set initial height on load and resize/orientationchange
  window.addEventListener('load', setMenuHeight);
  window.addEventListener('resize', setMenuHeight);
  window.addEventListener('orientationchange', setMenuHeight);

  menuToggle.addEventListener('click', () => {
    setMenuHeight();
    toggleMenu(menuToggle, navMenu, header);
  });

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

function toggleMenu(toggle, menu, header, state = null) {
  const body = document.body;
  const shouldOpen = state === null ? !menu.classList.contains('nav__list--active') : state;

  toggle.classList.toggle('menu-toggle--active', shouldOpen);
  menu.classList.toggle('nav__list--active', shouldOpen);
  body.classList.toggle('no-scroll', shouldOpen);
  header.classList.toggle('header--mobile-menu-open', shouldOpen);

  if (shouldOpen && window.innerWidth <= 768) {
    const viewportHeight = window.innerHeight;
    const headerHeight = header.offsetHeight;
    menu.style.height = (viewportHeight - headerHeight) + 'px';
  } else {
    menu.style.height = '';
  }
}
