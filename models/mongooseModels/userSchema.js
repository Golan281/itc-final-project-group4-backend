const mongoose = require("mongoose");

//test this limit method or find other method to limit (built in?)
const arrLimit = (arr) => arr.length <= 5;

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    userWorkSpaces: {
      type: Array,
      default: [],
      validate: [arrLimit, "{PATH} exceeds the limit of 5"],
    },
  },
  { timestamps: true }
);

const UserSchema = mongoose.model("user", userSchema);

module.exports = { UserSchema };
