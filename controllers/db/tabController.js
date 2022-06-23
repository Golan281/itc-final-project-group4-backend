const Dao = require("../db/db");
const dao = new Dao();
const { UserSchema } = require("../../models/mongooseModels/userSchema");
const { Tab } = require("../../models/mongooseModels/tabSchema");
const { WorkSpace } = require("../../models/mongooseModels/workspaceSchema");

const createTab = async (req, res) => {
  const tab = req.body.newTab;
  const newTab = await Tab.create({ ...tab });
  console.log(newTab);
  const user = await UserSchema.findOne({
    _id: req.body.userID,
  });
  const userID = user._id;
  const workSpaceName = req.body.workSpaceName;
  console.log(user);
  const workSpaceArr = user?.userWorkSpaces;
  dupes = workSpaceArr.find((space) => space === workSpaceName);

  if (workSpaceArr.length < 5) {
    console.log("checking for dupes");
    console.log(dupes);

    if (dupes !== undefined) {
      const workspace = await WorkSpace.findOne({
        workSpaceName: workSpaceName,
      });
      workspace.currentUserTabs = [
        ...new Set([...workspace.currentUserTabs, newTab]),
      ];
      await workspace.save();

      res.json({ workspace });
      return;
    }

    const addedWorkspace = await WorkSpace.create({
      userID,
      workSpaceName,
    });

    user.userWorkSpaces = [
      ...user.userWorkSpaces,
      addedWorkspace.workSpaceName,
    ];
    await user.save();
  }

  const workspace = await WorkSpace.findOne({
    workSpaceName: workSpaceName,
  });

  if (!workspace) {
    throw new Error("NO WORKSPACE FOUND");
  }

  workspace.currentUserTabs = [
    ...new Set([...workspace.currentUserTabs, newTab]),
  ];
  await workspace.save();

  res.json({ workspace });
};

const UpdateTab = async (req, res) => {
  const newTab = await Tab.findByIdAndUpdate(req.params.tabId, {
    tabName: req.body.tabName,
    tabURL: req.body.tabURL,
    isArchived: req.body.isArchived,
  });
  res.send(`tab updated: ${newTab}`);
};

const deleteTab = async (req, res) => {
  const user = await UserSchema.findOne({
    _id: req.body.userID,
  });
  // console.log("THIS FAR SO GOOD", user);
  const userID = user._id;
  const tabID = req.body.tabId;
  // console.log(req.params);
  const workSpaceName = req.body.workSpaceName;
  const workspace = await WorkSpace.findOne({
    workSpaceName: workSpaceName,
  });
  // console.log(workspace);
  const ids = workspace.currentUserTabs.map((tab) => tab._id.toString());

  const cleanWorkspace = workspace.currentUserTabs.filter(
    (tab) => tab._id.toString() !== tabID
  );
  const badTab = workspace.currentUserTabs.find(
    (tab) => tab._id.toString() !== tabID
  );
  console.log(cleanWorkspace);

  workspace.currentUserTabs = cleanWorkspace;

  await workspace.save();
  await user.save();
  await Tab.findByIdAndDelete({ _id: badTab._id });
  // console.log(newTabs);
  // console.log(newTab);

  res.json({ workspace });
};

module.exports = {
  createTab,
  UpdateTab,
  deleteTab,
};
