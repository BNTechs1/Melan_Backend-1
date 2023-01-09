const mongoose = require("mongoose");
const PumpSchema = mongoose.Schema({
    productId:{
        type:String
    },
    pumpType:{
        type:String,
    },
    motorCapacity:{
        type:Number
    },
    pumpBrand:{
        type:String,
    },
    pumpModel:{
        type:String
    }, 
    flowRate:{
        type:String
    }, 
    head:{
        type:String
    }, 
    name:{
        type:String
    },
    description:{
        type:String
    },
    price:{
        type:Number
    },
    files: {
        type: Array
    },
    searchKeyWord:{
        type:String
    }
 });

module.exports = mongoose.model('Pump', PumpSchema);