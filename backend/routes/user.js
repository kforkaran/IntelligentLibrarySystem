const express = require("express");
const router = express.Router();
const Book = require("../models/book");

router.post("/search", async (req, res) => {
  const ids = req.body.ids;
  const result = [];
  const books = await Book.find({});
  books.forEach(book => {
    if (ids.includes(book.id)) {
      result.push(book);
    }
  });
  res.json({
    success: true,
    ids: result
  });
});

module.exports = router;
