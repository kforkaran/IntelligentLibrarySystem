const { dialogflow, List } = require('actions-on-google');

const Student = require('../models/student');
const Book = require('../models/book');

const app = dialogflow();

app.intent("Get Personal Details", (conv, { roll }) => {
  return Student.findOne({ rollNo: roll })
    .then(async student => {
      const promises = [];

      if(!student)
        return conv.ask("No record found for this roll number");

      student.booksIssued.forEach(book =>
        promises.push(Book.findOne({ id: book.bookId })));

      const books = await Promise.all(promises);

      // console.log(books);
      // const items = {
      //   '0': {
      //     title: 'Lol0',
      //     description: 'Issued On: Tue Jan 21 2020 05:30:00 GMT+0530 (India Standard Time)<br>Due On: Wed Jan 22 2020 05:30:00 GMT+0530 (India Standard Time)'
      //   },
      //   '1': {
      //     title: 'Lol1',
      //     description: 'Issued On: Tue Jan 21 2020 05:30:00 GMT+0530 (India Standard Time)<br>Due On: Wed Jan 22 2020 05:30:00 GMT+0530 (India Standard Time)'
      //   },
      //   '2': {
      //     title: 'Lol2',
      //     description: 'Issued On: Tue Jan 21 2020 05:30:00 GMT+0530 (India Standard Time)<br>Due On: Wed Jan 22 2020 05:30:00 GMT+0530 (India Standard Time)'
      //   },
      //   '3': {
      //     title: 'Lol3',
      //     description: 'Issued On: Tue Jan 21 2020 05:30:00 GMT+0530 (India Standard Time)<br>Due On: Wed Jan 22 2020 05:30:00 GMT+0530 (India Standard Time)'
      //   }
      // };
      const items = {};

      books.forEach((book, i) => {
        const studentBookDetails = student.booksIssued.find(b => b.bookId == book.id);
        items[i] = {
          title: book.volumeInfo.title,
          description: "Issued On: " + studentBookDetails.issueDate.toDateString()
            + "  \nDue On: " + studentBookDetails.dueDate.toDateString()
        }
      });
      console.log(items);
      conv.ask("Here are the list of books issued by you...");
      conv.ask(new List({
        title: "List of Issued Books",
        items: items
      }));
    });
});

module.exports = app;