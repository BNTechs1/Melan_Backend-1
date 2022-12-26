const mongoose = require("mongoose");
const GensetSchema = mongoose.Schema({
    gensetId:{
        type:String
    },
    gensetBrand:{
        type:String
    },
    gensetPartNumber:{
        type:Number
    },
    name: {
        type: String
    },
    description: {
        type: String,
    },
    price:{
        type:Number
    },
    files: {
        type: Array
    },
    
 });
module.exports = mongoose.model('Genset', GensetSchema);