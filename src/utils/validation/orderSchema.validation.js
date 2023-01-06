const OrderModel = require("../../models/order.model");
const OrderSchema = {
    name:{
        notEmpty: true,
        errorMessage: "Title is required",
    },
    Email:{
        notEmpty: true,
        errorMessage: "Title is required"
    },
    phoneNumber: {
        type: String
    },
    startDate:{
        notEmpty: true,
        errorMessage: "Title is required"
    },
    endDate:{
        notEmpty: true,
        errorMessage: "Title is required"
    }, 
    quantity:{
        notEmpty: true,
        errorMessage: "Title is required"
    }, 
    // status:{
    //     notEmpty: true,
    //     errorMessage: "Title is required"
    // }, 
    // avelablity:{
    //     notEmpty: true,
    //     errorMessage: "Title is required"
    // }
}

module.exports = {
    OrderSchema
}