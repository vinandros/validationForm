const sendBtn = document.querySelector("#enviar");
const resetBtn = document.querySelector("#resetBtn");
const form = document.querySelector("#enviar-mail");

const email = document.querySelector("#email");
const subject = document.querySelector("#asunto");
const msg = document.querySelector("#mensaje");

const regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

eventListeners();

function eventListeners() {
  document.addEventListener("DOMContentLoaded", startApp);

  email.addEventListener("blur", formValidation);
  subject.addEventListener("blur", formValidation);
  msg.addEventListener("blur", formValidation);

  resetBtn.addEventListener("click", resetForm);

  form.addEventListener("submit", sendEmail);
}

function startApp() {
  sendBtn.disabled = true;
  sendBtn.classList.add("cursor-not-allowed", "opacity-50");
  email.value = "";
  subject.value = "";
  msg.value = "";
}

function formValidation(e) {
  const input = e.target.value;
  const type = e.target.type;
  if (input.length > 0) {
    const error = document.querySelector("p.error");
    if (error) {
      error.remove();
    }

    e.target.classList.remove("border", "border-red-500");
    e.target.classList.add("border", "border-green-500");
  } else {
    e.target.classList.remove("border", "border-green-500");
    e.target.classList.add("border", "border-red-500");
    showError("Todos los campos son obligatorios");
  }

  if (type === "email") {
    if (regExp.test(input)) {
      const error = document.querySelector("p.error");
      if (error) {
        error.remove();
      }
      e.target.classList.remove("border", "border-red-500");
      e.target.classList.add("border", "border-green-500");
    } else {
      e.target.classList.remove("border", "border-green-500");
      e.target.classList.add("border", "border-red-500");
      showError("Email no es válido.");
    }
  }
  if (regExp.test(email.value) && subject.value != "" && msg.value != "") {
    sendBtn.disabled = false;
    sendBtn.classList.remove("cursor-not-allowed", "opacity-50");
  }
}

function showError(msg = "Campos invalidos") {
  const msgError = document.createElement("p");
  msgError.textContent = msg;
  msgError.classList.add(
    "border",
    "border-red-500",
    "backgorud-red-100",
    "text-red-500",
    "p-3",
    "mt-5",
    "text-center",
    "error"
  );

  const errors = document.querySelectorAll(".error");
  if (errors.length === 0) {
    form.appendChild(msgError);
  }
}

function sendEmail(e) {
  e.preventDefault();
  const spinner = document.querySelector("#spinner");
  spinner.style.display = "flex";

  setTimeout(() => {
    spinner.style.display = "none";
    const par = document.createElement("p");
    par.textContent = "Mensaje Enviado";
    par.classList.add(
      "text-center",
      "p-2",
      "bg-green-500",
      "my-10",
      "text-white",
      "font-bold",
      "uppercase"
    );

    form.insertBefore(par, spinner);
    setTimeout(() => {
      par.remove();
      resetForm();
    }, 5000);
  }, 3000);
}

function resetForm() {
  form.reset();
  startApp();
}
