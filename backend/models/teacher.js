const mongoose = require("mongoose");

const Teacher = new mongoose.Schema({
  id: String,
  booksIssued: [
    {
      bookId: String,
      bookUniqueId: String,
      issueDate: Date,
      dueDate: Date
    }
  ]
});

module.exports = mongoose.model("Teacher", Teacher);
