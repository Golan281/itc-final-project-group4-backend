
const tokenGenerator = require('../services/tokenGenerator');
const bcrypt = require('bcrypt');
const saltRounds = parseInt(process.env.SALT);
const userController = require('../controllers/db/userController');

const signUserIn = async (user) => {
    try {
        let fullToken = await tokenGenerator(user._id);
        console.log('fullToken from generator>', fullToken);
        const hashedRefreshToken = bcrypt.hashSync(fullToken.refresh_token, saltRounds);
        console.log('hashed token from generator>', hashedRefreshToken);
        
        //maybe it's better to save the token here using the mongo service
        //on register it wont find a user ID though, so need to handle this exception

        return {
            user, //maybe I need to return a differen user obj?
            fullToken,
            hashedRefreshToken 
        };
    } catch (err) {
        throw new Error(err);
    }
}

module.exports = signUserIn;
