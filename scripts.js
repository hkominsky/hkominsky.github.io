// ============================================================================
// INITIALIZATION
// ============================================================================

/**
 * Main initialization function that runs when DOM is loaded
 * Sets up all core functionality for the portfolio website
 */
document.addEventListener("DOMContentLoaded", () => {
  // Apply saved theme or default to light
  applyTheme(getStoredTheme() || "light");
  
  // Initialize all core components
  responsiveElementsInit();
  componentsInit();
  navigationInit();
  contactFormInit();
  projectLinksInit();
  scrollAnimationInit();
  
  // Position project card tags after layout is complete
  positionProjectCardTags();
});

// ============================================================================
// THEME MANAGEMENT
// ============================================================================

/**
 * Retrieves the stored theme from localStorage
 * @returns {string|null} The stored theme value or null if not found
 */
function getStoredTheme() {
  return localStorage.getItem("theme");
}

/**
 * Applies the specified theme to the website
 * Updates DOM attributes, UI elements, and images based on theme
 * @param {string} theme - The theme to apply ('light' or 'dark')
 */
const applyTheme = (theme) => {
  // Validate theme parameter
  if (!["light", "dark"].includes(theme)) {
    console.warn(`Invalid theme: ${theme}. Defaulting to light.`);
    theme = "light";
  }
  
  // Set theme attribute on root element
  document.documentElement.setAttribute("page-theme", theme);
  
  // Update theme toggle if it exists
  const themeToggleContainer = document.querySelector(".theme-toggle");
  if (themeToggleContainer) {
    themeToggleContainer.classList.toggle("active", theme === "dark");
  }

  // Update images based on theme
  updateThemeImages(theme);
};

/**
 * Updates image sources based on the current theme
 * Handles both icon images and theme-specific graphics
 * @param {string} theme - The current theme ('light' or 'dark')
 */
const updateThemeImages = (theme) => {
  // Function to safely update image source
  const updateImage = (selector, imageId) => {
    const element = typeof selector === 'string' ? document.querySelector(selector) : selector;
    if (element) {
      element.src = `/images/icons/${imageId}-${theme}.png`;
    }
  };

  // Update main UI elements
  updateImage('.theme-toggle img', 'theme');
  updateImage('.logo-icon img', 'logo');
  
  // Update multiple icons efficiently
  ["location", "resume", "linkedin", "github", "me"].forEach(id => {
    const iconElement = document.getElementById(`${id}-icon`);
    if (iconElement) {
      updateImage(iconElement, id);
    }
  });

  // Update card icons (using SVG format)
  document.querySelectorAll(".card-icon img").forEach(img => {
    img.src = `/images/icons/code-${theme}.svg`;
  });
};

/**
 * Toggles between light and dark themes
 * Saves the new theme to localStorage and applies it
 */
function changeTheme() {
  const currTheme = document.documentElement.getAttribute("page-theme");
  const newTheme = currTheme === "dark" ? "light" : "dark";
  
  localStorage.setItem("theme", newTheme);
  applyTheme(newTheme);
}

// ============================================================================
// RESPONSIVE DESIGN
// ============================================================================

/**
 * Initializes responsive UI elements that adapt to screen size
 * Currently handles logo text truncation on mobile devices
 */
function responsiveElementsInit() {
  /**
   * Updates logo text based on screen width
   * Shows full name on desktop, abbreviated on mobile
   */
  function updateLogoText() {
    const logoText = document.querySelector(".logo-text");
    if (logoText) {
      logoText.textContent = window.innerWidth <= 450 ? "Hugh" : "Hugh Kominsky";
    }
  }
  
  // Set initial state and listen for resize events
  updateLogoText();
  window.addEventListener("resize", updateLogoText);
}

// ============================================================================
// COMPONENT LOADING
// ============================================================================

/**
 * Loads external HTML components like header and footer
 * Handles async loading and error states
 */
function componentsInit() {
  // Load header component
  fetch('/header.html')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text();
    })
    .then(data => {
      document.getElementById('header').innerHTML = data;
      // Re-initialize components that depend on header
      responsiveElementsInit();
      mobileMenuInit();
      applyTheme(getStoredTheme() || "light");
    })
    .catch(error => console.error("Error loading header:", error));

  // Load footer component
  fetch('/footer.html')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text();
    })
    .then(data => {
      document.getElementById('footer').innerHTML = data;
    })
    .catch(error => console.error("Error loading footer:", error));
}

// ============================================================================
// NAVIGATION AND SCROLLING
// ============================================================================

/**
 * Initializes navigation and smooth scrolling functionality
 * Handles hash-based navigation and smooth scroll behavior
 */
function navigationInit() {
  const pageOffset = 110;
  
  // Handle initial hash in URL after page load
  setTimeout(() => {
    if (window.location.hash) {
      scrollToSection(window.location.hash.substring(1), pageOffset);
    }
  }, 100);

  // Handle anchor clicks for smooth scrolling
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
  
  // Handle browser back/forward navigation
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

// ============================================================================
// MOBILE MENU
// ============================================================================

/**
 * Initializes mobile menu functionality
 * Sets up menu toggle, click handlers, and outside click detection
 */
function mobileMenuInit() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('header .header-content nav ul');
  
  if (!menuToggle || !navMenu) return;

  // Toggle menu on hamburger click
  menuToggle.addEventListener('click', () => toggleMenu(menuToggle, navMenu));

  // Close menu when clicking a navigation item
  document.querySelectorAll('header .header-content nav ul li a').forEach(link => {
    link.addEventListener('click', () => toggleMenu(menuToggle, navMenu, false));
  });

  // Close menu when clicking outside
  document.addEventListener('click', (event) => {
    if (!navMenu.contains(event.target) && 
        !menuToggle.contains(event.target) && 
        navMenu.classList.contains('active')) {
      toggleMenu(menuToggle, navMenu, false);
    }
  });
}

