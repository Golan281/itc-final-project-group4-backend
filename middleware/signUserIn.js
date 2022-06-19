
const tokenGenerator = require('../services/tokenGenerator');

const signUserIn = async (user) => {
    try {
        let fullToken = await tokenGenerator(user._id);
        console.log('fullToken from generator>', fullToken);

        return {
            user,
            fullToken 
        };
    } catch (err) {
        throw new Error(err);
    }
}

module.exports = signUserIn;
