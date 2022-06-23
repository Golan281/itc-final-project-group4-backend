const { UserSchema } = require("../../models/mongooseModels/userSchema");

const userController = {
  checkIfUserExists: async (userEmail) => {
    const doesUserExist = await UserSchema.find({ email: userEmail });
    return doesUserExist;
  },
  createUser: async (userInstance) => {
    const user = await UserSchema.create(userInstance);
    return user;
  },

  findUserToLogin: async (email) => {
    const user = await UserSchema.findOne({ email });
    return user;
  },
  updateUserRefreshToken: async (email, token) => {
    const user = await UserSchema.findOneAndUpdate(
      { email: email },
      { refreshToken: token },
      { new: true }
    );
    return user;
  },

  updateWorkSpaces: async (id, reqBody) => {
    const workSpace = await UserSchema.findByIdAndUpdate(
      id,
      { ...reqBody },
      { new: true }
    );
    return workSpace;
  },
};

module.exports = userController;
