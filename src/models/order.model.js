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
        type:Number,
    }, 
    status:{
        type:String,
        default: "pending"
    }, 
    avaliablity:{
        type:String
    }, 
    productName:{
        type:String
    }, 
    productImg:{
        type:Array
    }
 });

module.exports = mongoose.model('Order', OrderSchema);