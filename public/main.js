const VCard = window.vcardcreator

const form = document.getElementById("form")

const initInput = (key) => {
  const input = document.getElementById(key)

  const checkboxKey = `${key}-included`

  const checkbox = document.getElementById(checkboxKey)

  input.value = localStorage.getItem(key)

  checkbox.checked = localStorage.getItem(checkboxKey) === "true"

  input.addEventListener("input", (event) => {
    const value = event.target.value

    localStorage.setItem(key, value)

    const booleanValue = Boolean(value)

    checkbox.checked = booleanValue

    localStorage.setItem(checkboxKey, booleanValue)

    updateQR()
  })

  checkbox.addEventListener("change", () => {
    localStorage.setItem(checkboxKey, checkbox.checked)

    updateQR()
  })

  return [input, checkbox]
}

const [firstNameInput, firstNameIncluded] = initInput("first-name")
const [lastNameInput, lastNameIncluded] = initInput("last-name")
const [phoneInput, phoneIncluded] = initInput("phone")
const [emailInput, emailIncluded] = initInput("email")

const qrCodeElement = document.getElementById("qrCode")
const qrCode = new QRCode(qrCodeElement)

const qrPlaceholder = document.getElementById("qrPlaceholder")

form.onsubmit = (event) => {
  event.preventDefault()

  updateQR()
}

const updateQR = () => {
  const vCard = new VCard()

  const { hasLastName, hasFirstName, hasPhone, hasEmail, hasAnyInfo } =
    getInfoState()

  vCard.addName(
    hasLastName ? lastNameInput.value : "",
    hasFirstName ? firstNameInput.value : ""
  )

  if (hasPhone) {
    vCard.addPhoneNumber(phoneInput.value)
  }

  if (hasEmail) {
    vCard.addEmail(emailInput.value)
  }

  if (hasAnyInfo) {
    qrCode.makeCode(vCard.toString())
    qrCodeElement.style.visibility = "visible"
    qrPlaceholder.style.visibility = "hidden"
  } else {
    qrCodeElement.style.visibility = "hidden"
    qrPlaceholder.style.visibility = "visible"
  }
}

const getInfoState = () => {
  const hasLastName = lastNameIncluded.checked && Boolean(lastNameInput.value)
  const hasFirstName =
    firstNameIncluded.checked && Boolean(firstNameInput.value)
  const hasPhone = phoneIncluded.checked && Boolean(phoneInput.value)
  const hasEmail = emailIncluded.checked && Boolean(emailInput.value)

  const hasAnyInfo = hasLastName || hasFirstName || hasPhone || hasEmail

  return {
    hasLastName,
    hasFirstName,
    hasPhone,
    hasEmail,
    hasAnyInfo,
  }
}

const { hasAnyInfo } = getInfoState()

if (hasAnyInfo) {
  updateQR()
}

const content = document.getElementById("content")
content.style.display = "block"

const footers = document.getElementsByTagName("footer")
footers[0].style.display = "block"

const qrMeCodeElement = document.getElementById("qrMeCode")
const qrMeCode = new QRCode(qrMeCodeElement)
qrMeCode.makeCode("https://qr-me.netlify.app/")
