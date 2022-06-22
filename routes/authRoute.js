const express = require('express');
const app = express();
const router = express.Router();
require('dotenv').config();
const bcrypt = require('bcrypt');
const saltRounds = parseInt(process.env.SALT);

const ajvRegisterSchema = require('../models/validationSchemas/ajvAuthRegister.schema')
const ajvLoginSchema = require('../models/validationSchemas/ajvAuthLogin.schema')

const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_REFRESH_SECRET;


const signUserIn = require('../middleware/signUserIn');
const ajvValidator = require('../middleware/ajvValidator');
const authorizeUser = require('../middleware/authorizeUser');

const userController = require('../controllers/db/userController');

app.use(express.json());
// 
router.post('/register',ajvValidator(ajvRegisterSchema), async (req, res, next) => {
    try {    
        delete req.body.repassword;
        const checkIfUserExists = await userController.checkIfUserExists(req.body.email);
        // console.log('if user exists?>',checkIfUserExists)
        if (checkIfUserExists[0]) {
            throw new Error('user already exists');
        } 
        const hashedPwd = bcrypt.hashSync(req.body.password, saltRounds);
        
        req.body.password = hashedPwd;
        req.body.refreshToken = "initial token";
        // req.body.accessSecret - "initial secret";
        // console.log(req.body)
        // const finalUserObj = await userController.updateUserRefreshToken(user.email, hashedRefreshToken);
        // console.log('final user obj on signUserIn midware:', finalUserObj);

        const user = await userController.createUser({...req.body, accessSecret: 'initial secret'});
        const signedInUserObj = await signUserIn(user);
        // console.log('signedInUser now hass id?',signedInUserObj)
        if (!user) throw new Error('Could not register, please try again');
        //consider creating user workspaces here
        const updateUserRefreshToken = await userController.updateUserRefreshTokenAndAccessSecret(signedInUserObj.user.email, signedInUserObj.hashedRefreshToken, signedInUserObj.hashedAccessSecret);
        // console.log('did hashed ref token updated?',updateUserRefreshToken)
        res.cookie('jwt', signedInUserObj.fullToken.refresh_token,{
           httpOnly: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000, 
        }) //secure: true,
        res.status(201).json({
            id: signedInUserObj.user._id,
            firstName: signedInUserObj.user.firstName,
            lastName: signedInUserObj.user.lastName,
            email: signedInUserObj.user.email,
            userWorkSpaces: signedInUserObj.user.userWorkSpaces,
            accessToken: signedInUserObj.fullToken.access_token,
            isValid: true,
            isLoggedIn: true,
        });
    } catch (err) {
        next(err.message);
    }
    
});




router.post('/login', ajvValidator(ajvLoginSchema), async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await userController.findUserToLogin(email);
        if (!user) {
            console.log(' in case !user:', user)
            throw new Error(`Inexistent user`);
        }
        const isValid = bcrypt.compareSync(password, user.password);
        delete req.body.password;
        
        if (isValid) {
            const signedInUserObj = await signUserIn(user);
            const updateUserRefreshToken = await userController.updateUserRefreshTokenAndAccessSecret(signedInUserObj.user.email, signedInUserObj.hashedRefreshToken, signedInUserObj.accessSecret);
                res.cookie('jwt', signedInUserObj.fullToken.refresh_token,{
                    httpOnly: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000, 
                 })
                 // return res.json({...signedInUserObj, isValid, isLoggedIn: true});
                 return res.json({
                     id: signedInUserObj.user._id,
                     firstName: signedInUserObj.user.firstName,
                     lastName: signedInUserObj.user.lastName,
                     email: signedInUserObj.user.email,
                     userWorkSpaces: signedInUserObj.user.userWorkSpaces,
                     accessToken: signedInUserObj.fullToken.access_token,
                     isValid: true,
                     isLoggedIn: true,
                    });
                }
            if (isValid === false) throw new Error('Login attempt failed, wrong password');
            next();
    
        } catch (err) {
          res.status(500).json({ message: err.message })
        }
    })

router.post('/refresh', authorizeUser, async (req, res, next) => {
    try {
        const userRefreshToken = req.headers.cookie.split('jwt=')[1];
        // const tokenString = JSON.stringify(userRefreshToken);
        console.log('userRefreshToken from user req is>', userRefreshToken);

        const checkIfUserAndTokenExist = await userController.checkIfUserExists(req.body.email);
        // console.log('user & token exists?',checkIfUserAndTokenExist[0].refreshToken)
        // res.status(200);
        if (checkIfUserAndTokenExist[0] !== null) {
            // console.log('data & hash inside if',userRefreshToken, checkIfUserAndTokenExist[0].refreshToken)
            const isValid = bcrypt.compareSync(userRefreshToken, checkIfUserAndTokenExist[0].refreshToken);


            console.log('is ref token valid?', isValid)
            if (isValid) {
                const signedInUserObj = await signUserIn(checkIfUserAndTokenExist[0]);
                const updateUserRefreshToken = await userController.updateUserRefreshToken(signedInUserObj.user.email, signedInUserObj.hashedRefreshToken);
                    res.cookie('jwt', signedInUserObj.fullToken.refresh_token,{
                        httpOnly: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000, 
                     }) //secure: true (for https only)
                     // return res.json({...signedInUserObj, isValid, isLoggedIn: true});
                     return res.json({
                         id: signedInUserObj.user._id,
                         firstName: signedInUserObj.user.firstName,
                         lastName: signedInUserObj.user.lastName,
                         email: signedInUserObj.user.email,
                         userWorkSpaces: signedInUserObj.user.userWorkSpaces,
                         accessToken: signedInUserObj.fullToken.access_token,
                         isValid: true,
                         isLoggedIn: true,
                        });
                    }
                if (isValid === false) throw new Error('access token renewal attempt failed, please login');
                next();
        }
        // var cookieOptions = new CookieOptions
        // {
        //     HttpOnly = true,
        //     Expires = DateTime.UtcNow.AddDays(7),
        //     SameSite = SameSiteMode.None,
        //     Secure = true
        // };
        // Response.Cookies.Append("refreshToken", token, cookieOptions);
    
            // const tokens = tokenGenerator(pack.userId);
    
            // res.send(tokens);
        // res.send('cookie receievd! thanks')
    } catch (err) {
        next(err)
    }

    });


//forgot pwd route:
// delete hashed pwd on db and just overwrite it - but must verify with some other method or the acc token is enough?


router.post('/resetpwd', authorizeUser, (req,res,next) => {
    try {
        //check if user exists
        // const checkIfUserExists = await userController.checkIfUserExists(req.body.email);
        //if not - throw err
        //if exists - continue
        // some type of a malicious attempt conter measure - with session mgmt/validation?
        // generate new encrypted pwd from req.body.pwd and overwrite the user's hashed pwd on the db
        
    } catch (error) {
        
    }
})

module.exports = router;