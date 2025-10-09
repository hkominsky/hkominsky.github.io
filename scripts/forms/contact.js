/**
 * Initializes the contact form submission handling
 */
export function contactFormInit() {
  const contactForm = document.getElementById('contactForm');
  const apiResponse = document.getElementById('apiResponse');

  if (!contactForm) return;

  contactForm.addEventListener('submit', handleFormSubmit(contactForm, apiResponse));
}

/**
 * Creates a form submit handler
 * @param {HTMLFormElement} form - The contact form element
 * @param {HTMLElement} responseElement - The element to display response messages
 * @returns {Function} The submit event handler
 */
function handleFormSubmit(form, responseElement) {
  const URL = "https://script.google.com/macros/s/AKfycbwXEQ8Fu2jBDr7KLDNASK6njDyu9RQakWUnvG_lV5nJrq5IyDhcF06KvSlIaBrJNYw3Ow/exec";
  
  return (e) => {
    e.preventDefault();

    const formElements = getFormElements(form);
    const formData = getFormData(form);

    if (!validateFormData(formData)) {
      showResponseMessage(responseElement, "Please fill in all required fields.", "error");
      return;
    }

    setFormState(formElements, true);
    showSendingMessage(responseElement, formData.name);

    submitFormData(URL, formData)
      .then(() => handleSuccess(form, responseElement))
      .catch(() => handleError(responseElement))
      .finally(() => handleComplete(formElements, responseElement));
  };
}

/**
 * Gets all form input elements
 * @param {HTMLFormElement} form - The form element
 * @returns {Object} Object containing form elements and submit button
 */
function getFormElements(form) {
  return {
    inputs: form.querySelectorAll('.form-input, .form-textarea'),
    submitButton: form.querySelector('.form-button')
  };
}

/**
 * Extracts and trims form data
 * @param {HTMLFormElement} form - The form element
 * @returns {Object} The form data object
 */
function getFormData(form) {
  return {
    name: form.name.value.trim(),
    email: form.email.value.trim(),
    message: form.message.value.trim()
  };
}

/**
 * Validates that all required form fields are filled
 * @param {Object} formData - The form data to validate
 * @returns {boolean} True if all fields are filled, false otherwise
 */
function validateFormData(formData) {
  return formData.name && formData.email && formData.message;
}

/**
 * Shows a sending message with the user's first name
 * @param {HTMLElement} element - The response element
 * @param {string} fullName - The user's full name
 */
function showSendingMessage(element, fullName) {
  const firstName = fullName.split(" ")[0];
  showResponseMessage(element, `Your message is being sent, ${firstName}...`);
}

/**
 * Submits form data to the API
 * @param {string} url - The API endpoint URL
 * @param {Object} data - The form data to submit
 * @returns {Promise} The fetch promise
 */
function submitFormData(url, data) {
  return fetch(url, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
}

/**
 * Handles successful form submission
 * @param {HTMLFormElement} form - The form to reset
 * @param {HTMLElement} responseElement - The response element
 */
function handleSuccess(form, responseElement) {
  form.reset();
  showResponseMessage(responseElement, "Message sent! I'll reach out to you as soon as possible.", "success");
}

/**
 * Handles form submission error
 * @param {HTMLElement} responseElement - The response element
 */
function handleError(responseElement) {
  showResponseMessage(responseElement, "There was an error sending your message. Please try again!", "error");
}

/**
 * Handles completion of form submission (success or failure)
 * @param {Object} formElements - Object containing form elements
 * @param {HTMLElement} responseElement - The response element
 */
function handleComplete(formElements, responseElement) {
  setFormState(formElements, false);
  setTimeout(() => responseElement.style.display = "none", 5000);
}

/**
 * Sets the enabled/disabled state of form elements
 * @param {Object} formElements - Object containing inputs and submitButton
 * @param {boolean} isDisabled - Whether to disable (true) or enable (false) the elements
 */
function setFormState(formElements, isDisabled) {
  const { inputs, submitButton } = formElements;
  
  inputs.forEach(el => { 
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