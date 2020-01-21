const express = require("express");
const router = express.Router();
const Book = require("../models/book");
const Student = require("../models/student");
const Teacher = require("../models/teacher");
const IssuedBooks = require("../models/issuedBooks");

// required data: id, issuedDate, dueDate, borrowerType, borrowerId
router.post("/issue", async (req, res) => {
  const result = await IssuedBooks.find({ id: req.body.id });
  const book = await Book.find({ id: req.body.id });
  const uniqueId = book[0].codesArray.pop();

  book[0].stock--;
  if (result && result.length !== 0) {
    result[0].books.push({
      uniqueId: uniqueId,
      issuedDate: req.body.issuedDate,
      dueDate: req.body.dueDate,
      borrowerType: req.body.borrowerType.toLowerCase(),
      borrowerId: req.body.borrowerId
    });
    await IssuedBooks.findOneAndUpdate(
      { id: req.body.id },
      { books: result[0].books }
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
    await issueBook.save().catch(err => console.log(error));
  }
  if (req.body.borrowerType === "student") {
    const student = new Student({
      rollNo: req.body.borrowerId,
      booksIssued: []
    });
    student.booksIssued.push({
      bookId: req.body.id,
      bookUniqueId: uniqueId,
      issueDate: req.body.issuedDate,
      dueDate: req.body.dueDate
    });
    const st = await Student.findOne({ rollNo: req.body.borrowerId });
    if (st) {
      st.booksIssued.push({
        bookId: req.body.id,
        bookUniqueId: uniqueId,
        issueDate: req.body.issuedDate,
        dueDate: req.body.dueDate
      });
      await Student.findOneAndUpdate(
        { rollNo: req.body.borrowerId },
        { booksIssued: st.booksIssued }
      );
    } else {
      await student.save().then(resp => {
        console.log(resp);
      });
    }
  } else if (req.body.borrowerType === "teacher") {
    const teacher = new Teacher({
      rollNo: req.body.borrowerId,
      booksIssued: []
    });
    teacher.booksIssued.push({
      bookId: req.body.id,
      bookUniqueId: uniqueId,
      issueDate: req.body.issuedDate,
      dueDate: req.body.dueDate
    });
    const t = await Teacher.findOne({ rollNo: req.body.bookId });
    if (t) {
      t.booksIssued.push({
        bookId: req.body.id,
        bookUniqueId: uniqueId,
        issueDate: req.body.issuedDate,
        dueDate: req.body.dueDate
      });
      await Teacher.findOneAndUpdate(
        { rollNo: req.body.borrowerId },
        { booksIssued: t.booksIssued }
      );
    } else {
      await teacher.save().catch(err => console.log(err));
    }
  }
  await Book.findOneAndUpdate(
    { id: req.body.id },
    { stock: book[0].stock, codesArray: book[0].codesArray }
  );
  res.json({
    success: true
  });
});

// required data: id, uniqueId
router.post("/return", async (req, res) => {
  const issuedBook = await IssuedBooks.find({ id: req.body.id });
  const book = await Book.find({ id: req.body.id });
  book[0].stock++;
  book[0].codesArray.push(req.body.uniqueId);

  let issues = [];
  let borrowerId, borrowerType;
  for (let i = 0; i < issuedBook[0].books.length; i++) {
    if (issuedBook[0].books[i].uniqueId !== req.body.uniqueId) {
      issues.push(issuedBook[0].books[i]);
    } else {
      borrowerId = issuedBook[0].books[i].borrowerId;
      borrowerType = issuedBook[0].books[i].borrowerType;
    }
  }
  if (issues.length === 0) {
    await IssuedBooks.findOneAndDelete({ id: req.body.id });
  } else {
    await IssuedBooks.findOneAndUpdate({ id: req.body.id }, { books: issues });
  }
  await Book.findOneAndUpdate(
    { id: req.body.id },
    { stock: book[0].stock, codesArray: book[0].codesArray }
  );

  if (borrowerType === "student") {
    const student = await Student.find({ rollNo: borrowerId });
    let issues = [];
    for (let i = 0; i < student[0].booksIssued.length; i++) {
      if (student[0].booksIssued[i].bookUniqueId !== req.body.uniqueId) {
        issues.push(student[0].booksIssued[i]);
      }
    }
    await Student.findOneAndUpdate(
      { rollNo: borrowerId },
      { booksIssued: issues }
    );
  } else if (borrowerType === "teacher") {
    const teacher = await Teacher.find({ rollNo: borrowerId });
    let issues = [];
    for (let i = 0; i < teacher[0].booksIssued.length; i++) {
      if (teacher[0].booksIssued[i].bookUniqueId !== req.body.uniqueId) {
        issues.push(teacher[0].booksIssued[i]);
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
