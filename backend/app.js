const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const keys = require("./config/keys");
const authRoutes = require("./routes/auth");
const bookRoutes = require("./routes/books");

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

app.use("/api/admin", authRoutes);
app.use("/api/admin", bookRoutes);

mongoose
  .connect(
    keys.mongoURI,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(res => {
    const server = app.listen(8000);
    console.log("connected!");
  })
  .catch(err => {
    console.log(err);
  });
