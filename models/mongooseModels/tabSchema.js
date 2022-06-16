// {tabName:'',desc:'',tabUrl:'',workSpaceId:'', workSpaceName:'', isArchived: bool default false, userId:''}
//& built in _id & timestamps by mongoose

const mongoose = require("mongoose");

const tabSchema = new mongoose.Schema({
  tabName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },

  tabURL: {
    type: String,
    required: true,
  },
  workSpaceID: {
    type: String,
    required: true,
  },
  workSpaceName: {
    type: String,
  },
  isArchived: {
    type: Boolean,
    default: "false",
  },
  userID: {
    type: String,
  },
});

const Tab = mongoose.model("tabs", tabSchema);

module.exports = { Tab };
