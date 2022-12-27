const asyncHandler = require("express-async-handler");
const PumpModel = require("../models/pump.model");
const getPumps = asyncHandler(async(req,res)=>{
    const pump = await PumpModel.find();
    const resut =  {
        data: pump
    }
    res.status(200).send(resut)
});

const getPump = asyncHandler(async(req,res)=>{
    const pump = await PumpModel.find({productId:req.params.id});
    const resut =  {
        data: pump
    }
    res.status(200).send(resut)
});

const deletePump = asyncHandler(async(req,res)=>{
    const currentPump= await PumpModel.find({productId:req.params.id});
      await PumpModel.deleteOne({productId:req.params.id});
      res.send(`About ${currentPump[0].productId} removed`);
})

module.exports = {
    getPump,
    getPumps,
    deletePump, 
}