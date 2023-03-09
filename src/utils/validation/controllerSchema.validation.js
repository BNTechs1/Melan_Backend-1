// const pumpModel = require("../../models/pump.model");
const controllerSchema = {    
    controllerBrand: {
        notEmpty: true,
        errorMessage: "gensetBrand is required"
    },
    controllerModel: {
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
    controllerSchema
}

   