/**
 * Toggles the mobile menu state
 * @param {HTMLElement} toggle - The menu toggle button element
 * @param {HTMLElement} menu - The menu container element
 * @param {boolean|null} state - Optional explicit state (true=open, false=closed, null=toggle)
 */
function toggleMenu(toggle, menu, state = null) {
  if (state === null) {
    toggle.classList.toggle('active');
    menu.classList.toggle('active');
  } else {
    toggle.classList.toggle('active', state);
    menu.classList.toggle('active', state);
  }
}

// ============================================================================
// CONTACT FORM
// ============================================================================

/**
 * Initializes the contact form submission handling
 * Sets up form validation, API submission, and user feedback
 */
function contactFormInit() {
  const contactForm = document.getElementById('contactForm');
  const apiResponse = document.getElementById('apiResponse');
  
  if (!contactForm) return;
  
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // API endpoint for form submission
    const URL = "https://script.google.com/macros/s/AKfycbwXEQ8Fu2jBDr7KLDNASK6njDyu9RQakWUnvG_lV5nJrq5IyDhcF06KvSlIaBrJNYw3Ow/exec";
    
    // Form elements
    const submitButton = contactForm.querySelector('input[type="submit"]');
    const formElements = contactForm.querySelectorAll('input, textarea');
    
    // Disable form during submission
    setFormState(formElements, submitButton, true);
    
    // Get form data
    const formData = {
      name: contactForm.name.value.trim(),
      email: contactForm.email.value.trim(),
      message: contactForm.message.value.trim()
    };
    
    // Basic form validation
    if (!formData.name || !formData.email || !formData.message) {
      showResponseMessage(apiResponse, "Please fill in all required fields.", "error");
      setFormState(formElements, submitButton, false);
      return;
    }
    
    // Show sending message
    const firstName = formData.name.split(" ")[0];
    showResponseMessage(apiResponse, `Your message is being sent, ${firstName}...`);
    
    // Submit form
    fetch(URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    })
    .then(() => {
      contactForm.reset();
      showResponseMessage(apiResponse, "Message sent! I'll reach out to you as soon as possible.", "success");
    })
    .catch(() => {
      showResponseMessage(apiResponse, "There was an error sending your message. Please try again!", "error");
    })
    .finally(() => {
      setFormState(formElements, submitButton, false);
      setTimeout(() => apiResponse.style.display = "none", 5000);
    });
  });
}

/**
 * Sets the enabled/disabled state of form elements
 * @param {NodeList} elements - The form input elements
 * @param {HTMLElement} submitButton - The form submit button
 * @param {boolean} isDisabled - Whether to disable (true) or enable (false) the elements
 */
function setFormState(elements, submitButton, isDisabled) {
  elements.forEach(el => { 
    el.disabled = isDisabled; 
    el.style.cursor = isDisabled ? "wait" : "text";
  });
  submitButton.disabled = isDisabled;
  document.body.style.cursor = isDisabled ? "wait" : "default";
}

/**
 * Displays a response message to the user
 * @param {HTMLElement} element - The element to display the message in
 * @param {string} message - The message text to display
 * @param {string} type - Optional message type for styling ('success', 'error', etc.)
 */
function showResponseMessage(element, message, type = "") {
  element.textContent = message;
  element.style.display = "block";
  if (type) {
    element.className = `contact-api-response ${type}`;
  }
}

// ============================================================================
// PROJECT NAVIGATION
// ============================================================================

/**
 * Provides linkage between bento grid items and each project's respective page
 * Maps project card clicks to their corresponding project detail pages
 */
function projectLinksInit() {
  // Project URLs mapping
  const projectMap = new Map([
    [0, 'projects/pickaxe-knockout.html'],
    [1, 'projects/code-scout.html'],
    [2, 'projects/endzone-analytics.html'],
    [3, 'projects/perks-ffa.html']
  ]);

  // Select all project cards and add click handlers
  const projects = document.querySelectorAll('#projects .project-card');
  projects.forEach((card, index) => {
    card.style.cursor = "pointer";
    card.addEventListener('click', () => {
      const projectUrl = projectMap.get(index);
      if (projectUrl) {
        window.location.href = projectUrl;
      }
    });
  });
}

// ============================================================================
// ANIMATIONS AND VISUAL EFFECTS
// ============================================================================

/**
 * Initializes scroll-based animations using Intersection Observer
 * Animates elements when they come into view
 */
function scrollAnimationInit() {
  const animateElements = document.querySelectorAll('.scroll-animate');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, {
    threshold: 0.25,
    rootMargin: '0px 0px -50px 0px'
  });
  
  animateElements.forEach(element => {
    observer.observe(element);
  });
}

/**
 * Positions project card tags relative to their associated images
 * Ensures tags are properly aligned with the bottom border of project images
 */
function positionProjectCardTags() {
  document.querySelectorAll('.project-card').forEach(card => {
    const image = card.querySelector('.project-card-image');
    const tags = card.querySelector('.project-card-tags');
    
    if (!image || !tags) return;

    const imageHeight = image.offsetHeight;
    // Position tags vertically centered on the bottom border of image
    tags.style.top = `${imageHeight}px`;
  });
}

// Set up event listeners for tag positioning
window.addEventListener('DOMContentLoaded', positionProjectCardTags);
window.addEventListener('resize', positionProjectCardTags);