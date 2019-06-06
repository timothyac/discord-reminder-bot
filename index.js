const webhookHandler = require("discord-webhook-api");
const express = require("express");
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require("path");
const fs = require("fs");

const newWebhook = new webhookHandler();

// Initialize app
const app = express();
const port = process.env.PORT || 5000;

// Set up middleware and src
app.use(express.static(`${__dirname}/public`));
// app.use(bodyParser.json());/ 
// app.use(bodyParser.urlencoded({ extended: true }));

const upload = multer({
  dest: "./uploads"
});

const handleError = (err, res) => {
  console.log(err)
  res
    .status(500)
    .contentType("text/plain")
    .end("Oops! Something went wrong!");
};

app.post('/send', upload.single("image" /* name attribute of <file> element in your form */),(req, res) => {
  console.log(req.body)
  let { webhook, title, color, delay, description } = req.body

  const tempPath = req.image.path;
  const targetPath = path.join(__dirname, "./uploads/image.jpg");

  console.log(req.image.path)

    if (path.extname(req.image.originalname).toLowerCase() === ".jpg") {
      fs.rename(tempPath, targetPath, err => {
        if (err) return handleError(err, res);

        console.log("File uploaded")
      });
    } else {
      fs.unlink(tempPath, err => {
        if (err) return handleError(err, res);

        res
          .status(403)
          .contentType("text/plain")
          .end("Only .jpg files are allowed!");
        return
      });
    }

  sendToDiscord(webhook, title, color, delay, description, image )
  res.statusCode = 200
  res.redirect('/')
})

app.post(
  "/upload",
  upload.single("image" /* name attribute of <file> element in your form */),
  (req, res) => {
    const tempPath = req.file.path;
    const targetPath = path.join(__dirname, "./uploads/image.png");

    if (path.extname(req.file.originalname).toLowerCase() === ".png") {
      fs.rename(tempPath, targetPath, err => {
        if (err) return handleError(err, res);

        console.log("File uploaded!");
      });
    } else {
      fs.unlink(tempPath, err => {
        if (err) return handleError(err, res);

        return res
          .status(403)
          .contentType("text/plain")
          .end("Only .png files are allowed!");
      });
    }

  let { webhook, title, color, delay, description } = req.body
  sendToDiscord(webhook, title, color, delay, description, path.join(__dirname, "./uploads/image.png") )
  res.statusCode = 200
  res.redirect('/')
  }

);

// Listens for a port to use
app.listen(port, () => {
  console.log(`Server started on ${port}`);
});

function sendToDiscord(webhook, title, color, delay, description, image ) {
  // let webhook = webhookInput.value;
  // let title = titleInput.value;
  // let color = colorInput.value;
  // let delay = delayInput.value;
  // let description = descriptionInput.value;
  // let image = "https://pbs.twimg.com/media/D6KdDkWXkAIWaLO.jpg";

  if (
    webhook == "" ||
    title == "" ||
    color == "" ||
    delay == "" ||
    description == ""
  ) {
    console.log("Missing info");
    return;
  }

  setTimeout(() => {
    newWebhook
      .addTitle(title || "Test title")
      .addDescription(description || "Test description")
      .addImageUrl(image || "https://pbs.twimg.com/media/D6KdDkWXkAIWaLO.png")
      .addColor(color || "#F00000")
      .addTimestamp()
      .sendTo(webhook, image);
  }, delay);
}
