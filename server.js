require("dotenv").config();

const express = require("express");

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

// Test route to confirm the server is alive
app.get("/", (req, res) => res.send("📚 Digital Bookshelf API is running"));
// Start listening for requests
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`),
);
