const mongoose = require("mongoose");
const CustomerSchema = mongoose.Schema({
    custId:{
        type:String
    },
    custName:{
        type:String
    },
    custPhone:{
        type:String
    },
    custEmail:{
        type:String
    },
 });

module.exports = mongoose.model('Customer', CustomerSchema);