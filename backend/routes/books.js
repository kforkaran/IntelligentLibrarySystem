const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();
const Book = require("../models/book");
const IssuedBooks = require("../models/issuedBooks");

router.post("/addBook", async (req, res) => {
  const bookId = req.body.id;
  const noOfCopies = req.body.noOfCopies;
  const fetchedData = await Book.findOne({ id: bookId });
  if (fetchedData) {
    for (let i = fetchedData.noOfCopies + 1; i <= noOfCopies; i++) {
      fetchedData.codesArray.push(fetchedData.id + "_" + i);
    }
    fetchedData.noOfCopies += noOfCopies;
    fetchedData.stock += noOfCopies;
    await Book.findOneAndUpdate(
      { id: bookId },
      {
        codesArray: fetchedData.codesArray,
        noOfCopies: fetchedData.noOfCopies,
        stock: fetchedData.stock
      }
    );
    res.json({
      success: true
    });
  } else {
    fetch("https://www.googleapis.com/books/v1/volumes/" + bookId)
      .then(res => res.json())
      .then(async result => {
        const book = new Book({
          id: result.id,
          noOfCopies: noOfCopies,
          stock: noOfCopies,
          volumeInfo: {
            title: result.volumeInfo.title,
            subtitle: result.volumeInfo.subtitle,
            authors: result.volumeInfo.authors,
            publisher: result.volumeInfo.publisher,
            publishedDate: result.volumeInfo.publishedDate,
            description: result.volumeInfo.description,
            pageCount: result.volumeInfo.pageCount,
            categories: result.volumeInfo.categories,
            imageLinks: {
              smallThumbnail: result.volumeInfo.imageLinks.smallThumbnail,
              thumbnail: result.volumeInfo.imageLinks.thumbnail,
              small: result.volumeInfo.imageLinks.small,
              medium: result.volumeInfo.imageLinks.medium,
              large: result.volumeInfo.imageLinks.large,
              extraLarge: result.volumeInfo.imageLinks.extraLarge
            },
            language: result.volumeInfo.language
          },
          codesArray: []
        });
        for (let i = 1; i <= noOfCopies; i++) {
          book.codesArray.push(book.id + "_" + i);
        }
        console.log(book);
        await book.save();
        res.json({
          success: true
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
});

router.get("/search", async (req, res) => {
  console.log(req.query.id);
  const book = await Book.findOne({ id: req.query.id });
  if (book) {
    if (book.stock == 0) {
      const result = await IssuedBooks.find({ id: req.query.id });
      result[0].books.sort((book1, book2) => book1.dueDate - book2.dueDate);
      res.json({
        success: true,
        available: false,
        nextDate: result[0].books[0].dueDate
      });
    } else {
      res.json({
        success: true,
        available: true
      });
    }
  } else {
    res.json({
      success: false
    });
  }
});

module.exports = router;
