/**
 * Initializes the contact form submission handling
 * Sets up form validation, API submission, and user feedback
 */
export function contactFormInit() {
  const contactForm = document.getElementById('contactForm');
  const apiResponse = document.getElementById('apiResponse');

  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const URL = "https://script.google.com/macros/s/AKfycbwXEQ8Fu2jBDr7KLDNASK6njDyu9RQakWUnvG_lV5nJrq5IyDhcF06KvSlIaBrJNYw3Ow/exec";

    const submitButton = contactForm.querySelector('.form-button');
    const formElements = contactForm.querySelectorAll('.form-input, .form-textarea');

    setFormState(formElements, submitButton, true);

    const formData = {
      name: contactForm.name.value.trim(),
      email: contactForm.email.value.trim(),
      message: contactForm.message.value.trim()
    };

    if (!formData.name || !formData.email || !formData.message) {
      showResponseMessage(apiResponse, "Please fill in all required fields.", "error");
      setFormState(formElements, submitButton, false);
      return;
    }

    const firstName = formData.name.split(" ")[0];
    showResponseMessage(apiResponse, `Your message is being sent, ${firstName}...`);

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
    element.className = `form-response form-response-${type}`;
  }
}
