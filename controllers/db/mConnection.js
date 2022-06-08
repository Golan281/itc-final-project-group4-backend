// //my creds:
require('dotenv').config();
const mongoose = require('mongoose');

//setup initial connection
const dbConnection = async () => {
    try {
        mongoose.connect(process.env.DB_URI, {useNewUrlParser: true})
        const db = mongoose.connection;
        db.on('err', (err)=>console.err(err));
        db.once('open', ()=>console.log('connected to DB'))

    } catch (err) {
        return err;
    }
}

module.exports = dbConnection;