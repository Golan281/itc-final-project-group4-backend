const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const dbConnection = require("./controllers/db/mConnection");

const workspaceRouter = require("./routes/workspaceRoute");
const authRouter = require("./routes/authRoute");

app.use(
  cors({
    origin: `${process.env.CORS_ORIGIN}`,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dbConnection();

app.use("/v1/auth", authRouter);
app.use("/v1/workspace", workspaceRouter);

app.get("/", (req, res, next) => {
  res.send("hello world");
});

//err handler
app.use((err, req, res, next) => {
  console.log("app err handler says:", err);
  res.status(400).send({
    error: true,
    message: err,
    //can use - err || err.message (if throwing errors)
  });
});

module.exports = app;
