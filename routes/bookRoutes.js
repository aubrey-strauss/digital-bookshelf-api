const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

router.post("/", async (req, res) => {
  try {
    const book = await Book.create(req.body); //Correctly creates and saves a new book document. Responds with the created document and a 201 status.
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
