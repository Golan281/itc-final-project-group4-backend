const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

const generateToken = async (userId) => {
    const data = {
        userId
    }

    const oneSecond = Math.floor(Date.now() / 1000);
    const expireIn30m = oneSecond + (60 * 30);
    const expireIn1y = oneSecond + (60 * 60 * 24 * 365);
    const access_token = jwt.sign({ data, exp: expireIn30m }, jwtSecret);
    const refresh_token = jwt.sign({ data: { refresh: true }, exp: expireIn1y }, jwtSecret);
    // const generatedOn = Date.now();

    return {
        access_token,
        refresh_token,
        userId,
        // generatedOn,
    }
}

module.exports = generateToken;