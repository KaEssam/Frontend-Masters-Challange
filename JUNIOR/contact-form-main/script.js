document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#form");
  const firstNameInput = document.querySelector("#firstName");
  const firstNameError = document.querySelector("#firstNameError");
  const lastNameInput = document.querySelector("#lastName");
  const lastNameError = document.querySelector("#lastNameError");
  const emailInput = document.querySelector("#email");
  const emailError = document.querySelector("#emailError");
  const queryError = document.querySelector("#queryError");
  const generalRadioInput = document.querySelector("#general");
  const supportRadioInput = document.querySelector("#support");
  const messageInput = document.querySelector("#message");
  const messageError = document.querySelector("#messageError");
  const checkboxInput = document.querySelector("#checkbox");
  const checkboxError = document.querySelector("#checkboxError");
  const btnSubmit = document.querySelector("#btnSubmit");
  const radiosContainers = document.querySelectorAll(".radio-container");
  const submitedMessage = document.querySelector("#submited");
  const checked = document.querySelector("#check");
  const generalCheckedImage = document.querySelector("#radio-selected-general");
  const supportCheckedImage = document.querySelector("#radio-selected-support");
  const generalContainer = document.querySelector("#general-container");
  const supportContainer = document.querySelector("#support-container");

  generalRadioInput.addEventListener("click", () => {
    if (generalRadioInput.checked) {
      generalCheckedImage.classList.remove("hidden");
      supportCheckedImage.classList.add("hidden");
      generalContainer.style.backgroundColor = "hsl(148, 38%, 91%)";
      supportContainer.style.backgroundColor = "white";
    }
  });

  generalRadioInput.addEventListener("blur", () => {
    if (!generalRadioInput.checked) {
      generalContainer.style.backgroundColor = "white";
    }
  });

  supportRadioInput.addEventListener("click", () => {
    if (supportRadioInput.checked) {
      supportCheckedImage.classList.remove("hidden");
      generalCheckedImage.classList.add("hidden");
      supportContainer.style.backgroundColor = "hsl(148, 38%, 91%)";
      generalContainer.style.backgroundColor = "white";
    }
  });

  supportRadioInput.addEventListener("blur", () => {
    if (!supportRadioInput.checked) {
      supportContainer.style.backgroundColor = "white";
    }
  });

  document.addEventListener("click", event => {
    if (
      !event.target.matches("#general") &&
      !event.target.matches("#support")
    ) {
      generalContainer.style.backgroundColor = "white";
      supportContainer.style.backgroundColor = "white";
    }
  });

  checkboxInput.addEventListener("change", toggleVisibility);

  checked.addEventListener("click", () => {
    checkboxInput.checked = false;
    toggleVisibility();
  });

  function toggleVisibility() {
    if (checkboxInput.checked) {
      checked.classList.remove("hidden");
    } else {
      checked.classList.add("hidden");
    }
  }

  function validateForm(event) {
    event.preventDefault();
    let isValid = true;

    if (!firstNameInput.checkValidity()) {
      firstNameInput.classList.add("errorActive");
      firstNameError.innerText = "This field is required";
      isValid = false;
    } else {
      firstNameInput.classList.remove("errorActive");
      firstNameError.innerText = "";
    }

    if (!lastNameInput.checkValidity()) {
      lastNameInput.classList.add("errorActive");
      lastNameError.innerText = "This field is required";
      isValid = false;
    } else {
      lastNameInput.classList.remove("errorActive");
      lastNameError.innerText = "";
    }

    if (!emailInput.checkValidity()) {
      emailInput.classList.add("errorActive");
      emailError.innerText = "Please enter a valid email address";
      emailInput.value = "email@example.com";
      isValid = false;
    } else {
      emailInput.classList.remove("errorActive");
      emailError.innerText = "";
    }

    if (!generalRadioInput.checked && !supportRadioInput.checked) {
      queryError.innerText = "Please select a query type";
      radiosContainers.forEach(container => {
        container.classList.add("errorActive");
      });
      isValid = false;
    } else {
      queryError.innerText = "";
    }

    if (!messageInput.checkValidity()) {
      messageInput.classList.add("errorActive");
      messageError.innerText = "This field is required";
      isValid = false;
    } else {
      messageInput.classList.remove("errorActive");
      messageError.innerText = "";
    }

    if (!checkboxInput.checked) {
      checkboxError.innerText =
        "To submit this form, please consent to being contacted";
      isValid = false;
    } else {
      checkboxError.innerText = "";
    }

    if (isValid) {
      submitForm();
    }
  }

  function submitForm() {
    form.reset();
    submitedMessage.classList.remove("hidden");
    generalContainer.style.backgroundColor = "white";
    supportContainer.style.backgroundColor = "white";
    checked.classList.add("hidden");
  }

  btnSubmit.addEventListener("click", validateForm);
});
