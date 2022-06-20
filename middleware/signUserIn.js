
const tokenGenerator = require('../services/tokenGenerator');
const bcrypt = require('bcrypt');
const saltRounds = parseInt(process.env.SALT);

const signUserIn = async (user) => {
    try {
        let fullToken = await tokenGenerator(user._id);
        console.log('fullToken from generator>', fullToken);
        const hashedRefreshToken = bcrypt.hashSync(fullToken.refresh_token, saltRounds);
        console.log('hashed token from generator>', hashedRefreshToken);
        
        //maybe it's better to save the token here using the mongo service
        //on register it wont find a user though, so need to handle this exception
                // const finalUserObj = await userController.updateUserRefreshToken(user.email,signedInUserObj.hashedRefreshToken);
        return {
            user,
            fullToken,
            hashedRefreshToken 
        };
    } catch (err) {
        throw new Error(err);
    }
}

module.exports = signUserIn;
