const express = require("express");
const DB = require("../controllers/db/db");
const tabController = require("../controllers/db/tabController");
const tabRouter = express.Router();

tabRouter.get("/", tabController.getTab);

tabRouter.post("/", tabController.createTab);

tabRouter.patch("/:tabId", tabController.updateTabCol);

tabRouter.delete("/:tabId", tabController.deleteTab);

module.exports = tabRouter;
