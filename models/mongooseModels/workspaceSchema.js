// {workSpaceName:'',desc:'',currentTabs: [{max 10}], archivedTabs: [{}],workSpaceId:'', userID:''}
//& built in _id & timestamps by mongoose

const mongoose = require("mongoose");

const workspaceSchema = new mongoose.Schema(
  {
    workspaceName: {
      type: String,
      required: true,
    },
    workSpaceID: {
      type: String,
      required: true,
    },
    isArchived: {
      type: Boolean,
      default: "false",
    },
    currentTabs: {
      type: Array,
      default: [], //prob just store _id
    },
  },
  { timestamps: true }
);

const Workspace = mongoose.model("workspace", workspaceSchema);

module.exports = { Workspace };
