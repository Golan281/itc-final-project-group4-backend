const mongoose = require("mongoose");

// const arrLimit = (arr) => arr.length <= 10;

const workSpaceSchema = new mongoose.Schema(
  {
    workSpaceName: {
      type: String,
      required: true,
    },
    userID: {
      type: String,
      required: true,
    },
    currentUserTabs: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const WorkSpace = mongoose.model("workspace", workSpaceSchema);

module.exports = { WorkSpace };
