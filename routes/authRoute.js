const express = require('express');
const app = express();
const router = express.Router();
require('dotenv').config();
const bcrypt = require('bcrypt');
const saltRounds = parseInt(process.env.SALT);
const mongooseUserSchema = require('../models/mongooseModels/userSchema');
const ajvRegisterSchema = require('../models/validationSchemas/ajvAuthRegister.schema')
const ajvLoginSchema = require('../models/validationSchemas/ajvAuthLogin.schema')


const signUserIn = require('../middleware/signUserIn');
const ajvValidator = require('../middleware/ajvValidator');


app.use(express.json());
// 
router.post('/register',ajvValidator(ajvRegisterSchema), async (req, res, next) => {
    try {    
        delete req.body.repassword;
        const checkIfUserExists = await mongooseUserSchema.find({email: req.body.email});
        // console.log('if user exists?>',checkIfUserExists)
        if (checkIfUserExists[0]) {
            throw new Error('user already exists');
        } 
        const hashedPwd = bcrypt.hashSync(req.body.password, saltRounds);
        req.body.password = hashedPwd;
        // console.log(req.body)

        const user = await mongooseUserSchema.create({ ...req.body })
        if (!user) throw new Error('Could not register, please try again');
        // console.log('user that should be saved on mongo>', user)
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
              return next(`Inexistent user`);
            }
            const isValid = bcrypt.compareSync(password, user.password);
            delete req.body.password;
            
            if (isValid) {
                const signedInUserObj = await signUserIn(user);
    
                return res.json({...signedInUserObj, isValid, isLoggedIn: true});
            }
            next('Login attempt failed, token didnt generate?');
            res.setHeader('tokens',token);
            res.json({firstName: user.firstName,});
    
        } catch (err) {
          res.status(500).json({ message: err.message })
        }
    })

//forgot pwd route:
// delete hashed pwd on db and just overwrite it - but must verify with some other method or the acc token is enough?


module.exports = router;