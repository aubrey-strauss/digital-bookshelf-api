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

router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// It needs 3 inputs: which book (the URL ID), what to change (req.body), and options.
// new: true sends back the updated version, and runValidators: true keeps the schema rules on.
router.put("/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json({ message: "Book deleted successfully", book }); //Sends a confirmation message plus the deleted book, so you can see what was removed
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
