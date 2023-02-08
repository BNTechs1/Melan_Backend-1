const ContactModel = require("../../models/contactus.model");
const contactSchema = {
    name: {
        notEmpty: true,
        errorMessage: "Full Names is required"
    },
    email: {
        notEmpty: true,
        errorMessage: "Email is required"
    },
    phoneNumber: {
        notEmpty: true,
        errorMessage: "Phone number is required"
    },
    message:{
        notEmpty: true,
        errorMessage: "message is required"
        
    }
}

module.exports = {
    contactSchema
}