import { applyTheme, getStoredTheme } from './theme.js';
import { componentsInit, projectComponentsInit } from './components.js';
import { contactFormInit } from './contact.js';
import { projectLinksInit, isHomePage, headerNavigationInit } from './navigation.js';
import { scrollAnimationInit, handleAnimationState } from './animations.js';

// Handles content loading.
document.addEventListener("DOMContentLoaded", () => {
  // Applies global components and stylings
  applyTheme(getStoredTheme() || "light");
  componentsInit();
  scrollAnimationInit();
 
  // Check if on the home page
  if (isHomePage()) {
    handleAnimationState();
    headerNavigationInit();
    contactFormInit();
    projectLinksInit();
    initExperienceCarousel();
  } else {
    projectComponentsInit();
  }
});

function initExperienceCarousel() {
  const grid = document.querySelector('.experience__grid');
  const cards = Array.from(grid.children);
  const prevBtn = document.querySelector('.carousel-arrow.prev');
  const nextBtn = document.querySelector('.carousel-arrow.next');
  const dotsContainer = document.querySelector('.experience-dots');
  const dots = dotsContainer ? Array.from(dotsContainer.children) : [];

  let currentIndex = 0;

  const updateArrows = () => {
    if (prevBtn) prevBtn.style.visibility = currentIndex === 0 ? 'hidden' : 'visible';
    if (nextBtn) nextBtn.style.visibility = currentIndex === cards.length - 1 ? 'hidden' : 'visible';
  };

  const updateDots = () => {
    dots.forEach((dot, i) => {
      const selected = i === currentIndex;
      dot.classList.toggle('active', selected);
      dot.setAttribute('aria-selected', selected);
      dot.tabIndex = selected ? 0 : -1;
    });
  };

  const centerCard = (index, smooth = true) => {
    const card = cards[index];
    const gridRect = grid.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();

    // Calculate how much to scroll horizontally to center the card inside grid
    const scrollX = grid.scrollLeft + (cardRect.left + cardRect.width / 2) - (gridRect.left + gridRect.width / 2);

    grid.scrollTo({
      left: scrollX,
      behavior: smooth ? 'smooth' : 'auto',
    });

    cards.forEach((c, i) => {
      c.classList.toggle('active', i === index);
    });

    currentIndex = index;
    updateArrows();
    updateDots();
  };


  const next = () => {
    if (currentIndex < cards.length - 1) {
      centerCard(currentIndex + 1);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      centerCard(currentIndex - 1);
    }
  };

  if (nextBtn) nextBtn.addEventListener('click', next);
  if (prevBtn) prevBtn.addEventListener('click', prev);

  if (dots.length) {
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        centerCard(i);
      });
    });
  }

  centerCard(currentIndex, false);
}
