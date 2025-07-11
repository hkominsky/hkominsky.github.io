import { initProjectPageNavigation, isHomePage } from './navigation.js';
import { applyTheme, getStoredTheme, changeTheme } from './theme.js';
import { mobileMenuInit } from './mobile-menu.js';

/**
 * Fetches HTML from a given URL and inserts it into a target element by ID.
 * Handles fetch errors and logs them.
 * @param {string} url - URL to fetch HTML from
 * @param {string} targetElementId - ID of the element to insert HTML into
 * @returns {Promise<void>}
 */
async function fetchAndInsertHTML(url, targetElementId) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const html = await response.text();
    const targetElement = document.getElementById(targetElementId);
    if (targetElement) {
      targetElement.innerHTML = html;
    } else {
      console.warn(`Element with ID "${targetElementId}" not found.`);
    }
  } catch (error) {
    console.error(`Error loading ${targetElementId}:`, error);
  }
}

/**
 * Loads external HTML components like header and footer
 * Applies theme and initializes mobile menu and theme toggle after header loads
 */
export async function componentsInit() {
  await fetchAndInsertHTML('/components/header/header.html', 'header');

  applyTheme(getStoredTheme() || "light");

  // Initialize mobile menu after header is inserted
  mobileMenuInit();

  const themeToggleButton = document.querySelector('.theme-toggle__button');
  if (themeToggleButton) {
    themeToggleButton.addEventListener('click', changeTheme);
  }

  await fetchAndInsertHTML('/components/footer/footer.html', 'footer');
}

/**
 * Loads project-specific components like project navigation
 * Initializes project page navigation after insertion
 */
export async function projectComponentsInit() {
  await fetchAndInsertHTML('/components/navigation/navigation.html', 'projectNavigation');

  const navContainer = document.getElementById('projectNavigation');
  if (navContainer) {
    initProjectPageNavigation();
  }
}

/**
 * Initializes the experience section's horizontal carousel.
 * Handles navigation via arrows, swipe/scroll behavior, and dot indicators.
 * Automatically centers the active card and updates visual states.
 */
export function initExperienceCarousel() {
  const grid = document.querySelector('.experience__grid');
  const cards = Array.from(grid.children);
  const prevBtn = document.querySelector('.carousel-arrow.prev');
  const nextBtn = document.querySelector('.carousel-arrow.next');
  const dotsContainer = document.querySelector('.experience-dots');
  const dots = dotsContainer ? Array.from(dotsContainer.children) : [];

  let currentIndex = 0;
  let isScrolling = false;
  let scrollTimeout, scrollEndTimeout;

  function updateArrows() {
    if (prevBtn) prevBtn.style.visibility = currentIndex === 0 ? 'hidden' : 'visible';
    if (nextBtn) nextBtn.style.visibility = currentIndex === cards.length - 1 ? 'hidden' : 'visible';
  }

  function updateDots() {
    dots.forEach((dot, i) => {
      const selected = i === currentIndex;
      dot.classList.toggle('active', selected);
      dot.setAttribute('aria-selected', selected);
      dot.tabIndex = selected ? 0 : -1;
    });
  }

  function scrollToCard(index, smooth = true) {
    if (isScrolling) return;
    isScrolling = true;

    const card = cards[index];
    if (!card) return;

    if (scrollTimeout) clearTimeout(scrollTimeout);

    requestAnimationFrame(() => {
      const gridRect = grid.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const gridCenter = gridRect.left + gridRect.width / 2;
      const scrollOffset = cardCenter - gridCenter;
      const targetScrollLeft = grid.scrollLeft + scrollOffset;

      grid.scrollTo({ left: targetScrollLeft, behavior: smooth ? 'smooth' : 'auto' });

      if (window.innerWidth <= 768) {
        scrollTimeout = setTimeout(() => {
          updateActiveCard(index);
          isScrolling = false;
        }, smooth ? 300 : 0);
      } else {
        updateActiveCard(index);
        scrollTimeout = setTimeout(() => {
          isScrolling = false;
        }, smooth ? 500 : 0);
      }
    });
  }

  function updateActiveCard(index) {
    cards.forEach((c, i) => c.classList.toggle('active', i === index));
    currentIndex = index;
    updateArrows();
    updateDots();
  }

  function attachEventListeners() {
    nextBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      if (currentIndex < cards.length - 1 && !isScrolling) scrollToCard(currentIndex + 1);
    });

    prevBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      if (currentIndex > 0 && !isScrolling) scrollToCard(currentIndex - 1);
    });

    dots.forEach((dot, i) => {
      dot.addEventListener('click', (e) => {
        e.preventDefault();
        if (!isScrolling) scrollToCard(i);
      });
    });

    grid.addEventListener('scroll', () => {
      if (isScrolling) return;
      if (scrollEndTimeout) clearTimeout(scrollEndTimeout);

      scrollEndTimeout = setTimeout(() => {
        const gridRect = grid.getBoundingClientRect();
        const gridCenter = gridRect.left + gridRect.width / 2;
        let closestIndex = 0;
        let closestDistance = Infinity;

        cards.forEach((card, index) => {
          const cardRect = card.getBoundingClientRect();
          const cardCenter = cardRect.left + cardRect.width / 2;
          const distance = Math.abs(cardCenter - gridCenter);

          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
          }
        });

        if (closestIndex !== currentIndex) {
          updateActiveCard(closestIndex);
        }
      }, 150);
    });
  }

  // Initialize
  attachEventListeners();
  scrollToCard(currentIndex, false);
}
