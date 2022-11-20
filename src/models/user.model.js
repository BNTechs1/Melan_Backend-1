const mongoose = require("mongoose");
const UserSchema = mongoose.Schema({
    userId:{
        type:String
    },
    userName: {
        type: String
    },
    email: {
        type: String,
    },
    password: {
        type: String
    },
    phoneNumber:{
        type:String,
       }
 });
module.exports = mongoose.model('User', UserSchema);