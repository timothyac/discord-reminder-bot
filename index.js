const express = require("express");
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require("path");

const upload = multer();

// Initialize app
const app = express();
const port = process.env.PORT || 5000;

// Set up middleware and src
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array()); 

app.post('/', (req, res) => {
  console.log(req.body)
  res.statusCode = 200
  res.redirect('/')
})

// Listens for a port to use
app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
