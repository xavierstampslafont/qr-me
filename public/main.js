const VCard = window.vcardcreator;

const form = document.getElementById("form");

const initInput = (key) => {
  const input = document.getElementById(key);

  input.value = localStorage.getItem(key);

  input.addEventListener("input", (event) => {
    localStorage.setItem(key, event.target.value);
  });

  return input;
};

const firstNameInput = initInput("first-name");
const lastNameInput = initInput("last-name");
const phoneInput = initInput("phone");
const emailInput = initInput("email");

const qrContainer = new QRCode(document.getElementById("qrContainer"), {
  width: 150,
  height: 150,
});

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

  qrContainer.makeCode(vCard.toString());
};
