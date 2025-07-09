export function getStoredTheme() {
  return localStorage.getItem("theme");
}

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

function updateThemeImages(theme) {
  const updateImage = (selector, imageId) => {
    const element = typeof selector === 'string' ? document.querySelector(selector) : selector;
    if (element) {
      element.src = `/home/images/icons/${imageId}-${theme}.png`;
    }
  };

  updateImage('.theme-toggle__button img', 'theme');

  ["location", "resume", "linkedin", "github", "me"].forEach(id => {
    updateImage(document.getElementById(`${id}-icon`), id);
  });

  document.querySelectorAll(".card-icon img").forEach(img => {
    img.src = `images/icons/code-${theme}.svg`;
  });
}


export function changeTheme() {
  const currTheme = document.documentElement.getAttribute("page-theme");
  const newTheme = currTheme === "dark" ? "light" : "dark";
  localStorage.setItem("theme", newTheme);
  applyTheme(newTheme);
}
