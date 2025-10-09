/**
 * Initializes the experience section's horizontal carousel.
 */
export function initExperienceCarousel() {
  const grid = document.querySelector('.experience-grid');
  const cards = Array.from(grid.children);
  const prevBtn = document.querySelector('.carousel-arrow.prev');
  const nextBtn = document.querySelector('.carousel-arrow.next');
  const dotsContainer = document.querySelector('.experience-dots');
  const dots = dotsContainer ? Array.from(dotsContainer.children) : [];

  let currentIndex = 0;
  let isScrolling = false;
  let scrollTimeout, scrollEndTimeout;

  const isMobile = () => window.innerWidth <= 768;
  const getScrollDelay = (smooth) => smooth ? (isMobile() ? 300 : 500) : 0;

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

  function calculateScrollOffset(card) {
    const gridRect = grid.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const cardCenter = cardRect.left + cardRect.width / 2;
    const gridCenter = gridRect.left + gridRect.width / 2;
    return cardCenter - gridCenter;
  }

  function scrollToCard(index, smooth = true) {
    if (isScrolling) return;
    
    const card = cards[index];
    if (!card) return;

    isScrolling = true;
    if (scrollTimeout) clearTimeout(scrollTimeout);

    requestAnimationFrame(() => {
      const scrollOffset = calculateScrollOffset(card);
      const targetScrollLeft = grid.scrollLeft + scrollOffset;

      grid.scrollTo({ left: targetScrollLeft, behavior: smooth ? 'smooth' : 'auto' });

      const delay = getScrollDelay(smooth);
      
      if (isMobile()) {
        scrollTimeout = setTimeout(() => {
          updateActiveCard(index);
          isScrolling = false;
        }, delay);
      } else {
        updateActiveCard(index);
        scrollTimeout = setTimeout(() => {
          isScrolling = false;
        }, delay);
      }
    });
  }

  function updateActiveCard(index) {
    cards.forEach((c, i) => c.classList.toggle('active', i === index));
    currentIndex = index;
    updateArrows();
    updateDots();
  }

  function findClosestCardIndex() {
    const gridRect = grid.getBoundingClientRect();
    const gridCenter = gridRect.left + gridRect.width / 2;

    return cards.reduce((closest, card, index) => {
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const distance = Math.abs(cardCenter - gridCenter);

      return distance < closest.distance 
        ? { index, distance } 
        : closest;
    }, { index: 0, distance: Infinity }).index;
  }

  function handleScroll() {
    if (isScrolling) return;
    if (scrollEndTimeout) clearTimeout(scrollEndTimeout);

    scrollEndTimeout = setTimeout(() => {
      const closestIndex = findClosestCardIndex();
      if (closestIndex !== currentIndex) {
        updateActiveCard(closestIndex);
      }
    }, 150);
  }

  function handleNavClick(e, targetIndex) {
    e.preventDefault();
    if (!isScrolling) scrollToCard(targetIndex);
  }

  function attachEventListeners() {
    prevBtn?.addEventListener('click', (e) => {
      if (currentIndex > 0) handleNavClick(e, currentIndex - 1);
    });

    nextBtn?.addEventListener('click', (e) => {
      if (currentIndex < cards.length - 1) handleNavClick(e, currentIndex + 1);
    });

    dots.forEach((dot, i) => {
      dot.addEventListener('click', (e) => handleNavClick(e, i));
    });

    grid.addEventListener('scroll', handleScroll);
  }

  attachEventListeners();
  scrollToCard(currentIndex, false);
}