// const pumpModel = require("../../models/pump.model");
const otherSchema = {    
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
    otherSchema
}

   