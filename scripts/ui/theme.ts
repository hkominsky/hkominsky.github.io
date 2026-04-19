/**
 * Theme type
 */
type Theme = "light" | "dark";

/**
 * Retrieves the currently stored theme from localStorage.
 * @returns The stored theme ("light" or "dark"), or null if none stored.
 */
export function getStoredTheme(): string | null {
  return localStorage.getItem("theme");
}

/**
 * Applies the given theme by setting the attribute on the document and updating UI elements.
 * @param theme - The theme to apply ("light" or "dark").
 */
export function applyTheme(theme: string): void {
  let validTheme: Theme = "light";
  
  if (theme === "light" || theme === "dark") {
    validTheme = theme;
  }

  document.documentElement.setAttribute("page-theme", validTheme);

  const themeToggleContainer = document.querySelector<HTMLElement>(".theme-toggle");
  if (themeToggleContainer) {
    themeToggleContainer.classList.toggle("active", validTheme === "dark");
  }
}

/**
 * Toggles the current theme between "light" and "dark", stores the preference, and applies it.
 */
export function changeTheme(): void {
  const currTheme = document.documentElement.getAttribute("page-theme");
  const newTheme: Theme = currTheme === "dark" ? "light" : "dark";
  localStorage.setItem("theme", newTheme);
  applyTheme(newTheme);
}