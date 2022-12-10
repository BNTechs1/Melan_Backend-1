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