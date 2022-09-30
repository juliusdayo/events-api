const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

const PORT = process.env.PORT || 3005;
const MONGODB_URI =
  process.env.MONGODB_URI ||
  `mongodb+srv://eventsadmin:S4rmcnqQJX4LSTia@cluster0.44qxvzl.mongodb.net/events?retryWrites=true&w=majority`;

const indexRouter = require("./routes/index");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/events", require("./routes/events"));

app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, (err) => {
      if (err) throw err;
      console.log(`Server running on port ${PORT}`);
    });
  });

module.exports = app;
