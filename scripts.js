const changeTheme = () => {
  const currTheme = document.documentElement.getAttribute("page-theme");
  const newTheme = currTheme === "dark" ? "light" : "dark";
  
  document.querySelector(".toggle").classList.toggle("active");
  document.documentElement.setAttribute("page-theme", newTheme);
  localStorage.setItem("theme", newTheme);

  ["location", "linkedin", "github", "me"].forEach(id => {
    document.getElementById(`${id}-icon`).src = `images/${id}${newTheme === "dark" ? "-dark" : "-light"}.png`;
  });
};

document.addEventListener("DOMContentLoaded", function () {
    const offset = 150;
    document.querySelectorAll("a[href^='#']").forEach(anchor => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href").substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - offset,
            behavior: "smooth"
          });
        }
      });
    });
  });
  
  document.addEventListener("DOMContentLoaded", function () {
    const URL = "https://script.google.com/macros/s/AKfycbwXEQ8Fu2jBDr7KLDNASK6njDyu9RQakWUnvG_lV5nJrq5IyDhcF06KvSlIaBrJNYw3Ow/exec";
    const apiResponse = document.getElementById('apiResponse');

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
    
        // Disable the submit button and change its cursor to a loading indicator.
        const submitButton = this.querySelector('input[type="submit"]');
        const formElements = this.querySelectorAll('input, textarea');
        formElements.forEach(el => {
           el.disabled = true; 
           el.style.cursor = "wait";
        });
        submitButton.disabled = true;
        document.body.style.cursor = "wait";
        
        const formData = {
          name: this.name.value,
          email: this.email.value,
          message: this.message.value
        };

        const name = formData.name.split(" ")[0];
        apiResponse.textContent = `Your message is being sent, ${name}...`;
        apiResponse.style.display = "block";
        apiResponse.scrollIntoView({ behavior: "smooth", block: "center" });
    
        fetch(URL, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData)
        })
        .then(data => {
          console.log("Submitted successfully:", data);
          this.reset();
          apiResponse.textContent = "Message sent! I’ll reach out to you as soon as possible.";
          apiResponse.className = "contact-api-response success";
        })
        .catch(error => {
          console.error("Error:", error);
          apiResponse.textContent = "There was an error sending your message. Please try again!";
          apiResponse.className = "contact-api-response error";
        })
        .finally(() => {
          formElements.forEach((el => {
            el.disabled = false; 
            el.style.cursor = "text";
         }));
          submitButton.disabled = false;
          document.body.style.cursor = "default";
          setTimeout(function() {
            contactForm.scrollIntoView({ behavior: "smooth", block: "center" });
            apiResponse.style.display = "none";
          }, 5000);
        });
      });
    } else {
      console.error("contactForm not found in the DOM!");
    }
  });

  document.addEventListener('DOMContentLoaded', () => {
    const gridItems = document.querySelectorAll('.bento-grid .item');
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const closeBtn = document.querySelector('.close-btn');
  
    const projectsData = [
      {
        title: "Pickaxe Knockout",
        description: "A fast-paced game leveraging Unreal Engine 5 and Niagara effects."
      },
      {
        title: "Husky Overflow",
        description: "A responsive web app built with Typescript, HTML, and CSS for seamless user experience."
      },
      {
        title: "Cryptocurrency Predicter",
        description: "Utilized a predictive model to forecast cryptocurrency trends."
      },
      {
        title: "Photo Editor",
        description: "A recreation of the application."
      },
      {
        title: "Endzone Analytics",
        description: "A comprehensive data analysis tool."
      },
      {
        title: "Perks FFA",
        description: "Project details coming soon."
      }
    ];
  
    // Attach click events to each project grid item
    gridItems.forEach((item, index) => {
      item.addEventListener('click', () => {
        modalTitle.textContent = projectsData[index].title;
        modalDescription.textContent = projectsData[index].description;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      });
    });
  
    // Close the modal when the close button is clicked
    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    });
  
    // Optionally, close the modal when clicking outside the modal-content
    window.addEventListener('click', (event) => {
      if (event.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
      }
    });
  });  
  