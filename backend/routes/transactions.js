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

router.post("/return", async (req, res) => {
  const issuedBook = await IssuedBooks.find({ id: req.body.id });
  const book = await Book.find({ id: req.body.id });

  book.stock++;
  book.codesArray.push(req.body.uniqueId);

  let issues = [];
  let borrowerId, borrowerType;
  for (let i = 0; i < issuedBook.books.length; i++) {
    if (issuedBook.books[i].uniqueId !== req.body.uniqueId) {
      issues.push(issuedBook.books[i]);
    } else {
      borrowerId = issuedBook.books[i].borrowerId;
      borrowerType = issuedBook.books[i].borrowerType;
    }
  }

  await IssuedBooks.findOneAndUpdate({ id: req.body.id }, { books: issues });
  await Book.findOneAndUpdate(
    { id: req.body.id },
    { stock: book.stock, codesArray: book.codesArray }
  );

  if (borrowerType === "student") {
    const student = await Student.find({ rollNo: borrowerId });
    let issues = [];
    for (let i = 0; i < student.booksIssued.length; i++) {
      if (student.booksIssued[i].bookUniqueId !== req.body.uniqueId) {
        issues.push(student.booksIssued[i]);
      }
    }
    await Student.findOneAndUpdate(
      { rollNo: borrowerId },
      { booksIssued: issues }
    );
  } else if (borrowerType === "teacher") {
    const teacher = await Teacher.find({ rollNo: borrowerId });
    let issues = [];
    for (let i = 0; i < teacher.booksIssued.length; i++) {
      if (teacher.booksIssued[i].bookUniqueId !== req.body.uniqueId) {
        issues.push(teacher.booksIssued[i]);
      }
    }
    await Teacher.findOneAndUpdate(
      { rollNo: borrowerId },
      { booksIssued: issues }
    );
  }
  res.json({
    success: true
  });
});

module.exports = router;
