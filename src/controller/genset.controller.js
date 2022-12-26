const asyncHandler = require("express-async-handler");
const GensetModel = require("../models/genset.model");
const getGensets = asyncHandler(async(req,res)=>{
    const Genset = await GensetModel.find();
    const resut =  {
        data: Genset
    }
    res.status(200).send(resut)
});

const getGenset = asyncHandler(async(req,res)=>{
    const Genset = await GensetModel.find({gensetId:req.params.id});
    const resut =  {
        data: Genset
    }
    res.status(200).send(resut)
});

const deleteGenset = asyncHandler(async(req,res)=>{
    const currentGenset= await AboutModel.find({gensetId:req.params.id});
      await GensetModel.deleteOne({gensetId:req.params.id});
      res.send(`About ${currentGenset[0].gensetId} removed`);
})

module.exports = {
    getGenset,
    getGensets,
    deleteGenset, 
}