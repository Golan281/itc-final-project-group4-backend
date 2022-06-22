const { UserSchema } = require("../../models/mongooseModels/userSchema");

const userController = {
    checkIfUserExists: async (userEmail) => {
        const doesUserExist = await UserSchema.find({email: userEmail});
        return doesUserExist;
    },
    createUser: async (userInstance) => {
      console.log('user instance on create user', userInstance)
        const user = await UserSchema.create(userInstance);
        return user;
    },

    findUserToLogin: async (email) =>{
        const user = await UserSchema.findOne({ email });
        return user;
    },
    updateUserRefreshTokenAndAccessSecret: async (email,token,secret)=> {
        console.log('input inside ref token metohd @ user service',email,token)
        const user = await UserSchema.findOneAndUpdate({email: email}, {refreshToken: token, accessSecret: secret}, { new: true});
        console.log('user inside refresh token method @ user service',user)
        return user;
    },
    resetPwd: async ()=>{
        // const user = await UserSchema.
    }
}

module.exports = userController;