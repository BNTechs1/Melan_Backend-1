const mongoose = require("mongoose");
const OrderSchema = mongoose.Schema({
    orderId:{
        type:String
    },
    productId:{
        type:String,
    },
    name:{
        type:String,
    },
    Email:{
        type:String
    },
    phoneNumber: {
        type: String
    },
    startDate:{
        type:Date
    },
    endDate:{
        type:Date
    }, 
    quantity:{
        type:String
    }, 
    status:{
        type:String
    }, 
    avaliablity:{
        type:String
    }
 });

module.exports = mongoose.model('Order', OrderSchema);