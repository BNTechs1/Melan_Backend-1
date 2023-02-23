const asyncHandler = require("express-async-handler");
const PumpModel = require("../models/pump.model");
const getPumps = asyncHandler(async(req,res)=>{
    let query = req.query
     if(Object.keys(query).length == 0){
         const pump = await PumpModel.find();
         const resut =  {
             data: pump.reverse()
         }
         res.status(200).send(resut)
 
     
     }  else {
         const filter = req.query;
         const pump =  await PumpModel.find(filter);

         const resut =  {
             data: pump.reverse()
            
         }
       
         res.status(200).send(resut)
     }    
});

const getPump = asyncHandler(async(req,res)=>{
    const pump = await PumpModel.find({productId:req.params.id});
    const resut =  {
        data: pump
    }
    res.status(200).send(resut)
});

const deletePump = asyncHandler(async(req,res)=>{
      await PumpModel.deleteOne({productId:req.params.id});
      res.status(200).send("Deleted Succesfully");
})

module.exports = {
    getPump,
    getPumps,
    deletePump, 
}