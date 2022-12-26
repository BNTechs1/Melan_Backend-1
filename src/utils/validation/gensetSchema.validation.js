// const pumpModel = require("../../models/pump.model");
const GensetSchema = {    
    gensetBrand: {
        notEmpty: true,
        errorMessage: "gensetBrand is required"
    },
    gensetPartNumber: {
        notEmpty: true,
        errorMessage: "gensetPartNumber is required"
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
    GensetSchema
}

   