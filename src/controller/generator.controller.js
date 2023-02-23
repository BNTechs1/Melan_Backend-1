const asyncHandler = require("express-async-handler");
const GeneratorModel = require("../models/generator.model");
const getGenerators = asyncHandler(async(req,res)=>{
//    console.log("req",req)
   let query = req.query
    if(Object.keys(query).length == 0){
        const generator = await GeneratorModel.find();
        const resut =  {
            data: generator.reverse()
        }
        res.status(200).send(resut)

    
    }  else {
        const filter = req.query;
        const generator =  await GeneratorModel.find(filter);
        const resut =  {
            data: generator.reverse()
        }
        res.status(200).send(resut)
    }    
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

const filterByCapacity = asyncHandler(async (req,res)=>{
    const { capacity } = req.body
   
    const generator =  await GeneratorModel.find({capacity: capacity});
    const resut =  {
        data: generator
    }
    res.status(200).send(resut)
})

const filterByGeneratorType = asyncHandler(async (req,res)=>{
    const {generatorType} = req.body;
    const generator =  await GeneratorModel.find({generatorType: generatorType});
    const resut =  {
        data: generator
    }
    res.status(200).send(resut)
})

const filterByGeneratorBrand = asyncHandler(async (req,res)=>{
    const {generatorBrand} = req.body;
    const generator =  await GeneratorModel.find({generatorBrand: generatorBrand});
    const resut =  {
        data: generator
    }
    res.status(200).send(resut)
})

module.exports = {
    getGenerator,
    getGenerators,
    deleteGenerator, 
    filterByCapacity,
    filterByGeneratorType, 
    filterByGeneratorBrand
}