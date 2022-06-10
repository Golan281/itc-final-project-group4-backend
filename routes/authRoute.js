const express = require('express');
const app = express();
const router = express.Router();
require('dotenv').config();
const bcrypt = require('bcrypt');
const saltRounds = parseInt(process.env.SALT);

const signUserIn = require('../middleware/signUserIn');


app.use(express.json());
// validator(ajvRegisterSchema)
router.post('/register', async (req, res, next) => {
    try {    
        delete req.body.repassword;
        const checkIfUserExists = await mongooseUserSchema.find({email: req.body.email});
        // console.log('if user exists?>',checkIfUserExists)
        if (checkIfUserExists[0]) {
            return next('user already exists');
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


//forgot pwd route:
// delete hashed pwd on db and just overwrite it - but must verify with some other method or the acc token is enough?


module.exports = router;