document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact");
  const inputs = form.querySelectorAll("input[aria-required='true'], textarea[aria-required='true']");

  // Custom messages
  const messages = {
    name: { required: "Error: Please enter your name." },
    email: {
      required: "Error: Please enter your email address.",
      invalid: "Error: Please enter a valid email address."
    },
    message: { required: "Error: Please enter a message." }
  };

  function showError(input, message) {
    const errorEl = document.getElementById(`error-message--${input.id}`);
    errorEl.textContent = message;
    input.classList.add("border-red-500", "focus:ring-red-200");
    input.setAttribute("aria-invalid", "true");
    input.setAttribute("aria-describedby", errorEl.id);
  }

  function clearError(input) {
    const errorEl = document.getElementById(`error-message--${input.id}`);
    errorEl.textContent = "";
    input.classList.remove("border-red-500", "focus:ring-red-200");
    input.removeAttribute("aria-invalid");
    input.removeAttribute("aria-describedby");
  }

  function validateInput(input) {
    let valid = true;
    let message = "";
    const fieldMessages = messages[input.id] || {};

    if (!input.value.trim()) {
      valid = false;
      message = fieldMessages.required;
    } else if (input.type === "email") {
      const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
      if (!emailPattern.test(input.value.trim())) {
        valid = false;
        message = fieldMessages.invalid;
      }
    }

    if (!valid) {
      showError(input, message);
    } else {
      clearError(input);
    }

    return valid;
  }

  inputs.forEach(input => {
    input.addEventListener("blur", () => validateInput(input));
    input.addEventListener("input", () => {
      if (input.hasAttribute("aria-invalid")) {
        validateInput(input);
      }
    });
  });

  form.addEventListener("submit", function (e) {
    let allValid = true;
    inputs.forEach(input => {
      if (!validateInput(input)) allValid = false;
    });

    if (!allValid) {
      e.preventDefault();
      const firstInvalid = form.querySelector("[aria-invalid='true']");
      if (firstInvalid) firstInvalid.focus();
    }
  });
});