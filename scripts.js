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
  