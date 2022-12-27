const asyncHandler = require("express-async-handler");
const GeneratorModel = require("../models/generator.model");
const getGenerators = asyncHandler(async(req,res)=>{
    const generator = await GeneratorModel.find();
    const resut =  {
        data: generator
    }
    res.status(200).send(resut)
});

const getGenerator = asyncHandler(async(req,res)=>{
    const generator = await GeneratorModel.find({productId:req.params.id});
    const resut =  {
        data: generator
    }
    res.status(200).send(resut)
});

const deleteGenerator = asyncHandler(async(req,res)=>{
    const currentGenerator= await GeneratorModel.find({productId:req.params.id});
      await GeneratorModel.deleteOne({productId:req.params.id});
      res.send(`About ${currentGenerator[0].productId} removed`);
})

module.exports = {
    getGenerator,
    getGenerators,
    deleteGenerator, 
}