/**
 * Main initialization function that runs when DOM is loaded
 */
document.addEventListener("DOMContentLoaded", () => {
  // Apply saved theme or default
  applyTheme(localStorage.getItem("theme") || "light");
  
  // Set up responsive elements
  responsiveElementsInit();
  
  // Load the header and footer of the page
  componentsInit();

  // Set up scroll and navigation
  navigationInit();

  // Set up contact form
  contactFormInit();
  
  // Set up links to project pages from bento grid item
  projectLinksInit();

  positionProjectCardTags();
});


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

// Run once after DOM loads
window.addEventListener('DOMContentLoaded', positionProjectCardTags);
// Optional: reposition on window resize to stay in sync
window.addEventListener('resize', positionProjectCardTags);
/**
 * Applies the specified theme to the website
 * 
 * @param {string} theme - The theme to apply ('light' or 'dark')
 */
const applyTheme = (theme) => {
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
 * 
 * @param {string} theme - The current theme ('light' or 'dark')
 */
const updateThemeImages = (theme) => {
  // Function to update image source
  const updateImage = (selector, imageId) => {
    const element = typeof selector === 'string' ? document.querySelector(selector) : selector;
    if (element) {
      element.src = `/images/${imageId}-${theme}.png`;
    }
  };

  // Update UI elements
  updateImage('.theme-toggle img', 'theme');
  updateImage('.logo-icon img', 'logo');
  
  // Update multiple icons in one go
  ["location", "linkedin", "github", "me"].forEach(id => {
    updateImage(document.getElementById(`${id}-icon`), id);
  });

  // Update card icons
  document.querySelectorAll(".card-icon img").forEach(img => {
    img.src = `/images/icons/code-${theme}.svg`;
  });
};

/**
 * Toggles between light and dark themes
 */
function changeTheme() {
  const currTheme = document.documentElement.getAttribute("page-theme");
  const newTheme = currTheme === "dark" ? "light" : "dark";
  
  localStorage.setItem("theme", newTheme);
  applyTheme(newTheme);
}

/**
 * Initializes responsive UI elements that adapt to screen size
 */
function responsiveElementsInit() {
  // Update logo text based on screen width
  function updateLogoText() {
    const logoText = document.querySelector(".logo-text");
    if (logoText) {
      logoText.textContent = window.innerWidth <= 450 ? "Hugh" : "Hugh Kominsky";
    }
  }
  
  updateLogoText();
  window.addEventListener("resize", updateLogoText);
}

/**
 * Loads external HTML components like header and footer
 */
function componentsInit() {
  // Load header
  fetch('/header.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('header').innerHTML = data;
      responsiveElementsInit();
      mobileMenuInit();
      applyTheme(localStorage.getItem("theme") || "light");
    })
    .catch(error => console.error("Error loading header:", error));

  // Load footer  
  fetch('/footer.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('footer').innerHTML = data;
    })
    .catch(error => console.error("Error loading footer:", error));
}

/**
 * Initializes navigation and smooth scrolling functionality
 */
function navigationInit() {
  const pageOffset = 110;
  
  // Handle initial hash in URL
  setTimeout(() => {
    if (window.location.hash) {
      scrollToSection(window.location.hash.substring(1), pageOffset);
    }
  }, 100);

  // Handle anchor clicks for smooth scrolling
  document.addEventListener('click', (e) => {
    const anchor = e.target.closest("a[href*='#']");
    if (anchor) {
      const sectionId = anchor.getAttribute("href").split('#')[1];
      if (document.getElementById(sectionId)) {
        e.preventDefault();
        scrollToSection(sectionId, pageOffset);
        history.pushState(null, null, `#${sectionId}`);
      }
    }
  });
  
  // Handle hash changes
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

/**
 * Initializes mobile menu functionality
 */
function mobileMenuInit() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('header .header-content nav ul');
  
  if (!menuToggle || !navMenu) return;

  // Toggle menu on click
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

/**
 * Initializes the contact form submission handling
 */
function contactFormInit() {
  const contactForm = document.getElementById('contactForm');
  const apiResponse = document.getElementById('apiResponse');
  
  if (!contactForm) return;
  
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // API endpoint
    const URL = "https://script.google.com/macros/s/AKfycbwXEQ8Fu2jBDr7KLDNASK6njDyu9RQakWUnvG_lV5nJrq5IyDhcF06KvSlIaBrJNYw3Ow/exec";
    
    // Form elements
    const submitButton = contactForm.querySelector('input[type="submit"]');
    const formElements = contactForm.querySelectorAll('input, textarea');
    
    // Disable form during submission
    setFormState(formElements, submitButton, true);
    
    // Get form data
    const formData = {
      name: contactForm.name.value,
      email: contactForm.email.value,
      message: contactForm.message.value
    };
    
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

function captchaSubmit(token) {
  document.getElementById("contactForm").submit();
}

function onClick(e) {
  e.preventDefault();
  grecaptcha.enterprise.ready(async () => {
    const token = await grecaptcha.enterprise.execute('6Ld5RwsrAAAAAKhAZR3NK7WwNbT5Z7OJqW_N3TCo', {action: 'submit_form'});
    
    // Now send this token to your server
    // Example using fetch:
    try {
      const response = await fetch('/verify-recaptcha', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });
      
      const result = await response.json();
      if (result.success) {
        document.getElementById("contactForm").submit();
      } else {
        console.error('reCAPTCHA verification failed');
        // Show error to user
      }
    } catch (error) {
      console.error('Error sending token to server:', error);
    }
  });
}

/**
 * Sets the enabled/disabled state of form elements
 * 
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
 * 
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

/**
 * Provides linkage between bento grid items and each project's respective page
 */
function projectLinksInit() {
  // Project URLs map
  const projectMap = new Map([
    [0, 'projects/pickaxe-knockout.html'],
    [1, 'projects/code-scout.html'],
    [2, 'projects/endzone-analytics.html'],
    [3, 'projects/perks-ffa.html']
  ]);

  // Select all project cards (not .item, which no longer exists)
  const projects = document.querySelectorAll('#projects .project-card');
  projects.forEach((card, index) => {
    card.style.cursor = "pointer";
    card.addEventListener('click', () => {
      window.location.href = projectMap.get(index);
    });
  });
}