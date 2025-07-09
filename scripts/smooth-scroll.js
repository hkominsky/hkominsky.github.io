/**
 * Initializes navigation and smooth scrolling functionality
 * Handles hash-based navigation and smooth scroll behavior
 */
export function projectNavigationInit() {
  const pageOffset = 110;

  setTimeout(() => {
    if (window.location.hash) {
      scrollToSection(window.location.hash.substring(1), pageOffset);
    }
  }, 100);

  document.addEventListener('click', (e) => {
    const anchor = e.target.closest("a[href*='#']");
    if (anchor) {
      const href = anchor.getAttribute("href");
      const sectionId = href.split('#')[1];

      if (sectionId && document.getElementById(sectionId)) {
        e.preventDefault();
        scrollToSection(sectionId, pageOffset);
        history.pushState(null, null, `#${sectionId}`);
      }
    }
  });

  window.addEventListener('hashchange', () => {
    if (window.location.hash) {
      scrollToSection(window.location.hash.substring(1), 100);
    }
  });
}

/**
 * Scrolls to a specific section with smooth animation
 * @param {string} sectionId - The ID of the section to scroll to
 * @param {number} offset - Pixel offset from the top of the section
 */
function scrollToSection(sectionId, offset) {
  const targetElement = document.getElementById(sectionId);
  if (targetElement) {
    window.scrollTo({
      top: targetElement.offsetTop - offset,
      behavior: "smooth"
    });
  }
}