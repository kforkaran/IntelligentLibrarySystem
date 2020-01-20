// TODO add searchBook routes
const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();
const Book = require("../models/book");

router.post("/addBook", async (req, res, next) => {
  const bookId = req.body.id;
  const noOfCopies = req.body.noOfCopies;
  let startIndex = 1;
  const fetchedData = await Book.findOne({ id: bookId });
  if (fetchedData) {
    for (let i = fetchedData.noOfCopies + 1; i <= noOfCopies; i++) {
      fetchedData.codesArray.push(fetchedData.id + "_" + i);
    }
    fetchedData.noOfCopies += noOfCopies;
    await Book.findOneAndUpdate(
      { id: bookId },
      { codesArray: fetchedData.codesArray, noOfCopies: fetchedData.noOfCopies }
    );
    res.json({
      sucess: true
    });
  } else {
    fetch("https://www.googleapis.com/books/v1/volumes/" + bookId)
      .then(res => res.json())
      .then(async res => {
        const book = new Book({
          id: res.id,
          noOfCopies: noOfCopies,
          volumeInfo: {
            title: res.volumeInfo.title,
            subtitle: res.volumeInfo.subtitle,
            authors: res.volumeInfo.authors,
            publisher: res.volumeInfo.publisher,
            publishedDate: res.volumeInfo.publishedDate,
            description: res.volumeInfo.description,
            pageCount: res.volumeInfo.pageCount,
            categories: res.volumeInfo.categories,
            imageLinks: {
              smallThumbnail: res.volumeInfo.imageLinks.smallThumbnail,
              thumbnail: res.volumeInfo.imageLinks.thumbnail,
              small: res.volumeInfo.imageLinks.small,
              medium: res.volumeInfo.imageLinks.medium,
              large: res.volumeInfo.imageLinks.large,
              extraLarge: res.volumeInfo.imageLinks.extraLarge
            },
            language: res.volumeInfo.language
          },
          codesArray: []
        });
        for (let i = 1; i <= noOfCopies; i++) {
          book.codesArray.push(book.id + "_" + i);
        }
        console.log(book);
        await book.save();
        res.json({
          sucess: true
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
});

module.exports = router;
