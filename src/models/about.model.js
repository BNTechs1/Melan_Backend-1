const mongoose = require("mongoose");
const Aboutschema = mongoose.Schema({
    aboutId:{
        type:String
    },
    title:{
        type:String,
    },
    description:{
        type:String
    },
    files: {
        type: Array
    },
 });

module.exports = mongoose.model('About', Aboutschema);