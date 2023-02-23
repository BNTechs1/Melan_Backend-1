const mongoose = require("mongoose");
const ATSschema = mongoose.Schema({
    productId:{
        type:String
    },
    atsRange:{
        type:String,
    },
    amp:{
        type:Number
    },
    name:{
        type:String
    },
    description:{
        type:String
    },
     price:{
        type:String, 
        default: "view Price"
    },
    files: {
        type: Array
    },
    searchKeyWord:{
        type:String
    }
 });

module.exports = mongoose.model('ATS', ATSschema);