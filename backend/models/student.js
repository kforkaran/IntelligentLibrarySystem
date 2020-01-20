const mongoose = require("mongoose");

const Student = new mongoose.Schema({
  rollNo: String,
  booksIssued: [
    {
      bookId: String,
      bookUniqueId: String,
      issueDate: Date,
      dueDate: Date
    }
  ]
});

module.exports = mongoose.model("Student", Student);
