const express = require("express");
const workSpaceController = require("../controllers/db/workSpaceController");
const router = express.Router();
const tabController = require("../controllers/db/tabController");

// Tab CRUD
router.post("/createTab/:workSpaceId", tabController.createTab);
router.delete("/updateTab/:tabId", tabController.UpdateTab);
router.patch("/:tabId", tabController.deleteTab);

// WorkSpace CRUD
router.post("/", workSpaceController.createWorkSpace);
router.get("/:userID", workSpaceController.getAllWorkSpaces);
router.post("/ArchiveTab", workSpaceController.archiveUserTabs);
router.delete("/:workSpaceId", workSpaceController.deleteWorkSpace);

module.exports = router;
