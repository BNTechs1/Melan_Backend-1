const PartnerModel = require("../../models/portfolio.model");
const partnerSchema = {
    name: {
        custom: {
            options: value => {
                return PartnerModel.find({
                    name: value
                }).then(partner => {
                    if (partner.length > 0) {
                        return Promise.reject('Partner already Exist')
                    }
                })
            }
        },
        notEmpty: true,
        errorMessage: "name is required"
    },
   
}

module.exports = {
    partnerSchema
}