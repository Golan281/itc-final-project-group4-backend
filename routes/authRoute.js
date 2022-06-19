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
        // console.log(req.body)

        const user = await userController.createUser({...req.body});
        if (!user) throw new Error('Could not register, please try again');
        const signedInUserObj = await signUserIn(user);
        res.status(201).json({...signedInUserObj, isValid: true, isLoggedIn: true});
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
    
                return res.json({...signedInUserObj, isValid, isLoggedIn: true});
            }
            if (isValid === false) throw new Error('Login attempt failed, wrong password');
            next();
    
        } catch (err) {
          res.status(500).json({ message: err.message })
        }
    })

router.post('/refresh', authorizeUser, (req, res, next) => {
    try {
        const refreshToken = req.headers.authorization;
        const tokenString = JSON.stringify(refreshToken);
        console.log('refreshToken from user req is>', tokenString);
    
        // var cookieOptions = new CookieOptions
        // {
        //     HttpOnly = true,
        //     Expires = DateTime.UtcNow.AddDays(7),
        //     SameSite = SameSiteMode.None,
        //     Secure = true
        // };
        // Response.Cookies.Append("refreshToken", token, cookieOptions);
    
            const tokens = tokenGenerator(pack.userId);
    
            res.send(tokens);

    } catch (err) {

    }

    });


//forgot pwd route:
// delete hashed pwd on db and just overwrite it - but must verify with some other method or the acc token is enough?


router.post('/resetpwd', authorizeUser, (req,res,next) => {
    try {
        //check if user exists
        const checkIfUserExists = await userController.checkIfUserExists(req.body.email);
        //if not - throw err
        //if exists - continue
        // some type of a malicious attempt conter measure - with session mgmt/validation?
        // generate new encrypted pwd from req.body.pwd and overwrite the user's hashed pwd on the db
        
    } catch (error) {
        
    }
})

module.exports = router;