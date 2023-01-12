const asyncHandler = require("express-async-handler");
const sparePartModel = require("../models/sparePart.model");
const getspareParts = asyncHandler(async(req,res)=>{
    let query = req.query
    if(Object.keys(query).length == 0){
        const sparePart = await sparePartModel.find();
        const resut =  {
            data: sparePart
        }
        res.status(200).send(resut)

    
    }  else {
        const filter = req.query;
        const sparePart =  await sparePartModel.find(filter);
        const resut =  {
            data: sparePart
        }
        res.status(200).send(resut)
    }    
});

const getsparePart = asyncHandler(async(req,res)=>{
    const sparePart = await sparePartModel.find({productId:req.params.id});
    const resut =  {
        data: sparePart
    }
    res.status(200).send(resut)
});

const deletesparePart = asyncHandler(async(req,res)=>{
      await sparePartModel.deleteOne({productId:req.params.id});
      res.status(200).send(`Deleted Successfully`);
})

module.exports = {
    getsparePart,
    getspareParts,
    deletesparePart, 
}