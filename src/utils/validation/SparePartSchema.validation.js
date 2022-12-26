// const pumpModel = require("../../models/pump.model");
const sparePartSchema = {    
    sparePartType: {
        notEmpty: true,
        errorMessage: "sparePartType is required"
    },
    subType: {
        notEmpty: true,
        errorMessage: "subTyoe is required"
    },
    sparePartBrand: {
        notEmpty: true,
        errorMessage: "sparePartBrand is required"
    },
    sparePartNumber: {
        notEmpty: true,
        errorMessage: "sparePartNumber is required"
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
    sparePartSchema
}

   