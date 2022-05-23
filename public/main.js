const VCard = window.vcardcreator;

const form = document.getElementById("form");
const firstNameInput = document.getElementById("first-name");
const lastNameInput = document.getElementById("last-name");
const phoneInput = document.getElementById("phone");
const emailInput = document.getElementById("email");

form.onsubmit = (event) => {
  event.preventDefault();

  const vCard = new VCard();

  vCard.addName(lastNameInput.value, firstNameInput.value);

  if (phoneInput.value) {
    vCard.addPhoneNumber(phoneInput.value);
  }

  if (emailInput.value) {
    vCard.addEmail(emailInput.value);
  }

  console.log(vCard.toString());
};
