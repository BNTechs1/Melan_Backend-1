const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require('uuid')
const RentProductModel = require("../models/productrent.model");
const OrderModel = require("../models/order.model")
const CustomerModel = require("../models/customer.model");


const getOrders = asyncHandler(async(req,res)=>{
    const orders = await OrderModel.find();     
    const resut =  {
        data: orders
    }
    res.status(200).send(resut)
})
//user mke reservation for the product
const orderProduct = asyncHandler(async (req, res) => {
    const custId = uuidv4();
    const customer = new CustomerModel({
        custId: custId,
        email: req.body.email,
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
    });
    const orderId = uuidv4();
    const reservation = new OrderModel({
        orderId: orderId,
        email: req.body.email,
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        productId: req.body.productId,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        quntity:req.body.quantity,
        status: req.body.status, 
        avaliablity: req.body.avaliablity
    });
    customer.save();
    reservation.save().then(result => {
        res.status(201).json({
            message: "We have recived your reservation request, we will contact you",
            reservationCreated: {
                orderId: result.orderId,
                productId: result.productId,
                custId: result.custId,
                email: result.email,
                name: result.name,
                phoneNumber: result.phoneNumber,
                startDate: result.startDate,
                endDate: result.endDate,
                status: result.status,
                avaliablity:result.avaliablity
            }
        })
    }).catch * (err => {
        console.log(err),
            res.status(500).json({
                error: err
            });
    });
});

const getProducts = asyncHandler(async(req,res)=>{
    const products = await RentProductModel.find();
    const resut =  {
        data: products
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
    orderProduct,
    getProducts,
    getProduct,
    deleteProduct,
    getOrders
}