// ? =============> Global ===============>
const inputs = document.querySelectorAll("input");

let isValid = false;

// * =============> Events ===============>

document.forms[0].addEventListener("submit", (e) => {
  e.preventDefault();

  isValid =
    validationName() &&
    validationEmail() &&
    validationPhone() &&
    validationAge() &&
    validationPassword(inputs[6]) &&
    validationPassword(inputs[7]);

  if (isValid) {
    setForm();
  }
});

document.forms[0].addEventListener("input", () => {
  if (
    validationName() &&
    validationEmail() &&
    validationPhone() &&
    validationAge() &&
    validationPassword(inputs[6]) &&
    validationPassword(inputs[7])
  ) {
    isValid = true;
  } else {
    isValid = false;
  }

  updateSubmitButtonState(); // Check and update the submit button state
});
updateSubmitButtonState();
// ! =============> Functions ===============>
function setForm() {
  const password = inputs[6].value;
  const repassword = inputs[7].value;

  if (password === repassword) {
    const user = {
      name: inputs[2].value,
      email: inputs[3].value,
      phone: inputs[4].value,
      age: inputs[5].value,
      password: password,
      repassword: repassword,
    };
    $("#btnSubmit").removeClass("disabled");
    console.log(user);
  } else {
    // Passwords do not match, handle accordingly (e.g., display an error message).
    console.log("Passwords do not match");
  }
}
function clearData() {
  for (let i = 2; i <= 7; i++) {
    inputs[i].value = '';
    inputs[i].classList.remove("is-valid", "is-invalid");
  }
}
// !=============> Validation ===============>
function validationName() {
    const regexStyle =
    /^(?:[a-zA-Z0-9\s@,=%$#&_\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){2,20}$/;
  
    if (regexStyle.test(inputs[2].value)) {
      inputs[2].classList.add("is-valid");
      inputs[2].classList.remove("is-invalid");
      return true;
    } else {
      inputs[2].classList.add("is-invalid");
      inputs[2].classList.remove("is-valid");
      return false;
    }
  }
  
  function validationEmail() {
    const regexStyle =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    
      if (regexStyle.test(inputs[3].value)) {
      inputs[3].classList.add("is-valid");
      inputs[3].classList.remove("is-invalid");
      return true;
    } else {
      inputs[3].classList.add("is-invalid");
      inputs[3].classList.remove("is-valid");
      return false;
    }
  }
  function validationPhone() {
    const regexStyle =
      /^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[456789]\d{9}|(\d[ -]?){10}\d$/;
    if (regexStyle.test(inputs[4].value)) {
      inputs[4].classList.add("is-valid");
      inputs[4].classList.remove("is-invalid");
      return true;
    } else {
      inputs[4].classList.add("is-invalid");
      inputs[4].classList.remove("is-valid");
      return false;
    }
  }
  
  function validationAge() {
    const regexStyle = /^([1-7][0-9]|80)$/;
    if (regexStyle.test(inputs[5].value)) {
      inputs[5].classList.add("is-valid");
      inputs[5].classList.remove("is-invalid");
      return true;
    } else {
      inputs[5].classList.add("is-invalid");
      inputs[5].classList.remove("is-valid");
      return false;
    }
  }
  
  function validationPassword(input) {
    const regexStyle = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (regexStyle.test(input.value)) {
      input.classList.add("is-valid");
      input.classList.remove("is-invalid");
      return true;
    } else {
      input.classList.add("is-invalid");
      input.classList.remove("is-valid");
      return false;
    }
  }
  
  
  function checkAllInputsEmpty() {
    for (let i = 0; i < inputs.length; i++) {
      if (
        inputs[2].value.trim() !== "" &&
        inputs[3].value.trim() !== "" &&
        inputs[4].value.trim() !== "" &&
        inputs[5].value.trim() !== "" &&
        inputs[6].value.trim() !== "" &&
        inputs[7].value.trim() !== "" 
      ) {
        return false; // At least one input is not empty
      }
    }
    return true; // All inputs are empty
  }
  
  function updateSubmitButtonState() {
      const submitButton = document.querySelector(".btnSubmit");
      const isAllInputsEmpty = checkAllInputsEmpty();
      const password = inputs[6].value;
      const repassword = inputs[7].value;
    
      if (isAllInputsEmpty || password !== repassword) {
        submitButton.setAttribute("disabled", "true");
      } else {
        submitButton.removeAttribute("disabled");
      }
    }