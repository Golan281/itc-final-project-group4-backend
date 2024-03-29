const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const dbConnection = require("./controllers/db/mConnection");

const workspaceRouter = require("./routes/workspaceRoute");
const authRouter = require("./routes/authRoute");


const corsOptions = require("./config/corsOptions");
const credentials = require("./Config/credentials");
app.use(credentials);
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dbConnection();

app.use("/v1/auth", authRouter);
app.use("/v1/workspace", workspaceRouter);


//err handler
app.use((err, req, res, next) => {
  console.log("app err handler says:", err);
  res.status(err.status || 400).send({
    error: true,
    message: err,
    //can use - err || err.message (if throwing errors)
  });
});

module.exports = app;
