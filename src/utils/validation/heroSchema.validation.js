const HeroModel = require("../../models/hero.model");
const heroSchema = {
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
    heroSchema
}