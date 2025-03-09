// Theme change functionality
const changeTheme = () => {
  const root = document.documentElement;
  const currTheme = root.getAttribute("page-theme");
  const newTheme = currTheme === "dark" ? "light" : "dark";

  document.querySelector(".theme-toggle").classList.toggle("active");
  root.setAttribute("page-theme", newTheme);
  localStorage.setItem("theme", newTheme);

  const updateImageSource = (element, imageId) => {
    if (element) {
      element.src = `/images/${imageId}-${newTheme}.png`;
    }
  };

  updateImageSource(document.querySelector('.logo-icon img'), 'logo');
  updateImageSource(document.querySelector('.theme-toggle img'), 'theme');

  ["location", "linkedin", "github", "me"].forEach(id => {
    updateImageSource(document.getElementById(`${id}-icon`), id);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  function updateLogoText() {
    let logoText = document.querySelector(".logo-text");
    if (logoText) {
      logoText.textContent = window.innerWidth <= 450 ? "Hugh" : "Hugh Kominsky";
    }
  }

  window.addEventListener("resize", updateLogoText);

  fetch('/header.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('header').innerHTML = data;
      updateLogoText(); // Ensure logo text updates after header is loaded
      setupMobileMenu();
    })
    .catch(error => console.error("Error loading the header:", error));

  fetch('/footer.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('footer').innerHTML = data;
    })
    .catch(error => console.error("Error loading the footer:", error));

  const pageOffset = 110;
  setTimeout(() => {
    if (window.location.hash) {
      const targetElement = document.getElementById(window.location.hash.substring(1));
      if (targetElement) {
        window.scrollTo({ top: targetElement.offsetTop - pageOffset, behavior: "smooth" });
      }
    }
  }, 100);

  document.addEventListener('click', (e) => {
    let anchor = e.target.closest("a[href*='#']");
    if (anchor) {
      let targetElement = document.getElementById(anchor.getAttribute("href").split('#')[1]);
      if (targetElement) {
        e.preventDefault();
        window.scrollTo({ top: targetElement.offsetTop - pageOffset, behavior: "smooth" });
        history.pushState(null, null, `#${targetElement.id}`);
      }
    }
  });
});

function setupMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('header .header-content nav ul');

  if (!menuToggle || !navMenu) return;

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  document.querySelectorAll('header .header-content nav ul li a').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  document.addEventListener('click', (event) => {
    if (!navMenu.contains(event.target) && !menuToggle.contains(event.target) && navMenu.classList.contains('active')) {
      menuToggle.classList.remove('active');
      navMenu.classList.remove('active');
    }
  });
}

window.addEventListener('hashchange', () => {
  if (window.location.hash) {
    const targetElement = document.getElementById(window.location.hash.substring(1));
    if (targetElement) {
      setTimeout(() => {
        window.scrollTo({ top: targetElement.offsetTop - 100, behavior: "smooth" });
      }, 100);
    }
  }
});
