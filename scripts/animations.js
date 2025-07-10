/**
 * Handles the initial animation state based on session storage
 * Must be called early in the page load process
 */
export function handleAnimationState() {
  const hasSeenAnimations = sessionStorage.getItem('hasSeenAnimations');
  
  if (hasSeenAnimations) {
    document.documentElement.classList.add('skip-animations');
  }
}

/**
 * Initializes scroll-based animations using Intersection Observer
 * Only runs animations on first visit to avoid re-animating on navigation returns
 */
export function scrollAnimationInit() {
  if (document.documentElement.classList.contains('skip-animations')) {
    skipAnimations();
    return;
  }
  
  const animateElements = document.querySelectorAll('.scroll-animate');
  if (animateElements.length === 0) return;
  
  let animatedCount = 0;
  const totalElements = animateElements.length;

  const isMobile = window.innerWidth <= 768;
  const threshold = isMobile ? 0.05 : 0.15;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('animate-in')) {
        entry.target.classList.add('animate-in');
        animatedCount++;
        
        if (animatedCount >= Math.ceil(totalElements * 0.7)) {
          sessionStorage.setItem('hasSeenAnimations', 'true');
        }
      }
    });
  }, {
    threshold,
    rootMargin: '0px 0px 0px 0px'
  });
  
  animateElements.forEach(element => {
    observer.observe(element);
  });
}

/**
 * Skips all animations and immediately shows elements in their final state
 * Used when user has already seen animations in this session
 */
function skipAnimations() {
  const animateElements = document.querySelectorAll('.scroll-animate');
  animateElements.forEach(element => {
    element.classList.add('animate-in');
  });
}