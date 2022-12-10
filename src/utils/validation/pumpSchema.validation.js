// const pumpModel = require("../../models/pump.model");
const pumpSchema = {    
    pumpType: {
        notEmpty: true,
        errorMessage: "pumpType is required"
    },
    motorCapacity: {
        notEmpty: true,
        errorMessage: "Motor Capacity is required"
    },
    pumpBrand: {
        notEmpty: true,
        errorMessage: "pumpBrand is required"
    },
    pumpModel: {
        notEmpty: true,
        errorMessage: "pumpModel is required"
    },
    flowRate: {
        notEmpty: true,
        errorMessage: "flowRate is required"
    },
    head: {
        notEmpty: true,
        errorMessage: "head is required"
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
    pumpSchema
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