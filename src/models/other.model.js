const mongoose = require("mongoose");
const OtherSchema = mongoose.Schema({
    productId:{
        type:String
    },
    name:{
        type:String,
    },
    description:{
        type:String
    },
    price: {
        type:Number
    },
    files: {
        type: Array
    },
 });

module.exports = mongoose.model('Other', OtherSchema);