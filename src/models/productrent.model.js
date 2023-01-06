const mongoose = require("mongoose");
const remtProductchema = mongoose.Schema({
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
        type:Number,
    },
    quanity:{
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
 });

module.exports = mongoose.model('Rentproduct', remtProductchema);