/**
 * Animation tracker interface
 */
interface AnimationTracker {
  markAsAnimated(el: Element): void;
  isAnimated(el: Element): boolean;
}

/**
 * Handles the initial animation state based on session storage
 */
export function handleAnimationState(): void {
  if (hasSeenAnimations()) {
    skipAnimations();
  }
}

/**
 * Checks if user has seen animations in this session
 * @returns True if animations have been seen
 */
function hasSeenAnimations(): boolean {
  return sessionStorage.getItem('hasSeenAnimations') === 'true';
}

/**
 * Adds class to skip animations on page load
 */
function skipAnimations(): void {
  document.documentElement.classList.add('skip-animations');
}

/**
 * Initializes scroll-based animations using Intersection Observer.
 */
export function scrollAnimationInit(): void {
  const animateElements: NodeListOf<Element> = getAnimateElements();
  if (animateElements.length === 0) return;

  const animationTracker: AnimationTracker = createAnimationTracker(animateElements.length);
  const observerConfig: IntersectionObserverInit = createObserverConfig();
  
  setupIntersectionObserver(animateElements, animationTracker, observerConfig);
  setupFallbackAnimation(animateElements, animationTracker);
}

/**
 * Gets all elements marked for scroll animation
 * @returns Elements with scroll-animate class
 */
function getAnimateElements(): NodeListOf<Element> {
  return document.querySelectorAll('.scroll-animate');
}

/**
 * Creates an animation tracker object to manage animation state
 * @param totalElements - Total number of elements to animate
 * @returns Animation tracker with count and marking methods
 */
function createAnimationTracker(totalElements: number): AnimationTracker {
  let animatedCount: number = 0;
  const threshold: number = Math.ceil(totalElements * 0.7);

  return {
    markAsAnimated(el: Element): void {
      if (!el.classList.contains('animate-in')) {
        el.classList.add('animate-in');
        animatedCount++;

        if (animatedCount >= threshold) {
          sessionStorage.setItem('hasSeenAnimations', 'true');
        }
      }
    },
    isAnimated(el: Element): boolean {
      return el.classList.contains('animate-in');
    }
  };
}

/**
 * Creates Intersection Observer configuration based on device type
 * @returns Observer options with threshold and rootMargin
 */
function createObserverConfig(): IntersectionObserverInit {
  const isMobile: boolean = window.innerWidth <= 768;
  return {
    threshold: 0.25,
    rootMargin: isMobile ? '0px 0px -5% 0px' : '0px 0px -10% 0px',
  };
}

/**
 * Sets up Intersection Observer for scroll-based animations
 * @param elements - Elements to observe
 * @param tracker - Animation tracker object
 * @param config - Observer configuration
 */
function setupIntersectionObserver(
  elements: NodeListOf<Element>,
  tracker: AnimationTracker,
  config: IntersectionObserverInit
): void {
  const observer = new IntersectionObserver((entries: IntersectionObserverEntry[]): void => {
    entries.forEach((entry: IntersectionObserverEntry): void => {
      if (entry.isIntersecting) {
        tracker.markAsAnimated(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, config);

  elements.forEach((el: Element): void => {
    if (!tracker.isAnimated(el)) {
      observer.observe(el);
    }
  });
}

/**
 * Sets up fallback animation to ensure all elements animate after a delay
 * @param elements - Elements to animate
 * @param tracker - Animation tracker object
 */
function setupFallbackAnimation(
  elements: NodeListOf<Element>,
  tracker: AnimationTracker
): void {
  setTimeout((): void => {
    elements.forEach((el: Element): void => tracker.markAsAnimated(el));
  }, 3000);
}