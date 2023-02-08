const mongoose = require("mongoose");
const ContactSchema = mongoose.Schema({
    contactId:{
        type:String
    },
    name:{
        type:String,
    },
    email:{
        type:String
    },
    phoneNumber:{

    },
    messgae:{
        type:String
    }, 
    
 });

module.exports = mongoose.model('Contact', ContactSchema);