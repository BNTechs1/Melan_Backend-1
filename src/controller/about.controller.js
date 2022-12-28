const asyncHandler = require("express-async-handler");
const AboutModel = require("../models/about.model");
const getAbouts = asyncHandler(async(req,res)=>{
    const about = await AboutModel.find();
    const resut =  {
        data: about
    }
    res.status(200).send(resut)
});

const getAbout = asyncHandler(async(req,res)=>{
    const about = await AboutModel.find({aboutId:req.params.id});
    const resut =  {
        data: about
    }
    res.status(200).send(resut)
});

const deleteAbout = asyncHandler(async(req,res)=>{
      await AboutModel.deleteOne({aboutId:req.params.id});
      res.status(200).send("Deleted Sucessfully")
})

module.exports = {
    getAbout,
    getAbouts,
    deleteAbout, 
}