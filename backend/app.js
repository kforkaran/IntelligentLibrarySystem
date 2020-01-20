const express = require("express");
const mongoose = require("mongoose");
const bookRoutes = require("./routes/books");
const transactionRoutes = require("./routes/transactions");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/admin", bookRoutes);
// app.use("/api/admin", transactionRoutes);

mongoose
  .connect(
    "mongodb+srv://demo:demo@cluster0-7m0ym.mongodb.net/LibraryDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(res => {
    const server = app.listen(8000);
    console.log("connected!");
  })
  .catch(err => {
    console.log(err);
  });
