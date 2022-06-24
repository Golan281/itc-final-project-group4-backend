//check req.headers.authorization? + split bearer & token
const jwt = require('jsonwebtoken');
require('dotenv').config(); 
const jwtAccessSecret = process.env.JWT_ACC_SECRET;


const authorizeUser =  (req,res,next)  => {
    const reqAuthToken  = req.headers.authorization ? req.headers.authorization.split(' ')[1] : next('err - invalid token');

    console.log('req.headers.token>', req.headers.authorization) //err when this is commented off for some reason
    jwt.verify(reqAuthToken, jwtAccessSecret, (err, decoded) => {
        if (err) {
            let authErrObj = {};
            console.log('authUser err>',err);
            (err.name === "TokenExpiredError") ? authErrObj = {message:err.message, status: 403} : authErrObj = {status: 400, message:'Invalid access token. Please login to continue'}; 
            return next(authErrObj)
        }
        req.userId = decoded.data.userId;
        console.log('does decoded userId exist?>',decoded.data.userId)
        console.log('does req userId exist?>',req.userId)
        next();
    })

}


module.exports = authorizeUser;