const express = require("express");
const DB = require("../controllers/db/db");
const TabController = require("../controllers/db/tabController");
const tab = express.Router();

tab.get("/", TabController.getTab);

tab.post("/", TabController.createTab);

tab.patch("/:TabId", TabController.updateTabCol);

tab.delete("/:TabId", TabController.deleteTab);

module.exports = tab;
