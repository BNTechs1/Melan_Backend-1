const asyncHandler = require("express-async-handler");
const PortfolioModel = require("../models/portfolio.model");
const {body,validationResult} = require('express-validator');
const { v4: uuidv4} = require("uuid")
const createPortfolio = asyncHandler(async(req,res)=>{
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    const { title, longDesc, shortDesc } = req.body;
    const portfolioId = uuidv4();
    const portfolio = await new PortfolioModel({
            portfolioId,
            shortDesc,
            title,
            longDesc, 
        }).save();
    res.status(200).json({
        success: true,
        message: 'Portfolio created successful',
        json: portfolio
    });
   
});

const updatePortfolio = asyncHandler(async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    const { title, longDesc, shortDesc } = req.body;
    let portfolio = await PortfolioModel.findOne({portfolioId:req.params.id})
    portfolio.updateOne({
        $set:{
            shortDesc: shortDesc,
            title:title,
            longDesc:longDesc, 
        }
           
        }, {new:true})

    res.status(200).json({
        success: true,
        message: 'Portfolio Updated successful',
        json: service
    });
})
const getPortfolios = asyncHandler(async(req,res)=>{
    const portfolio = await PortfolioModel.find();
    const resut =  {
        data: portfolio
    }
    res.status(200).send(resut)
});

const getPortfolio = asyncHandler(async(req,res)=>{
    const portfolio = await PortfolioModel.find({portfolioId:req.params.id});
    const resut =  {
        data: portfolio
    }
    res.status(200).send(resut)
});

const deletePortfolio = asyncHandler(async(req,res)=>{
      await PortfolioModel.deleteOne({portfolioId:req.params.id});
      res.status(200).send(`Deleted Sucessfully`);
})

module.exports = {
    getPortfolio,
getPortfolios,
    createPortfolio,
    updatePortfolio,
    deletePortfolio 
}