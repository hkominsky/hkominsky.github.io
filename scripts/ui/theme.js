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