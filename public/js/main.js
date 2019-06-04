const webhookHandler = require("discord-webhook-api");

const config = require("./config.json");

const newWebhook = new webhookHandler();

const submitButton = document.querySelector("#submit-button");
const webhookInput = document.querySelector("#webhook-input");
const colorInput = document.querySelector("#color-input");
const delayInput = document.querySelector("#delay-input");
const titleInput = document.querySelector("#title-input");
const descriptionInput = document.querySelector("#description-input");
const fileAttachment = document.querySelector("#file-attachment");

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

  let webhook = webhookInput.value;
  let title = titleInput.value;
  let color = colorInput.value;
  let delay = delayInput.value;
  let description = descriptionInput.value;
  let image = "https://pbs.twimg.com/media/D6KdDkWXkAIWaLO.jpg";

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

  localStorage.setItem("webhook", JSON.stringify(webhook));
  localStorage.setItem("color", JSON.stringify(color));
  localStorage.setItem("delay", JSON.stringify(delay));

  setTimeout(() => {
    newWebhook
      .addTitle(title || "Test title")
      .addDescription(description || "Test description")
      .addImageUrl(image || "https://pbs.twimg.com/media/D6KdDkWXkAIWaLO.jpg")
      .addColor(color || "#F00000")
      .addTimestamp()
      .sendTo(webhook);
  }, delay);
}

// Run function
// sendToDiscord(10000);

console.log("Running");
