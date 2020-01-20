const mongoose = require("mongoose");

const IssuedBook = new mongoose.Schema({
  id: String,
  books: [
    {
      uniqueId: String,
      issuedDate: Date,
      dueDate: Date,
      borrowerType: String,
      borrowerId: String
    }
  ]
});

module.exports = mongoose.model("IssuedBook", IssuedBook);
