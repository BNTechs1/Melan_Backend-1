const AboutModel = require("../../models/about.model");
const aboutSchema = {
    title: {
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