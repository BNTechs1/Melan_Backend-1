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
      await GeneratorModel.deleteOne({productId:req.params.id});
      res.status(200).send(`Deleted Sucessfully`);
})

module.exports = {
    getGenerator,
    getGenerators,
    deleteGenerator, 
}