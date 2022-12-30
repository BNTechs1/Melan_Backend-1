const mongoose = require("mongoose");
const PortfolioSchema = mongoose.Schema({
    portfolioId:{
        type:String
    },
    title:{
        type:String,
    },
    shortDesc:{
        type:String
    },
    longDesc:{
        type:String
    }
    
 });

module.exports = mongoose.model('Portfolio', PortfolioSchema);