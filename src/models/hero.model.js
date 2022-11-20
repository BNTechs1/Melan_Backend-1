const mongoose = require("mongoose");
const Herochema = mongoose.Schema({
    heroId:{
        type:String
    },
    title: {
        type: String
    },
    description: {
        type: String,
    },
    files: {
        type: Array
    },
    
 });
module.exports = mongoose.model('Hero', Herochema);