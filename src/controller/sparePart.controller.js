const asyncHandler = require("express-async-handler");
const sparePartModel = require("../models/sparePart.model");
const getspareParts = asyncHandler(async(req,res)=>{
    const sparePart = await sparePartModel.find();
    const resut =  {
        data: sparePart
    }
    res.status(200).send(resut)
});

const getsparePart = asyncHandler(async(req,res)=>{
    const sparePart = await sparePartModel.find({productId:req.params.id});
    const resut =  {
        data: sparePart
    }
    res.status(200).send(resut)
});

const deletesparePart = asyncHandler(async(req,res)=>{
    const currentsparePart= await AboutModel.find({productId:req.params.id});
      await sparePartModel.deleteOne({productId:req.params.id});
      res.send(`About ${currentsparePart[0].productId} removed`);
})

module.exports = {
    getsparePart,
    getspareParts,
    deletesparePart, 
}