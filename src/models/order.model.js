const mongoose = require("mongoose");
const Bookschema = mongoose.Schema({
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
        type:String
    },
    endDate:{
        type:String
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

module.exports = mongoose.model('Book', Bookschema);