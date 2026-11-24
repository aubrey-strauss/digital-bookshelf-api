require("dotenv").config();

const express = require("express");
const connectDB = require("./db/connection");
// Bring in the book routes
const bookRoutes = require("./routes/bookRoutes");
const app = express();

connectDB(); // Connect to MongoDB Atlas
app.use(express.json());
// Send every /api/books request to the book router
// ⚠️ This line must come after express.json(). Middleware runs top to bottom, so the JSON has to be unpacked before the book routes see it.
app.use("/api/books", bookRoutes); //This is called mounting. Inside the router, / now means /api/books, and /:id means /api/books/:id

const PORT = process.env.PORT || 3000;

// Test route to confirm the server is alive
app.get("/", (req, res) => res.send("📚 Digital Bookshelf API is running"));
// Start listening for requests
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`),
);
