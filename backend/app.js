const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose
  .connect(
    "mongodb+srv://demo:demo@cluster0-7m0ym.mongodb.net/test?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(res => {
    const server = app.listen(3000);
    console.log("connected!");
  })
  .catch(err => {
    console.log(err);
  });
