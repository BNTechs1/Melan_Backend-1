const mongoose = require("mongoose");
const PartnerSchema = mongoose.Schema({
    partnerId:{
        type:String
    },
    name: {
        type: String
    },
    
    files: {
        type: Array
    },
    
 });
module.exports = mongoose.model('Partner', PartnerSchema);