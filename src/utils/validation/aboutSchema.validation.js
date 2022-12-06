const AboutModel = require("../../models/about.model");
const aboutSchema = {
    title: {
        custom: {
            options: value => {
                return AboutModel.find({
                    title: value
                }).then(about => {
                    if (about.length > 0) {
                        return Promise.reject('About already Exist')
                    }
                })
            }
        },
        notEmpty: true,
        errorMessage: "Title is required"
    },
    description: {
        notEmpty: true,
        errorMessage: "Description is required"
    },
}

module.exports = {
    aboutSchema
}