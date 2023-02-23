const mongoose = require("mongoose");
const GensetSchema = mongoose.Schema({
    proudctId:{
        type:String
    },
    gensetBrand:{
        type:String
    },
    gensetPartNumber:{
        type:String
    },
    name: {
        type: String
    },
    description: {
        type: String,
    },
     price:{
        type:String, 
        default: "view Price"
    },
    files: {
        type: Array
    },
    
 });
module.exports = mongoose.model('Genset', GensetSchema);