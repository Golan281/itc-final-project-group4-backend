const express = require("express");
const workSpaceController = require("../controllers/db/workSpaceController");
const router = express.Router();
const tabController = require("../controllers/db/tabController");

// Tab CRUD
router.post("/createTab/:workSpaceId", tabController.createTab);
router.patch("/updateTab/:tabId", tabController.UpdateTab);
router.delete("/:tabId", tabController.deleteTab);

// WorkSpace CRUD
router.post("/", workSpaceController.createWorkSpace);
router.get("/:userID", workSpaceController.getAllWorkSpace);
router.patch(
  "/updateWorkSpace/:workSpaceId",
  workSpaceController.UpdateWorkSpaceName
);
router.delete("/:workSpaceId", workSpaceController.deleteWorkSpace);

module.exports = router;
