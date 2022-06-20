const Dao = require("../db/db");
const dao = new Dao();

const createTab = async (req, res) => {
  const tab = req.body;
  const newTab = await dao.createTab(tab);
  const { tabId } = req.params;
  const workspace = await dao.getWorkspaceByID(req.user.workspaceId);
  workspace.currentTabs = [...new Set([...workspace.currentTabs, tabId])];
  res.send(`tab created id: ${newTab._id}`);
};

const getTab = async (req, res) => {
  const dao = new Dao();
  if (Object.keys(req.query).length) {
    const queriedTabs = await dao.findTabByQuery(req.query);
    res.send(queriedTabs);
  } else {
    res.send(await dao.getAllTabs());
  }
};

const updateTabCol = async (req, res) => {
  const { tabId } = req.params;
  const tab = await dao.getTabByID(tabId);
  const data = req.body;
  pet[data.key] = data.value;
  await tab.save();

  res.send("tab Col Updated");
};

const deleteTab = (req, res) => {
  const { tabId } = req.params;
  pets.delete(tabId);
  res.send("tab Deleted");
};

module.exports = {
  createTab,
  getTab,
  updateTabCol,
  deleteTab,
};
