const PortfolioModel = require("../../models/portfolio.model");
const portfolioSchema = {
    title: {
        custom: {
            options: value => {
                return PortfolioModel.find({
                    name: value
                }).then(portfolio => {
                    if (portfolio.length > 0) {
                        return Promise.reject('Hero already Exist')
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
    portfolioSchema
}