const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
// const dbConnection = require('./db/mConnection');

// dbConnection(); 


app.get((req,res,next) => {
    res.send('hello world')
})


app.use((err,req,res,next)=> {
    console.log('app err handler says:', err);
    res.status(400).send({
        error: true,
        message: err,
    });
})


module.exports = app;
