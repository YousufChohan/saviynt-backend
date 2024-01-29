const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const PORT = 4000;
dotenv.config();
const mongoose = require("mongoose");
const upload = require("./middleware/upload");

const signupRouter = require("./routes/signup");
const loginRouter = require("./routes/login");
const categoryRouter = require("./routes/category");
const tagRouter = require("./routes/tag");
const eventRouter = require("./routes/event");
const file = require("./routes/file");
const admin = require("./routes/admin");
const subCategory = require("./routes/subCategory");

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

app.use(signupRouter);
app.use(loginRouter);
app.use(categoryRouter);
app.use(subCategory);
app.use(tagRouter);
app.use(file);
app.use(admin);
app.use(eventRouter(upload));

var server = app.listen(process.env.API_PORT, (error) => {
  if (error) {
    console.error("Error Occurred while connecting to the server: ", error);
  } else {
    -console.log("App is listening on port " + process.env.API_PORT);

    console.log("Trying to connect to the database server...");

    mongoose
      .connect(process.env.DB_CONNECTION_STRING)
      .then(() => {
        console.log("Connected to the Database Successfully!");
      })
      .catch((err) => {
        console.error("Error Occurred while connecting to database: ", err);
      });
  }
});
