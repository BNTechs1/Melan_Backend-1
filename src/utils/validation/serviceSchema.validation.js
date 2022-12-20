const ServiceModel = require("../../models/service.model");
const serviceSchema = {
    title: {
        notEmpty: true,
        errorMessage: "Title is required"
    },
    shortDesc: {
        notEmpty: true,
        errorMessage: "Short Description is required"
    },
    longDesc: {
        notEmpty: true,
        errorMessage: "Long Description is required"
    },
}

module.exports = {
    serviceSchema
}