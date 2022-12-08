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
    const generator = await GeneratorModel.find({generatorId:req.params.id});
    const resut =  {
        data: generator
    }
    res.status(200).send(resut)
});

const deleteGenerator = asyncHandler(async(req,res)=>{
    const currentAbout= await AboutModel.find({aboutId:req.params.id});
      await AboutModel.deleteOne({aboutId:req.params.id});
      res.send(`About ${currentHero[0].aboutId} removed`);
})

module.exports = {
    getGenerator,
    getGenerators,
    deleteGenerator, 
}