const PartnerModel = require("../../models/portfolio.model");
const partnerSchema = {
    name: {
        notEmpty: true,
        errorMessage: "name is required"
    },
   
}

module.exports = {
    partnerSchema
}