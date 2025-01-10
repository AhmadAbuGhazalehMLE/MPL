const express = require("express");
const bp = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
// Routers
const loginRouter = require("./routes/auth");
const groupRouter = require("./routes/group");
const labRouter = require("./routes/lab");
const errorRouter = require("./routes/error");
// Create Session
const expressSession = require("express-session");
const MongoDBSession = require("connect-mongodb-session")(expressSession);
const mdbsession = MongoDBSession({
  uri: "mongodb://localhost:27017/lab",
  collection: "sessions",
});

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(
  expressSession({
    secret: "ahmad",
    resave: false,
    saveUninitialized: false,
    store: mdbsession,
  })
);
app.use(bp.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "puplic")));

// add routes here
app.use(loginRouter);
app.use(groupRouter);
app.use(labRouter);
app.use(errorRouter);
mongoose
  .connect("mongodb://localhost:27017/lab")
  .then((result) => console.log("Connected"));

app.listen(8080);
