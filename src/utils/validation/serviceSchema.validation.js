const ServiceModel = require("../../models/service.model");
const serviceSchema = {
    title: {
        custom: {
            options: value => {
                console.log(value)
                return ServiceModel.find({
                    title: value
                }).then(service => {
                    if (service.length > 0) {
                        return Promise.reject('Service already Exist')
                    }
                })
            }
        },
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