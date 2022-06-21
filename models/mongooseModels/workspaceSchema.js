const mongoose = require("mongoose");

const arrLimit = (arr) => arr.length <= 10;

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
      default: [
        {
          tabID: "",
          workSpaceId: "",
          url: "",
          description: "",
          isArchived: false,
          date: "",
        },
      ],
      validate: [arrLimit, "{PATH} exceeds the limit of 10"],
    },

    archiveUserTabs: {
      type: Array,
      default: [
        {
          tabID: "",
          workSpaceId: "",
          url: "",
          description: "",
          isArchived: true,
          date: "",
        },
      ],
    },
  },
  { timestamps: true }
);

const WorkSpace = mongoose.model("workspace", workSpaceSchema);

module.exports = { WorkSpace };
