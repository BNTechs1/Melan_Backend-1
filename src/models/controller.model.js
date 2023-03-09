const mongoose = require("mongoose");
const ControllerSchema = mongoose.Schema({
    proudctId:{
        type:String
    },
    controllerBrand:{
        type:String
    },
    controllerModel:{
        type:String
    },
    name: {
        type: String
    },
    description: {
        type: String,
    },
     price:{
        type:String, 
        default: "view Price"
    },
    files: {
        type: Array
    },
    
 });
module.exports = mongoose.model('Controller', ControllerSchema);