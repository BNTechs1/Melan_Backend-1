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
    const Ats = await AtsModel.find({atsId:req.params.id});
    const resut =  {
        data: Ats
    }
    res.status(200).send(resut)
});

const deleteAts = asyncHandler(async(req,res)=>{
    const currentAts= await AtsModel.find({atsId:req.params.id});
      await AtsModel.deleteOne({atsId:req.params.id});
      res.send(`About ${currentAts[0].AtsId} removed`);
})

module.exports = {
    getAts,
    getAtss,
    deleteAts, 
}