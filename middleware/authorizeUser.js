//check req.headers.authorization? + split bearer & token
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_ACC_SECRET;


const authorizeUser =  (req,res,next)  => {
    const reqAuthToken  = req.headers.authorization ? req.headers.authorization.split(' ')[1] : next('err - invalid token');

    console.log('req.headers.token>', req.headers.authorization) //err when this is commented off for some reason
    jwt.verify(reqAuthToken, jwtSecret, (err, decoded) => {
        //decoded should return the userId
        // console.log('decoded bearer tkn>',decoded);
        if (err) {
            console.log('authUser err>',err);
            return next('Please login to continue')
        }
        req.userId = decoded.data.userId;
        console.log('does decoded userId exist?>',decoded.data.userId)
        console.log('does req userId exist?>',req.userId)
        next();
    })

}


module.exports = authorizeUser;