// const pumpModel = require("../../models/pump.model");
const atsSchema = {    
    atsRange: {
        notEmpty: true,
        errorMessage: "AtsRange is required"
    },
    amp: {
        notEmpty: true,
        errorMessage: "Amp is required"
    },
    name: {
        notEmpty: true,
        errorMessage: "name is required"
    },
    price: {
        notEmpty: true,
        errorMessage: "price is required"
    },
    description: {
        notEmpty: true,
        errorMessage: "Description is required"
    },
   
}

module.exports = {
    atsSchema
}

   