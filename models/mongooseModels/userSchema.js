
const mongoose = require('mongoose');

//test this limit method or find other method to limit (built in?)
const arrLimit = (arr) => arr.length <= 5; 

const userSchema = new mongoose.Schema({
    firstName:
    {
        type: String,
        required: true
    },
    lastName:
    {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    // userRole: {
    //     type: String,
    //     enum : ['USER','MODERATOR','ADMIN'],
    //     default: 'USER',
    // },

    userWorkSpaces: {
        type: Array,
        default: ['Work','Learn','Fun','Money','Family'],
        validate: [arrLimit, '{PATH} exceeds the limit of 5']
    },
    currentUserTabs: {
        type: Array,
        default: [] //prob just store _id
    },
    archivedUserTabs: {
        type: Array,
        default: [] //prob just store _id
    },
}, { timestamps: true });


module.exports = mongoose.model('user', userSchema)