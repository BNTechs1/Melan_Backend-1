
const asyncHandler = require("express-async-handler");
const GeneratorModel = require("../models/generator.model");
const PumpModel = require("../models/pump.model");
const SparePartModel = require("../models/sparePart.model");
const GensetModel = require("../models/genset.model");
const AtsModel = require("../models/ats.model");

const getProducts = asyncHandler(async(req,res)=>{
    const generator = await GeneratorModel.find();
    const pump = await PumpModel.find();
    const sparePart = await SparePartModel.find();
    const genset = await GensetModel.find();
    const ats = await AtsModel.find();


    const resut =  { 
        data: generator  + pump + sparePart + genset + ats
    }
    res.status(200).send(resut)
});

module.exports = {
    getProducts,
}