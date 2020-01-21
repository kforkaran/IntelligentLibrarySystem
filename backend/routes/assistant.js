const { dialogflow, List } = require('actions-on-google');

const Student = require('../models/student');
const Book = require('../models/book');

const app = dialogflow();

app.intent("Get Personal Details", (conv, { roll }) => {
  console.log("Hello");
  return Student.findOne({ rollNo: roll })
    .then(async student => {
      const promises = [];

      student.booksIssued.forEach(book =>
        promises.push(Book.findOne({ id: book.bookId })));

      const books = await Promise.all(promises);

      const items = books.map(book => {
        const studentBookDetails = student.booksIssued.find(b => b.bookId == book.id);
        return {
          title: book.volumeInfo.title,
          description: "Issued On: " + studentBookDetails.issueDate
            + "\nDue On: " + studentBookDetails.dueDate
        }
      });

      conv.ask("Here are the list of books issued by you...");
      conv.ask(new List({
        title: "List of Issued Books",
        items: items
      }));
    });
});

module.exports = app;