/**
 * Initializes navigation and smooth scrolling functionality
 */
export function headerNavigationInit() {
  const pageOffset = 110;

  handleInitialHash(pageOffset);
  setupAnchorClickHandler(pageOffset);
  setupHashChangeHandler(pageOffset);
}

/**
 * Handles scrolling to hash on initial page load
 * @param {number} offset - Pixel offset from the top of the section
 */
function handleInitialHash(offset) {
  setTimeout(() => {
    const hash = getHashFromUrl();
    if (hash) {
      scrollToSection(hash, offset);
    }
  }, 100);
}

/**
 * Sets up click handler for anchor links
 * @param {number} offset - Pixel offset from the top of the section
 */
function setupAnchorClickHandler(offset) {
  document.addEventListener('click', (e) => {
    const anchor = findAnchorElement(e.target);
    if (!anchor) return;

    const sectionId = getSectionIdFromAnchor(anchor);
    if (sectionId && sectionExists(sectionId)) {
      e.preventDefault();
      scrollToSection(sectionId, offset);
      updateUrlHash(sectionId);
    }
  });
}

/**
 * Sets up handler for hash change events
 * @param {number} offset - Pixel offset from the top of the section
 */
function setupHashChangeHandler(offset) {
  window.addEventListener('hashchange', () => {
    const hash = getHashFromUrl();
    if (hash) {
      scrollToSection(hash, offset);
    }
  });
}

/**
 * Gets the hash from the current URL without the '#' symbol
 * @returns {string|null} The hash value or null if no hash exists
 */
function getHashFromUrl() {
  return window.location.hash ? window.location.hash.substring(1) : null;
}

/**
 * Finds the closest anchor element with a hash href
 * @param {HTMLElement} target - The clicked element
 * @returns {HTMLElement|null} The anchor element or null
 */
function findAnchorElement(target) {
  return target.closest("a[href^='#']");
}

/**
 * Extracts the section ID from an anchor element
 * @param {HTMLElement} anchor - The anchor element
 * @returns {string} The section ID without the '#' symbol
 */
function getSectionIdFromAnchor(anchor) {
  const href = anchor.getAttribute("href");
  return href ? href.substring(1) : '';
}

/**
 * Checks if a section with the given ID exists in the document
 * @param {string} sectionId - The ID of the section to check
 * @returns {boolean} True if the section exists, false otherwise
 */
function sectionExists(sectionId) {
  return !!document.getElementById(sectionId);
}

/**
 * Updates the URL hash without triggering a scroll
 * @param {string} sectionId - The section ID to set in the URL
 */
function updateUrlHash(sectionId) {
  history.replaceState(null, '', `#${sectionId}`);
}

/**
 * Scrolls to a specific section with smooth animation
 * @param {string} sectionId - The ID of the section to scroll to
 * @param {number} offset - Pixel offset from the top of the section
 */
function scrollToSection(sectionId, offset) {
  const targetElement = document.getElementById(sectionId);
  if (targetElement) {
    const scrollPosition = calculateScrollPosition(targetElement, offset);
    smoothScrollTo(scrollPosition);
  }
}

/**
 * Calculates the scroll position for a target element
 * @param {HTMLElement} element - The target element
 * @param {number} offset - Pixel offset from the top
 * @returns {number} The calculated scroll position
 */
function calculateScrollPosition(element, offset) {
  return element.offsetTop - offset;
}

/**
 * Performs a smooth scroll to a specific position
 * @param {number} position - The vertical scroll position in pixels
 */
function smoothScrollTo(position) {
  window.scrollTo({
    top: position,
    behavior: "smooth"
  });
}