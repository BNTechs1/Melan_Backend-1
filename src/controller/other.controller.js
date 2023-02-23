const asyncHandler = require("express-async-handler");
const otherModel = require("../models/other.model");
const getOthers = asyncHandler(async(req,res)=>{
    let query = req.query
     if(Object.keys(query).length == 0){
         const other = await otherModel.find();
         const resut =  {
             data: other.reverse()
         }
         res.status(200).send(resut)
 
     
     }  else {
         const filter = req.query;
         const other =  await otherModel.find(filter);
         const resut =  {
             data: other.reverse()
         }
         res.status(200).send(resut)
     }    
});

const getOther = asyncHandler(async(req,res)=>{
    const other = await otherModel.find({productId:req.params.id});
    const resut =  {
        data: other
    }
    res.status(200).send(resut)
});

const deleteOthers = asyncHandler(async(req,res)=>{
      await otherModel.deleteOne({productId:req.params.id});
      res.status(200).send("Delted Successfully")
});

module.exports = {
    getOther,
    getOthers,
    deleteOthers, 
}