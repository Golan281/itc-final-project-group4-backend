const Dao = require("../db/db");
const dao = new Dao();

const createWorkspace = async (req, res) => {
  const workspace = req.body;
  const newWorkspace = await dao.createWorkspace(workspace);

  const { workspaceId } = req.params;
  const user = await dao.getUserById(req.user.userID);
  user.userWorkSpaces = [...new Set([...user.userWorkSpaces, workspaceId])];
  res.send(`workspace created id: ${newWorkspace._id}`);
};

module.exports = {
  createWorkspace,
};
