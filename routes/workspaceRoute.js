const express = require("express");
const workspaceController = require("../controllers/db/workSpaceController");
const workspaceRouter = express.Router();

// tabRouter.get("/", tabController.getTab);

workspaceRouter.post("/", workspaceController.createWorkspace);

// tabRouter.patch("/:tabId", tabController.updateTabCol);

// tabRouter.delete("/:tabId", tabController.deleteTab);

module.exports = workspaceRouter;
