const asyncHandler = require("express-async-handler");
const AtsModel = require("../models/ats.model");
const getAtss = asyncHandler(async(req,res)=>{
    const Ats = await AtsModel.find();
    const resut =  {
        data: Ats
    }
    res.status(200).send(resut)
});

const getAts = asyncHandler(async(req,res)=>{
    const Ats = await AtsModel.find({productId:req.params.id});
    const resut =  {
        data: Ats
    }
    res.status(200).send(resut)
});

const deleteAts = asyncHandler(async(req,res)=>{
      await AtsModel.deleteOne({productId:req.params.id});
      res.status(200).send("Delted Successfully")
});

module.exports = {
    getAts,
    getAtss,
    deleteAts, 
}