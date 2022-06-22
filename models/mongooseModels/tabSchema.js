const mongoose = require("mongoose");

const tabSchema = new mongoose.Schema({
  tabName: {
    type: String,
    required: true,
  },
  tabURL: {
    type: String,
    required: true,
  },
  isArchived: {
    type: Boolean,
    default: false,
  },
});

const Tab = mongoose.model("tab", tabSchema);

module.exports = { Tab };
