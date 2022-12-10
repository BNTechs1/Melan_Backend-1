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
    const pump = await PumpModel.find({pumpId:req.params.id});
    const resut =  {
        data: pump
    }
    res.status(200).send(resut)
});

const deletePump = asyncHandler(async(req,res)=>{
    const currentPump= await PumpModel.find({pumpId:req.params.id});
      await PumpModel.deleteOne({pumpId:req.params.id});
      res.send(`About ${currentPump[0].pumpId} removed`);
})

module.exports = {
    getPump,
    getPumps,
    deletePump, 
}