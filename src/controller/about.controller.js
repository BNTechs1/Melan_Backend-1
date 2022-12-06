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
    const about = await AboutModel.find({userId:req.params.id});
    const resut =  {
        data: about
    }
    res.status(200).send(resut)
});

const deleteAbout = asyncHandler(async(req,res)=>{
    const currentAbout= await AboutModel.find({userId:req.params.id});
      await AboutModel.deleteOne({userId:req.params.id});
      res.send(`About ${currentHero[0].userId} removed`);
})

module.exports = {
    getAbout,
    getAbouts,
    deleteAbout, 
}