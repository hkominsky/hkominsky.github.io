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
  const modalTitle = document.getElementById('modal-title');
  const modalDescription = document.getElementById('modal-description');
  const closeBtn = document.querySelector('.close-btn');
  const experienceArticles = document.querySelectorAll('#experience .roles article');

  const workExperiences = [
    { 
      title: "Data Engineer Intern, J&K Seminars", 
      description: `
        - In response to inefficiencies in inventory management, I collaborated with a team to develop a new system, creating dynamic data visualizations and writing optimized SQL queries to improve data accessibility. This led to a more streamlined process, increasing the efficiency of data-driven decisions.
        - Faced with the need to enhance backend functionality, I utilized Python and SQL to write backend code that improved system reliability. As a result, the system supported smoother inventory operations and faster data retrieval.
        - To ensure the system's accuracy, I conducted rigorous data validation tests, identifying errors early. This increased the accuracy of reporting, leading to more reliable data insights.
        - Involved in the deployment phase, I worked on the integration of the new system into the company’s existing operations, ensuring a smooth transition without disruptions to daily activities.
      `
    },
    { 
      title: "Reinsurance Modeling Co-Op, Guy Carpenter", 
      description: `
        - Recognizing the need for improved risk assessment models, I assisted in developing tools to analyze large datasets using SQL, Python, and Excel. This resulted in more precise pricing strategies for reinsurance products.
        - To support decision-making, I created detailed reports and dashboards for senior management, helping them to better understand market trends. This led to more informed decisions and improved risk management.
        - Faced with inefficiencies in data collection, I helped automate processes, which saved time and reduced manual errors, improving workflow efficiency across departments.
        - Collaborating with cross-functional teams, I contributed to improving model accuracy, ultimately leading to enhanced risk models that better predicted financial outcomes.
      `
    },
    { 
      title: "Quantitative Developer Co-Op, Scotiabank", 
      description: `
        - In response to a need for improved mobile banking functionality, I developed and maintained features for the mobile app using Java and SQL, improving the user experience and customer satisfaction.
        - To ensure app stability, I identified and resolved bugs that hindered performance. This led to improved app reliability and increased customer trust in the platform.
        - Tasked with optimizing the backend systems, I worked on enhancing data processing speeds, resulting in a more responsive application and faster transactions.
        - Collaborating closely with product managers, I helped implement user feedback-driven features that aligned the mobile app with customer expectations, resulting in higher user engagement.
      `
    }
  ];
  

  const closeModal = () => {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  };

  experienceArticles.forEach((item, index) => {
    item.addEventListener('click', () => {
      modalTitle.textContent = workExperiences [index].title;
      modalDescription.textContent = workExperiences [index].description;
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });
  });

  closeBtn.addEventListener('click', closeModal);
  window.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

});
