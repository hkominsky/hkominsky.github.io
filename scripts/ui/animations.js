/**
 * Handles the initial animation state based on session storage
 */
export function handleAnimationState() {
  if (hasSeenAnimations()) {
    skipAnimations();
  }
}

/**
 * Checks if user has seen animations in this session
 * @returns {boolean} True if animations have been seen
 */
function hasSeenAnimations() {
  return sessionStorage.getItem('hasSeenAnimations') === 'true';
}

/**
 * Adds class to skip animations on page load
 */
function skipAnimations() {
  document.documentElement.classList.add('skip-animations');
}

/**
 * Initializes scroll-based animations using Intersection Observer.
 */
export function scrollAnimationInit() {
  const animateElements = getAnimateElements();
  if (animateElements.length === 0) return;

  const animationTracker = createAnimationTracker(animateElements.length);
  const observerConfig = createObserverConfig();
  
  setupIntersectionObserver(animateElements, animationTracker, observerConfig);
  setupFallbackAnimation(animateElements, animationTracker);
}

/**
 * Gets all elements marked for scroll animation
 * @returns {NodeList} Elements with scroll-animate class
 */
function getAnimateElements() {
  return document.querySelectorAll('.scroll-animate');
}

/**
 * Creates an animation tracker object to manage animation state
 * @param {number} totalElements - Total number of elements to animate
 * @returns {Object} Animation tracker with count and marking methods
 */
function createAnimationTracker(totalElements) {
  let animatedCount = 0;
  const threshold = Math.ceil(totalElements * 0.7);

  return {
    markAsAnimated(el) {
      if (!el.classList.contains('animate-in')) {
        el.classList.add('animate-in');
        animatedCount++;

        if (animatedCount >= threshold) {
          sessionStorage.setItem('hasSeenAnimations', 'true');
        }
      }
    },
    isAnimated(el) {
      return el.classList.contains('animate-in');
    }
  };
}

/**
 * Creates Intersection Observer configuration based on device type
 * @returns {Object} Observer options with threshold and rootMargin
 */
function createObserverConfig() {
  const isMobile = window.innerWidth <= 768;
  return {
    threshold: 0.25,
    rootMargin: isMobile ? '0px 0px -5% 0px' : '0px 0px -10% 0px',
  };
}

/**
 * Sets up Intersection Observer for scroll-based animations
 * @param {NodeList} elements - Elements to observe
 * @param {Object} tracker - Animation tracker object
 * @param {Object} config - Observer configuration
 */
function setupIntersectionObserver(elements, tracker, config) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        tracker.markAsAnimated(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, config);

  elements.forEach((el) => {
    if (!tracker.isAnimated(el)) {
      observer.observe(el);
    }
  });
}

/**
 * Sets up fallback animation to ensure all elements animate after a delay
 * @param {NodeList} elements - Elements to animate
 * @param {Object} tracker - Animation tracker object
 */
function setupFallbackAnimation(elements, tracker) {
  setTimeout(() => {
    elements.forEach((el) => tracker.markAsAnimated(el));
  }, 3000);
}