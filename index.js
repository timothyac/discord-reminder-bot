const express = require("express");

// Initialize app
const app = express();
const port = process.env.PORT || 5000;

// Set Static Folder
app.use(express.static(`${__dirname}/public`));

// Listens for a port to use
app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
