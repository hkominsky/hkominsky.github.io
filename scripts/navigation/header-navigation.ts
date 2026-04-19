/**
 * Initializes navigation and smooth scrolling functionality
 */
export function headerNavigationInit(): void {
  const pageOffset: number = 110;

  handleInitialHash(pageOffset);
  setupAnchorClickHandler(pageOffset);
  setupHashChangeHandler(pageOffset);
}

/**
 * Handles scrolling to hash on initial page load
 * @param offset - Pixel offset from the top of the section
 */
function handleInitialHash(offset: number): void {
  setTimeout((): void => {
    const hash: string | null = getHashFromUrl();
    if (hash) {
      scrollToSection(hash, offset);
    }
  }, 100);
}

/**
 * Sets up click handler for anchor links
 * @param offset - Pixel offset from the top of the section
 */
function setupAnchorClickHandler(offset: number): void {
  document.addEventListener('click', (e: MouseEvent): void => {
    const target = e.target as HTMLElement;
    const anchor: HTMLAnchorElement | null = findAnchorElement(target);
    if (!anchor) return;

    const sectionId: string = getSectionIdFromAnchor(anchor);
    if (sectionId && sectionExists(sectionId)) {
      e.preventDefault();
      scrollToSection(sectionId, offset);
      updateUrlHash(sectionId);
    }
  });
}

/**
 * Sets up handler for hash change events
 * @param offset - Pixel offset from the top of the section
 */
function setupHashChangeHandler(offset: number): void {
  window.addEventListener('hashchange', (): void => {
    const hash: string | null = getHashFromUrl();
    if (hash) {
      scrollToSection(hash, offset);
    }
  });
}

/**
 * Gets the hash from the current URL without the '#' symbol
 * @returns The hash value or null if no hash exists
 */
function getHashFromUrl(): string | null {
  return window.location.hash ? window.location.hash.substring(1) : null;
}

/**
 * Finds the closest anchor element with a hash href
 * @param target - The clicked element
 * @returns The anchor element or null
 */
function findAnchorElement(target: HTMLElement): HTMLAnchorElement | null {
  return target.closest<HTMLAnchorElement>("a[href^='#']");
}

/**
 * Extracts the section ID from an anchor element
 * @param anchor - The anchor element
 * @returns The section ID without the '#' symbol
 */
function getSectionIdFromAnchor(anchor: HTMLAnchorElement): string {
  const href: string | null = anchor.getAttribute("href");
  return href ? href.substring(1) : '';
}

/**
 * Checks if a section with the given ID exists in the document
 * @param sectionId - The ID of the section to check
 * @returns True if the section exists, false otherwise
 */
function sectionExists(sectionId: string): boolean {
  return !!document.getElementById(sectionId);
}

/**
 * Updates the URL hash without triggering a scroll
 * @param sectionId - The section ID to set in the URL
 */
function updateUrlHash(sectionId: string): void {
  history.replaceState(null, '', `#${sectionId}`);
}

/**
 * Scrolls to a specific section with smooth animation
 * @param sectionId - The ID of the section to scroll to
 * @param offset - Pixel offset from the top of the section
 */
function scrollToSection(sectionId: string, offset: number): void {
  const targetElement: HTMLElement | null = document.getElementById(sectionId);
  if (targetElement) {
    const scrollPosition: number = calculateScrollPosition(targetElement, offset);
    smoothScrollTo(scrollPosition);
  }
}

/**
 * Calculates the scroll position for a target element
 * @param element - The target element
 * @param offset - Pixel offset from the top
 * @returns The calculated scroll position
 */
function calculateScrollPosition(element: HTMLElement, offset: number): number {
  return element.offsetTop - offset;
}

/**
 * Performs a smooth scroll to a specific position
 * @param position - The vertical scroll position in pixels
 */
function smoothScrollTo(position: number): void {
  window.scrollTo({
    top: position,
    behavior: "smooth"
  });
}