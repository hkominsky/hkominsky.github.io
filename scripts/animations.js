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
 * Initializes scroll-based animations using Intersection Observer.
 * Ensures resilience against missed triggers, fast scrolls, and mobile quirks.
 */
export function scrollAnimationInit() {
  const animateElements = getAnimateElements();
  if (animateElements.length === 0) return;

  const isMobile = window.innerWidth <= 768;
  const totalElements = animateElements.length;
  let animatedCount = 0;

  const markAsAnimated = (el) => {
    if (!el.classList.contains('animate-in')) {
      el.classList.add('animate-in');
      animatedCount++;

      if (animatedCount >= Math.ceil(totalElements * 0.7)) {
        sessionStorage.setItem('hasSeenAnimations', 'true');
      }
    }
  };

  const observeRemainingElements = () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          markAsAnimated(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.25,
      rootMargin: isMobile ? '0px 0px -5% 0px' : '0px 0px -10% 0px',
    });

    animateElements.forEach((el) => {
      if (!el.classList.contains('animate-in')) {
        observer.observe(el);
      }
    });
  };

  const fallbackAnimateAll = () => {
    setTimeout(() => {
      animateElements.forEach(markAsAnimated);
    }, 3000);
  };

  observeRemainingElements();
  fallbackAnimateAll();
}

function getAnimateElements() {
  return document.querySelectorAll('.scroll-animate');
}