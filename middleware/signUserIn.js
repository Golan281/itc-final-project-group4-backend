
const tokenGenerator = require('../services/tokenGenerator');
const bcrypt = require('bcrypt');
const saltRounds = parseInt(process.env.SALT);

const signUserIn = async (user) => {
    try {
        let fullToken = await tokenGenerator(user._id);
        console.log('fullToken from generator>', fullToken);
        const hashedRefreshToken = bcrypt.hashSync(fullToken.refresh_token, saltRounds);
        console.log('hashed token from generator>', hashedRefreshToken);
        

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
