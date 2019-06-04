const webhookHandler = require("discord-webhook-api");

const config = require("./config.json");

const newWebhook = new webhookHandler();

const submitButton = document.querySelector("#submit-input");

submitButton.addEventListener("click", sendToDiscord);

// use setTimeout to create a delay webhook
function sendToDiscord(e, delay, title, description, image, color) {
  e.preventDefault();
  console.log("delay is:", delay);

  setTimeout(() => {
    newWebhook
      .addTitle(title || "Test title")
      .addDescription(description || "Test description")
      .addImageUrl(image || "https://pbs.twimg.com/media/D6KdDkWXkAIWaLO.jpg")
      .addColor(color || "#F00000")
      .addTimestamp()
      .sendTo(config.webhook);
  }, delay);
}

// Run function
// sendToDiscord(10000);

console.log("Running");
