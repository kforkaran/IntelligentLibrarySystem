// TODO: add return books routes
const express = require("express");
const router = express.Router();
const Book = require("../models/book");
const Student = require("../models/student");
const Teacher = require("../models/teacher");
const IssuedBooks = require("../models/issuedBooks");

router.post("/issue", async (req, res) => {
  const result = await IssuedBooks.find({ id: req.body.id });
  const book = await Book.find({ id: req.body.id });
  const uniqueId = book.codesArray.pop();
  book.stock--;
  if (result) {
    result.books.push({
      uniqueId: uniqueId,
      issuedDate: req.body.issuedDate,
      dueDate: req.body.dueDate,
      borrowerType: req.body.borrowerType.toLowerCase(),
      borrowerId: req.body.borrowerId
    });
    await IssuedBooks.findOneAndUpdate(
      { id: req.body.id },
      { books: result.books }
    );
  } else {
    const issueBook = new IssuedBooks({
      id: req.body.id,
      books: []
    });
    issueBook.books.push({
      uniqueId: uniqueId,
      issuedDate: req.body.issuedDate,
      dueDate: req.body.dueDate,
      borrowerType: req.body.borrowerType.toLowerCase(),
      borrowerId: req.body.borrowerId
    });
    await issueBook.save();
  }
  if (req.body.borrowerType === "student") {
    const student = new Student({
      rollNo: req.body.borrowerId,
      booksIssued: []
    });
    student.booksIssued.push({
      bookId: req.body.id,
      bookUniqueId: uniqueId,
      issuedDate: req.body.issuedDate,
      dueDate: req.body.dueDate
    });
    await student.save();
  } else if (req.body.borrowerType === "teacher") {
    const teacher = new Teacher({
      rollNo: req.body.borrowerId,
      booksIssued: []
    });
    teacher.booksIssued.push({
      bookId: req.body.id,
      bookUniqueId: uniqueId,
      issuedDate: req.body.issuedDate,
      dueDate: req.body.dueDate
    });
    await teacher.save();
  }
  await Book.findByIdAndUpdate(
    { id: req.body.id },
    { stock: book.stock, codesArray: book.codesArray }
  );
  res.json({
    success: true
  });
});

module.exports = router;
