const asyncHandler = require("express-async-handler");
const AtsModel = require("../models/ats.model");
const getAtss = asyncHandler(async(req,res)=>{
    let query = req.query
     if(Object.keys(query).length == 0){
         const Ats = await AtsModel.find();
         const resut =  {
             data: Ats.reverse()
         }
         res.status(200).send(resut)
 
     
     }  else {
         const filter = req.query;
         const Ats =  await AtsModel.find(filter);
         const resut =  {
             data: Ats.reverse()
         }
         res.status(200).send(resut)
     }    
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