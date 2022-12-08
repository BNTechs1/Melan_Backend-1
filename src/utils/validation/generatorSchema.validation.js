// const GeneratorModel = require("../../models/generator.model");
const generatorSchema = {

    
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
    generatorSchema
}

    // title: {
    //     custom: {
    //         options: value => {
    //             return AboutModel.find({
    //                 title: value
    //             }).then(about => {
    //                 if (about.length > 0) {
    //                     return Promise.reject('About already Exist')
    //                 }
    //             })
    //         }
    //     },
    //     notEmpty: true,
    //     errorMessage: "Title is required"
    // },