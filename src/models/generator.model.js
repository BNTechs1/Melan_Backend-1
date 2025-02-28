const mongoose = require("mongoose");
const Generatorschema = mongoose.Schema({
    productId:{
        type:String
    },
    generatorType:{
        type:String,
    },
    capacity:{
        type:Number
    },
    generatorBrand:{
        type:String,
    },
    engineBrand:{
        type:String
    }, 
    alterantorBrand:{
        type:String
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

module.exports = mongoose.model('Generator', Generatorschema);