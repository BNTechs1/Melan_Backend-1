// const pumpModel = require("../../models/pump.model");
const gensetSchema = {    
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
    
    description: {
        notEmpty: true,
        errorMessage: "Description is required"
    },
   
}

module.exports = {
    gensetSchema
}

   