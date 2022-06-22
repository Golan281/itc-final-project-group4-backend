const Dao = require("../db/db");
const dao = new Dao();

const { Tab } = require("../../models/mongooseModels/tabSchema");
const { WorkSpace } = require("../../models/mongooseModels/workspaceSchema");

const createTab = async (req, res) => {
  const tab = req.body;
  const newTab = await Tab.create({ ...tab });

  const workspace = await WorkSpace.findById(req.params.workSpaceId);
  console.log(workspace);
  workspace.currentUserTabs = [
    ...new Set([...workspace.currentUserTabs, newTab._id]),
  ];
  await workspace.save();

  res.send(`tab created: ${newTab}`);
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
  const newTab = await Tab.findByIdAndDelete(req.params.tabId);
  console.log(newTab);
  res.send(`workspace name deleted: ${newTab}`);
};

module.exports = {
  createTab,
  UpdateTab,
  deleteTab,
};
