const asyncHandler = require("express-async-handler");
const GensetModel = require("../models/genset.model");
const getGensets = asyncHandler(async(req,res)=>{
    let query = req.query
     if(Object.keys(query).length == 0){
         const genset = await GensetModel.find();
         const resut =  {
             data: genset.reverse()
         }
         res.status(200).send(resut)
 
     
     }  else {
         const filter = req.query;
         const genset =  await GensetModel.find(filter);
         const resut =  {
             data: genset.reverse()
         }
         res.status(200).send(resut)
     }    
});

const getGenset = asyncHandler(async(req,res)=>{
    const Genset = await GensetModel.findOne({productId:req.params.id});
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