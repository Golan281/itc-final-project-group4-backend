const express = require('express');
const app = express();
const router = express.Router();
require('dotenv').config();
const bcrypt = require('bcrypt');
const saltRounds = parseInt(process.env.SALT);
//only used on login route currently
const mongooseUserSchema = require('../models/mongooseModels/userSchema');
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
          const user = await mongooseUserSchema.findOne({ email });
          if (!user) {
              console.log(' in case !user:', user)
            //   return next(`Inexistent user`);
              throw new Error(`Inexistent user`);
            }
            const isValid = bcrypt.compareSync(password, user.password);
            delete req.body.password;
            
            if (isValid) {
                const signedInUserObj = await signUserIn(user);
    
                return res.json({...signedInUserObj, isValid, isLoggedIn: true});
            }
            // next('Login attempt failed, token didnt generate?');
            // res.setHeader('tokens',token);
            // res.json({firstName: user.firstName,});
            if (isValid === false) throw new Error('Login attempt failed, wrong password');
            next();
    
        } catch (err) {
          res.status(500).json({ message: err.message })
        }
    })

router.post('/refresh', authorizeUser, (req, res, next) => {

    const refreshToken = req.headers.authorization;
    const tokenString = JSON.stringify(refreshToken);
    console.log('refreshToken from user req is>', tokenString);

        // const tokensDB = new tmpDB('tokensDB');
        // const pack = tokensDB.find((i) => i.refresh_token === refreshToken);
        // if (!pack) { //for a malicios attempt
        //     return next('Please login to continue');
        // }

        // tokensDB.del(pack.id);

        const tokens = tokenGenerator(pack.userId);

        res.send(tokens);
    });


//forgot pwd route:
// delete hashed pwd on db and just overwrite it - but must verify with some other method or the acc token is enough?


module.exports = router;