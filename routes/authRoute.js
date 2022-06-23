const express = require('express');
const app = express();
const router = express.Router();
require('dotenv').config();
const bcrypt = require('bcrypt');
const saltRounds = parseInt(process.env.SALT);

const ajvRegisterSchema = require('../models/validationSchemas/ajvAuthRegister.schema')
const ajvLoginSchema = require('../models/validationSchemas/ajvAuthLogin.schema')


const signUserIn = require('../middleware/signUserIn');
const ajvValidator = require('../middleware/ajvValidator');
const authorizeUser = require('../middleware/authorizeUser');

const userController = require('../controllers/db/userController');

app.use(express.json());
// 
router.post('/register', ajvValidator(ajvRegisterSchema), async (req, res, next) => {
    try {
        delete req.body.repassword;
        const checkIfUserExists = await userController.checkIfUserExists(req.body.email);
        // console.log('if user exists?>',checkIfUserExists)
        if (checkIfUserExists[0]) {
            throw new Error('user already exists');
        }
        const hashedPwd = bcrypt.hashSync(req.body.password, saltRounds);
        req.body.password = hashedPwd;

        const user = await userController.createUser({ ...req.body });
        const signedInUserObj = await signUserIn(user);
        if (!user) throw new Error('Could not register, please try again');

        const updateUserRefreshToken = await userController.updateUserRefreshToken(signedInUserObj.user.email, signedInUserObj.hashedRefreshToken, signedInUserObj.hashedAccessSecret);
        console.log('updated user on mongo with hashed ref token>', updateUserRefreshToken);

        res.cookie('jwt', signedInUserObj.fullToken.refresh_token, {
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
            const updateUserRefreshToken = await userController.updateUserRefreshToken(signedInUserObj.user.email, signedInUserObj.hashedRefreshToken);
            res.cookie('jwt', signedInUserObj.fullToken.refresh_token, {
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
                res.cookie('jwt', signedInUserObj.fullToken.refresh_token, {
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
            if (isValid === false) throw new Error({message: 'Invalid access token', status: 400});
            next();
        }
    } catch (err) {
        // res.status(403).json({ message: 'Outdated access token' })
        // res.status(400).json({ message: 'Invalid access token' })
        res.status(err.status).json({message: err.message})
        next(err.message);
    }

});



// router.post('/resetpwd', authorizeUser, (req, res, next) => {
//     try {
//         //check if user exists
//         // const checkIfUserExists = await userController.checkIfUserExists(req.body.email);
//         //if not - throw err
//         //if exists - continue
//         // some type of a malicious attempt conter measure - with session mgmt/validation?
//         // generate new encrypted pwd from req.body.pwd and overwrite the user's hashed pwd on the db

//     } catch (error) {

//     }
// })

module.exports = router;