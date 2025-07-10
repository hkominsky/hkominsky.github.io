export function mobileMenuInit() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav__list');
  const header = document.querySelector('header');
 
  if (!menuToggle || !navMenu || !header) return;
 
  function setMenuHeight() {
    if (window.innerWidth > 768) {
      navMenu.style.height = '';
      return;
    }
 
    const viewportHeight = window.innerHeight;
    const headerHeight = header.offsetHeight;
    const menuHeight = viewportHeight - headerHeight;
    navMenu.style.height = menuHeight + 'px';
  }
 
  window.addEventListener('load', setMenuHeight);
  window.addEventListener('resize', setMenuHeight);
  window.addEventListener('orientationchange', setMenuHeight);
 
  menuToggle.addEventListener('click', (e) => {
    setMenuHeight();
    toggleMenu(menuToggle, navMenu, header);
    
    menuToggle.blur();
    e.preventDefault();
  });
 
  document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      toggleMenu(menuToggle, navMenu, header, false);
      link.blur();
    });
  });
 
  document.addEventListener('click', (event) => {
    if (!navMenu.contains(event.target) &&
        !menuToggle.contains(event.target) &&
        navMenu.classList.contains('nav__list--active')) {
      toggleMenu(menuToggle, navMenu, header, false);
    }
  });
}

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

const themeToggleButton = document.querySelector('.theme-toggle__button');
if (themeToggleButton) {
  themeToggleButton.addEventListener('click', (e) => {
    changeTheme();
    themeToggleButton.blur();
    e.preventDefault();
  });
}