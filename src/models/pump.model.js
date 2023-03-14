const mongoose = require("mongoose");
const PumpSchema = mongoose.Schema({
    productId:{
        type:String
    },
    pumpType:{
        type:String,
    },
    motorCapacity:{
        type:String
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

module.exports = mongoose.model('Pump', PumpSchema);