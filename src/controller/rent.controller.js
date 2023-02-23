const asyncHandler = require("express-async-handler");
const RentProductModel = require("../models/productrent.model");

const getProducts = asyncHandler(async(req,res)=>{
    const products = await RentProductModel.find();
    console.log("products",products)
    const resut =  {
        data: products.reverse()
    }
    res.status(200).send(resut)
});

const getProduct = asyncHandler(async(req,res)=>{
    const product = await RentProductModel.find({productId:req.params.id});
    const resut =  {
        data: product
    }
    res.status(200).send(resut)
});

const deleteProduct = asyncHandler(async(req,res)=>{
      await RentProductModel.deleteOne({productId:req.params.id});
      res.status(200).send(`Deleted Successfully`);
})

module.exports = {
    getProducts,
    getProduct,
    deleteProduct,
}