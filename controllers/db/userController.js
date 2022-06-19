const { UserSchema } = require("../../models/mongooseModels/userSchema");

const userController = {
    checkIfUserExists: async (userEmail) => {
        const doesUserExist = await UserSchema.find({email: userEmail});
        return doesUserExist;
    },
    createUser: async (userInstance) => {
        const user = await UserSchema.create(userInstance);
        return user;
    },

    findUserToLogin: async (email) =>{
        const user = await UserSchema.findOne({ email });
        return user;
    },

    resetPwd: async ()=>{
        // const user = await UserSchema.
    }
}

module.exports = userController;