const webhookHandler = require("discord-webhook-api");
const express = require("express");
const config = require("./config.json");

const newWebhook = new webhookHandler();

// Initialize app
const app = express();
const port = process.env.PORT || 5000;

// Set Static Folder
app.use(express.static(`${__dirname}/public`));

// use setTimeout to create a delay webhook
const sendToDiscord = (delay, title, description, image, color) => {
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
};

// Run function
// sendToDiscord(10000);

// Listens for a port to use
app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
