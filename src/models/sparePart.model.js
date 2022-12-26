const mongoose = require("mongoose");
const GensetSchema = mongoose.Schema({
    sparePartId:{
        type:String
    },
    sparePartType:{
        type:String
    },
    subType:{
        type:String
    },
    sparePartBrand:{
        type:String
    },
    sparePartNumber:{
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