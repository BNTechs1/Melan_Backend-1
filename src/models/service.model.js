const mongoose = require("mongoose");
const Servicechema = mongoose.Schema({
    serviceId:{
        type:String
    },
    title:{
        type:String,
    },
    shortDesc:{
        type:String
    },
    longDesc:{
        type:String
    }
    
 });

module.exports = mongoose.model('Service', Servicechema);