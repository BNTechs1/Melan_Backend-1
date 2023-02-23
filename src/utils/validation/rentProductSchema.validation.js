// const GeneratorModel = require("../../models/generator.model");
const rentProductSchema = {
    generatorType: {
        notEmpty: true,
        errorMessage: "generatorType is required"
    },
    capacity: {
        notEmpty: true,
        errorMessage: "capacity is required"
    },
    generatorBrand: {
        notEmpty: true,
        errorMessage: "generatorBrand is required"
    },
    engineBrand: {
        notEmpty: true,
        errorMessage: "engineBrand is required"
    },
    alterantorBrand: {
        notEmpty: true,
        errorMessage: "alterantorBrand is required"
    },
    name: {
        notEmpty: true,
        errorMessage: "name is required"
    },
    
    description: {
        notEmpty: true,
        errorMessage: "Description is required"
    },
    currency:{
        notEmpty: true,
        errorMessage: "Currency is required"
    },
    per:{
        notEmpty: true,
        errorMessage: "Per is required"
    },
    quantity:{
        notEmpty: true,
        errorMessage: "Quantity is required"
    },
    minDuration:{
        notEmpty: true,
        errorMessage: "Minimum Duration is required"
    },
}

module.exports = {
    rentProductSchema
}

   