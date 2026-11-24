const mongoose = require("mongoose");
// Blueprint for what every book must look like
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  isbn: { type: String, unique: true },
  publishedDate: { type: Date },
  inStock: { type: Boolean, default: true },
});
