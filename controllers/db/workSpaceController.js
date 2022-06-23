const { WorkSpace } = require("../../models/mongooseModels/workspaceSchema");
const { UserSchema } = require("../../models/mongooseModels/userSchema");
const { Tab } = require("../../models/mongooseModels/tabSchema");
// const createWorkSpace = async (workspace) => {
//   const newWorkspace = await WorkSpace.create({ ...workspace });
//   return newWorkspace;
// };

const createWorkSpace = async (req, res) => {
  const workspace = req.body;
  const newWorkspace = await WorkSpace.create({ ...workspace });
  const user = await UserSchema.findById(req.body.userID);
  console.log(user);
  user.userWorkSpaces = [
    ...new Set([...user.userWorkSpaces, newWorkspace._id]),
  ];
  await user.save();

  res.send(`workspace created: ${newWorkspace}`);
};

const UpdateWorkSpaceName = async (req, res) => {
  const newWorkspace = await WorkSpace.findByIdAndUpdate(
    req.params.workSpaceId,
    { workSpaceName: req.body.workSpaceName },
    { new: true }
  );

  res.send(`workspace name updated: ${newWorkspace}`);
};

const getAllWorkSpaces = async (req, res, next) => {
  console.log(req.params);
  try {
    const userWorkSpaces = await WorkSpace.find({
      userID: req.params.userID,
    });
    console.log(userWorkSpaces);
    res.status(200).json(userWorkSpaces);
  } catch (err) {
    next(err);
  }
};

const deleteWorkSpace = async (req, res) => {
  const newWorkspace = await WorkSpace.findByIdAndDelete(
    req.params.workSpaceId
  );
  console.log(newWorkspace);
  res.send(`workspace name deleted: ${newWorkspace}`);
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

const archiveUserTabs = async (req, res) => {
  console.log("THIS IS ARCHIVE");
  const tabID = req.body.tabId;
  const workSpaceName = req.body.workSpaceName;
  // const user = await UserSchema.findOne({
  //   _id: req.body.userID,
  // });

  const workspace = await WorkSpace.findOne({
    workSpaceName: workSpaceName,
  });

  const cleanWorkspace = workspace.currentUserTabs.find(
    (tab) => tab._id.toString() !== tabID
  );

  const newArchivedTab = await Tab.findOneAndUpdate(req.body.tabId, {
    isArchived: true,
  });
  cleanWorkspace = {
    ...cleanWorkspace,
    isArchived: true,
  };
  await workspace.save();

  console.log(cleanWorkspace.isArchived);

  console.log(newArchivedTab);
  res.json({ workspace });
};

module.exports = {
  createWorkSpace,
  UpdateWorkSpaceName,
  deleteWorkSpace,
  isCurrentTabLengthEqual10,
  archiveUserTabs,
  getAllWorkSpaces,
};
