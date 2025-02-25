  /** THEME TOGGLE FUNCTIONALITY **/
  const changeTheme = () => {
    const root = document.documentElement;
    const currTheme = root.getAttribute("page-theme");
    const newTheme = currTheme === "dark" ? "light" : "dark";

    document.querySelector(".toggle").classList.toggle("active");
    root.setAttribute("page-theme", newTheme);
    localStorage.setItem("theme", newTheme);

    ["location", "linkedin", "github", "me", "logo"].forEach(id => {
      document.getElementById(`${id}-icon`).src = `images/${id}-${newTheme}.png`;
    });
  };

document.addEventListener("DOMContentLoaded", () => {
  /** SMOOTH SCROLL FUNCTIONALITY **/
  const redirectOffset = 100;
  document.querySelectorAll("a[href^='#']").forEach(anchor => {
    anchor.addEventListener("click", (e) => {
      e.preventDefault();
      const targetElement = document.getElementById(anchor.getAttribute("href").substring(1));

      if (targetElement) {
        window.scrollTo({ top: targetElement.offsetTop - redirectOffset, behavior: "smooth" });
      }
    });
  });

  /** CONTACT FORM SUBMISSION **/
  const URL = "https://script.google.com/macros/s/AKfycbwXEQ8Fu2jBDr7KLDNASK6njDyu9RQakWUnvG_lV5nJrq5IyDhcF06KvSlIaBrJNYw3Ow/exec";
  const contactForm = document.getElementById('contactForm');
  const apiResponse = document.getElementById('apiResponse');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitButton = contactForm.querySelector('input[type="submit"]');
      const formElements = contactForm.querySelectorAll('input, textarea');

      // Disable form elements during submission
      formElements.forEach(el => { el.disabled = true; el.style.cursor = "wait"; });
      submitButton.disabled = true;
      document.body.style.cursor = "wait";

      const formData = {
        name: contactForm.name.value,
        email: contactForm.email.value,
        message: contactForm.message.value
      };

      const firstName = formData.name.split(" ")[0];
      apiResponse.textContent = `Your message is being sent, ${firstName}...`;
      apiResponse.style.display = "block";

      fetch(URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })
      .then(() => {
        contactForm.reset();
        apiResponse.textContent = "Message sent! I’ll reach out to you as soon as possible.";
        apiResponse.className = "contact-api-response success";
      })
      .catch(() => {
        apiResponse.textContent = "There was an error sending your message. Please try again!";
        apiResponse.className = "contact-api-response error";
      })
      .finally(() => {
        formElements.forEach(el => { el.disabled = false; el.style.cursor = "text"; });
        submitButton.disabled = false;
        document.body.style.cursor = "default";

        setTimeout(() => apiResponse.style.display = "none", 5000);
      });
    });
  } else {
    console.error("contactForm not found in the DOM!");
  }

  /** PROJECT MODAL FUNCTIONALITY **/
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modalTitle');
  const modalDescription = document.getElementById('modalDescription');
  const closeBtn = document.querySelector('.close-btn');
  const gridItems = document.querySelectorAll('.bento-grid .item');

  const projectsData = [
    { title: "Pickaxe Knockout", description: "A fast-paced game leveraging Unreal Engine 5 and Niagara effects." },
    { title: "Endzone Analytics", description: "A comprehensive data analysis tool." },
    { title: "Jawn", description: "A responsive web app built with TypeScript, HTML, and CSS for a seamless user experience." },
    { title: "Code Scout", description: "A responsive web app built with TypeScript, HTML, and CSS for a seamless user experience." },
    { title: "Perks FFA", description: "Project details coming soon." }
  ];

  const closeModal = () => {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  };

  gridItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      modalTitle.textContent = projectsData[index].title;
      modalDescription.textContent = projectsData[index].description;
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });
  });

  closeBtn.addEventListener('click', closeModal);
  window.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

});
