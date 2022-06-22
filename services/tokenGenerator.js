const jwt = require('jsonwebtoken');
const SecretRandomizer = require('crypto');
const refreshSecret = process.env.JWT_REFRESH_SECRET;



const generateToken = async (userId) => {
    const accSecret = SecretRandomizer.randomBytes(32).toString('hex');
    const data = {
        userId //will be undefined for the first time printed, because inexsistant on mongo
    }

    const oneSecond = Math.floor(Date.now() / 1000);
    const expireIn30m = oneSecond + (60 * 30);
    const expireInOneDay = oneSecond + (60 * 60 * 24);
    const access_token = jwt.sign({ data, exp: expireIn30m }, accSecret);
    const refresh_token = jwt.sign({ data: { refresh: true }, exp: expireInOneDay }, refreshSecret);
    // const generatedOn = Date.now();

    return {
        access_token,
        refresh_token,
        userId,
        accSecret,
        // generatedOn,
    }
}

module.exports = generateToken;