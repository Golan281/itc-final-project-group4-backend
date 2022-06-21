const express = require("express");
const workSpaceController = require("../controllers/db/workSpaceController");
const router = express.Router();

router.post("/", async (req, resp, next) => {
  try {
    const newWorkspace = await workSpaceController.createWorkSpace(req.body);
    if (!newWorkspace) throw new Error("error with the workspace creation");
    resp.status(201).send(newWorkspace);
  } catch (error) {
    next(error);
  }
});

router.patch("/:workSpaceId", workSpaceController.addNewTab);

router.post(
  "/:workSpaceId",
  workSpaceController.isCurrentTabLengthEqual10,
  workSpaceController.archiveUserTabs
);

module.exports = router;
