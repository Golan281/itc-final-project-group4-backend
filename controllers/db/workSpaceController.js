const { WorkSpace } = require("../../models/mongooseModels/workspaceSchema");

const createWorkSpace = async (workspace) => {
  const newWorkspace = await WorkSpace.create({ ...workspace });
  return newWorkspace;
};

const addNewTab = async (req) => {
  const newtab = await WorkSpace.findByIdAndUpdate(req._id, {
    $push: { currentUserTabs: req.params.tabID },
  });
  return newtab;
};

const isCurrentTabLengthEqual10 = async (req) => {
  const currTabs = await WorkSpace.findById(req._id)
    .select("currentUserTabs")
    .sort("date:-1");
  if (currTabs.length >= 10) {
    return {
      isCurrentTabLengthEqual10: true,
      currTabs,
    };
  } else {
    return false;
  }
};

const archiveUserTabs = async (currTabs) => {
  let tabsForArchive;
  for (let i = 9; i < currTabs.length; i++) {
    tabsForArchive.push(currTabs[i]);
  }
};

// const updatedUser = await mongooseUserSchema.findByIdAndUpdate(
//   req.userId,
//   { $push: { savedPets: req.params.petId } },
//   { new: true, safe: true, upsert: true }
// );

// const getTab = async (req, res) => {
//   const dao = new Dao();
//   if (Object.keys(req.query).length) {
//     const queriedTabs = await dao.findTabByQuery(req.query);
//     res.send(queriedTabs);
//   } else {
//     res.send(await dao.getAllTabs());
//   }
// };

// const updateTabCol = async (req, res) => {
//   const { tabId } = req.params;
//   const tab = await dao.getTabByID(tabId);
//   const data = req.body;
//   pet[data.key] = data.value;
//   await tab.save();

//   res.send("tab Col Updated");
// };

// const deleteTab = (req, res) => {
//   const { tabId } = req.params;
//   pets.delete(tabId);
//   res.send("tab Deleted");
// };

module.exports = {
  createWorkSpace,
  addNewTab,
  isCurrentTabLengthEqual10,
  archiveUserTabs,
};
