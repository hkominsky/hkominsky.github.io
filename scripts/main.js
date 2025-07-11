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
  let isScrolling = false;
  let scrollTimeout;
  
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
    if (isScrolling) return;
    
    isScrolling = true;
    const card = cards[index];
    
    // Clear any existing timeout
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }
    
    // Use requestAnimationFrame for better mobile performance
    requestAnimationFrame(() => {
      const gridRect = grid.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      
      // More precise calculation for mobile
      const cardCenter = cardRect.left + cardRect.width / 2;
      const gridCenter = gridRect.left + gridRect.width / 2;
      const scrollOffset = cardCenter - gridCenter;
      
      const targetScrollLeft = grid.scrollLeft + scrollOffset;
      
      // Use different approach for mobile vs desktop
      if (window.innerWidth <= 768) {
        // Mobile: Use immediate scroll with slight delay
        grid.scrollTo({
          left: targetScrollLeft,
          behavior: smooth ? 'smooth' : 'auto'
        });
        
        // Set timeout for mobile to handle scroll completion
        scrollTimeout = setTimeout(() => {
          cards.forEach((c, i) => {
            c.classList.toggle('active', i === index);
          });
          
          currentIndex = index;
          updateArrows();
          updateDots();
          isScrolling = false;
        }, smooth ? 300 : 0);
      } else {
        // Desktop: Original method
        grid.scrollTo({
          left: targetScrollLeft,
          behavior: smooth ? 'smooth' : 'auto'
        });
        
        cards.forEach((c, i) => {
          c.classList.toggle('active', i === index);
        });
        
        currentIndex = index;
        updateArrows();
        updateDots();
        
        scrollTimeout = setTimeout(() => {
          isScrolling = false;
        }, smooth ? 500 : 0);
      }
    });
  };
  
  const next = () => {
    if (currentIndex < cards.length - 1 && !isScrolling) {
      centerCard(currentIndex + 1);
    }
  };
  
  const prev = () => {
    if (currentIndex > 0 && !isScrolling) {
      centerCard(currentIndex - 1);
    }
  };
  
  // Prevent multiple rapid clicks
  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      next();
    });
  }
  
  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      prev();
    });
  }
  
  if (dots.length) {
    dots.forEach((dot, i) => {
      dot.addEventListener('click', (e) => {
        e.preventDefault();
        if (!isScrolling) {
          centerCard(i);
        }
      });
    });
  }
  
  // Handle manual scrolling (touch/swipe)
  let scrollEndTimeout;
  grid.addEventListener('scroll', () => {
    if (isScrolling) return; // Ignore programmatic scrolling
    
    if (scrollEndTimeout) {
      clearTimeout(scrollEndTimeout);
    }
    
    scrollEndTimeout = setTimeout(() => {
      // Find the card closest to center
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
        // Update without scrolling since user already scrolled
        cards.forEach((c, i) => {
          c.classList.toggle('active', i === closestIndex);
        });
        
        currentIndex = closestIndex;
        updateArrows();
        updateDots();
      }
    }, 150);
  });
  
  // Initialize
  centerCard(currentIndex, false);
}