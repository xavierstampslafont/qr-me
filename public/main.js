window.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");
  const firstNameInput = document.getElementById("first-name");
  const lastNameInput = document.getElementById("last-name");
  const phoneInput = document.getElementById("phone");
  const emailInput = document.getElementById("email");

  form.onsubmit = (event) => {
    event.preventDefault();

    console.log("main");
  };
});
