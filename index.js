const webhookHandler = require("discord-webhook-api");
const config = require("./config.json");

const newWebhook = new webhookHandler();

const sendToDiscord = delay => {
  console.log("delay is:", delay);

  setTimeout(() => {
    newWebhook
      .addTitle("Test title")
      .addDescription("Test description")
      .addImageUrl("https://pbs.twimg.com/media/D6KdDkWXkAIWaLO.jpg")
      .addColor("#F00000")
      .addTimestamp()
      .sendTo(config.webhook);
  }, delay);
};

sendToDiscord(10000);
