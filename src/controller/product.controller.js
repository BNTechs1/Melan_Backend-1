
const asyncHandler = require("express-async-handler");
const GeneratorModel = require("../models/generator.model");
const PumpModel = require("../models/pump.model");
const SparePartModel = require("../models/sparePart.model");
const GensetModel = require("../models/genset.model");
const AtsModel = require("../models/ats.model");

const getProducts = asyncHandler(async(req,res)=>{
    let products = [];
    const generator = await GeneratorModel.find().then((result)=>{
        result.map((product)=>{
            products.push(product);
        })
    });
    const pump = await PumpModel.find().then((result)=>{
        result.map((product)=>{
            products.push(product);
        })
    });
    const sparePart = await SparePartModel.find().then((result)=>{
        result.map((product)=>{
            products.push(product);
        })
    });;
    const genset = await GensetModel.find().then((result)=>{
        result.map((product)=>{
            products.push(product);
        })
    });;
    const ats = await AtsModel.find().then((result)=>{
        result.map((product)=>{
            products.push(product);
        })
    });;

    const resut =  { 
        data: products 
    }
    // console.log(resut)
    res.status(200).send(resut)
});

module.exports = {
    getProducts,
}