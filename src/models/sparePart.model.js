const mongoose = require("mongoose");
const SparePartSchema = mongoose.Schema({
    productId:{
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
    searchKeyWord: {
        type: String 
    }
    
 });
module.exports = mongoose.model('SparePart',  SparePartSchema);