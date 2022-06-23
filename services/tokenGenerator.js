const jwt = require('jsonwebtoken');
const accSecret = process.env.JWT_ACC_SECRET;
const refreshSecret = process.env.JWT_REFRESH_SECRET;

const generateToken = async (userId) => {
    const data = {
        userId 
    }

    const oneSecond = Math.floor(Date.now() / 1000);
    const expireIn30m = oneSecond + (60 * 1);
    const expireInOneDay = oneSecond + (60 * 60 * 24);
    const access_token = jwt.sign({ data, exp: expireIn30m }, accSecret);
    const refresh_token = jwt.sign({ data: { refresh: true }, exp: expireInOneDay }, refreshSecret);

    return {
        access_token,
        refresh_token,
        userId,
    }
}

module.exports = generateToken;