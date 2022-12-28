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
    const Genset = await GensetModel.find({productId:req.params.id});
    const resut =  {
        data: Genset
    }
    res.status(200).send(resut)
});

const deleteGenset = asyncHandler(async(req,res)=>{
      await GensetModel.deleteOne({productId:req.params.id});
      res.status(200).send(`Deleted Successfully`);
})

module.exports = {
    getGenset,
    getGensets,
    deleteGenset, 
}