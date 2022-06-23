const { WorkSpace } = require("../../models/mongooseModels/workspaceSchema");
const { UserSchema } = require("../../models/mongooseModels/userSchema");
// const createWorkSpace = async (workspace) => {
//   const newWorkspace = await WorkSpace.create({ ...workspace });
//   return newWorkspace;
// };

const groupTabsToSimilarWorkSpace = async (req, res) => {
  //check all other workspaces by the user and look for a similar thing
  //if that's the case - move them to the
};

const createWorkSpace = async (req, res) => {
  try {
    const workspace = req.body;
    const newWorkspace = await WorkSpace.create({ ...workspace });
    const user = await UserSchema.findById(req.body.userID);
    console.log(user);
    user.userWorkSpaces = [
      ...new Set([...user.userWorkSpaces, newWorkspace._id]),
    ];
    await user.save();

    res.status(201).json({ newWorkspace });
  } catch (error) {
    next(error);
  }
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
  console.log("GOT TO THIS PLACE");
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

const archiveUserTabs = async (currTabs) => {
  let tabsForArchive;
  for (let i = 9; i < currTabs.length; i++) {
    tabsForArchive.push(currTabs[i]);
  }
};

module.exports = {
  createWorkSpace,
  UpdateWorkSpaceName,
  deleteWorkSpace,
  isCurrentTabLengthEqual10,
  archiveUserTabs,
  getAllWorkSpaces,
};
