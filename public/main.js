const VCard = window.vcardcreator;

const form = document.getElementById("form");

const initInput = (key) => {
  const input = document.getElementById(key);

  const checkboxKey = `${key}-included`;

  const checkbox = document.getElementById(checkboxKey);

  input.value = localStorage.getItem(key);

  checkbox.checked = localStorage.getItem(checkboxKey) === "true";

  input.addEventListener("input", (event) => {
    localStorage.setItem(key, event.target.value);

    checkbox.checked = true;

    localStorage.setItem(checkboxKey, true);

    updateQR();
  });

  checkbox.addEventListener("change", () => {
    localStorage.setItem(checkboxKey, checkbox.checked);

    updateQR();
  });

  return [input, checkbox];
};

const [firstNameInput, firstNameIncluded] = initInput("first-name");
const [lastNameInput, lastNameIncluded] = initInput("last-name");
const [phoneInput, phoneIncluded] = initInput("phone");
const [emailInput, emailIncluded] = initInput("email");

const qrContainer = document.getElementById("qrContainer");
const qrCode = new QRCode(qrContainer);

form.onsubmit = (event) => {
  event.preventDefault();

  updateQR();
};

const updateQR = () => {
  const vCard = new VCard();

  const hasLastName = lastNameIncluded.checked && Boolean(lastNameInput.value);
  const hasFirstName =
    firstNameIncluded.checked && Boolean(firstNameInput.value);
  const hasPhone = phoneIncluded.checked && Boolean(phoneInput.value);
  const hasEmail = emailIncluded.checked && Boolean(emailInput.value);

  vCard.addName(
    hasLastName ? lastNameInput.value : "",
    hasFirstName ? firstNameInput.value : ""
  );

  if (hasPhone) {
    vCard.addPhoneNumber(phoneInput.value);
  }

  if (hasEmail) {
    vCard.addEmail(emailInput.value);
  }

  if (hasLastName || hasFirstName || hasPhone || hasEmail) {
    qrCode.makeCode(vCard.toString());
    qrContainer.style.visibility = "visible";
  } else {
    qrContainer.style.visibility = "hidden";
  }
};

const hasInfo =
  Boolean(firstNameInput.value) ||
  Boolean(lastNameInput.value) ||
  Boolean(phoneInput.value) ||
  Boolean(emailInput.value);

if (hasInfo) {
  updateQR();
}

const initDetails = (key) => {
  const details = document.getElementById(key);

  const open = localStorage.getItem(key) || "true";

  if (open === "true") {
    details.setAttribute("open", "");
  } else if (open === "false") {
    details.removeAttribute("open");
  }

  details.addEventListener("toggle", () => {
    localStorage.setItem(key, details.open ? "true" : "false");
  });
};

initDetails("aboutOpen");
initDetails("yourInfoOpen");
