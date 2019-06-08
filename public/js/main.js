const webhookHandler = require("discord-webhook-api");

const config = require("./config.json");

const newWebhook = new webhookHandler();

const submitButton = document.querySelector("#submit-button");
const webhookInput = document.querySelector("#webhook-input");
const colorInput = document.querySelector("#color-input");
const delayInput = document.querySelector("#delay-input");
const titleInput = document.querySelector("#title-input");
const descriptionInput = document.querySelector("#description-input");
const photoInput = document.querySelector("#photo-input");
const footerInput = document.querySelector("#footer-input");

// Run refresh command to load products on init
window.onload = onLoad;

// Listen for click
submitButton.addEventListener("click", sendToDiscord);

// run this on load
function onLoad() {
  let oldWebhook = JSON.parse(localStorage.getItem("webhook"));
  let oldColor = JSON.parse(localStorage.getItem("color"));
  let oldDelay = JSON.parse(localStorage.getItem("delay"));

  if (oldWebhook) {
    webhookInput.value = oldWebhook;
  }

  if (oldColor) {
    colorInput.value = oldColor;
  }

  if (oldDelay) {
    delayInput.value = oldDelay;
  }
}

// use setTimeout to create a delay webhook
function sendToDiscord(e) {
  e.preventDefault();

  // define all values
  let webhook = webhookInput.value,
    title = titleInput.value,
    color = colorInput.value,
    delay = delayInput.value,
    description = descriptionInput.value,
    image = photoInput.value,
    footer = footerInput.value;

  // Test for empty inputs
  if (
    webhook == "" ||
    title == "" ||
    color == "" ||
    delay == "" ||
    description == ""
  ) {
    alert("Missing info");
    return;
  }

  // Set these as defaults since they will most likely stay the same
  localStorage.setItem("webhook", JSON.stringify(webhook));
  localStorage.setItem("color", JSON.stringify(color));
  localStorage.setItem("delay", JSON.stringify(delay));

  setTimeout(() => {
    newWebhook
      .addTitle(title)
      .addDescription(description)
      .addImageUrl(image)
      .addColor(color)
      .addFooter(footer)
      .addTimestamp()
      .sendTo(webhook);
  }, delay);
}
