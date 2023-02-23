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
        type:String, 
        default: "View Price"
    },
    files: {
        type: Array
    },
 });

module.exports = mongoose.model('Other', OtherSchema);