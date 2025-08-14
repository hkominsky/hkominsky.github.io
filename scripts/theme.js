/**
 * Retrieves the currently stored theme from localStorage.
 * @returns {string|null} The stored theme ("light" or "dark"), or null if none stored.
 */
export function getStoredTheme() {
  return localStorage.getItem("theme");
}

/**
 * Applies the given theme by setting the attribute on the document and updating UI elements.
 * @param {string} theme - The theme to apply ("light" or "dark").
 */
export function applyTheme(theme) {
  if (!["light", "dark"].includes(theme)) {
    theme = "light";
  }

  document.documentElement.setAttribute("page-theme", theme);

  const themeToggleContainer = document.querySelector(".theme-toggle");
  if (themeToggleContainer) {
    themeToggleContainer.classList.toggle("active", theme === "dark");
  }

  updateThemeImages(theme);
}

/**
 * Updates images/icons on the page to match the current theme.
 * @param {string} theme - The active theme ("light" or "dark").
 */
function updateThemeImages(theme) {
  /**
   * Updates a single image source based on theme.
   * @param {string|Element} selector - CSS selector string or DOM element for the image.
   * @param {string} imageId - The base ID/name of the image file.
   */
  const updateImage = (selector, imageId) => {
    const element = typeof selector === 'string' ? document.querySelector(selector) : selector;
    if (element) {
      element.src = `/home/images/icons/${imageId}-${theme}.png`;
    }
  };

  updateImage('.theme-toggle-button img', 'theme');

  ["location", "resume", "linkedin", "github", "me"].forEach(id => {
    updateImage(document.getElementById(`${id}-icon`), id);
  });

  document.querySelectorAll(".card-icon img").forEach(img => {
    img.src = `images/icons/code-${theme}.svg`;
  });
}

/**
 * Toggles the current theme between "light" and "dark", stores the preference, and applies it.
 */
export function changeTheme() {
  const currTheme = document.documentElement.getAttribute("page-theme");
  const newTheme = currTheme === "dark" ? "light" : "dark";
  localStorage.setItem("theme", newTheme);
  applyTheme(newTheme);
}