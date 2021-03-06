const mongoose = require("mongoose");

const Book = new mongoose.Schema({
  id: String,
  noOfCopies: Number,
  stock: Number,
  volumeInfo: {
    title: String,
    subtitle: String,
    authors: [],
    publisher: String,
    publishedDate: Date,
    description: String,
    pageCount: Number,
    categories: [],
    imageLinks: {
      smallThumbnail: String,
      thumbnail: String,
      small: String,
      medium: String,
      large: String,
      extraLarge: String
    },
    language: String
  },
  codesArray: []
});

module.exports = mongoose.model("Book", Book);
