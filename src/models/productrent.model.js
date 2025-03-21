const mongoose = require("mongoose");
const rentProductchema = mongoose.Schema({
    productId:{
        type:String,
    },
    name:{
        type:String,
    },
    description:{
        type:String,
    },
    files:{
        type:Array,
    },
    currency:{
        type:String,
    },
    per:{
        type:String,
    },
    minDuration:{
        type:String,
    },
    price:{
        type:String, 
        default: "View Price"
    },
    quantity:{
        type:Number
    },
    generatorType:{
        type:String,
    },
    capacity:{
        type:String
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
    searchKeyWord:{
        type:String
    }
 });

module.exports = mongoose.model('Rentproduct', rentProductchema);