const HeroModel = require("../../models/hero.model");
const heroSchema = {
    title: {
        custom: {
            options: value => {
                return HeroModel.find({
                    name: value
                }).then(hero => {
                    if (hero.length > 0) {
                        return Promise.reject('Hero already Exist')
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
    heroSchema
}