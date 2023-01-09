const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require('uuid')
const OrderModel = require("../models/order.model")
const CustomerModel = require("../models/customer.model");
const RentProductModel = require("../models/productrent.model")
const getOrders = asyncHandler(async (req, res) => {
    const orders = await OrderModel.find();


    const resut = {
        data: orders
    }
    res.status(200).send(resut)
}) 

const approval = asyncHandler(async (req,res)=>{
    const { status } = req.body;
    const order = await OrderModel.findOne({ productId: req.body.productId});
    order.updateOne(
        {
            $set:{
                status: status
            }
        }
    )
    res.status(201).json({
        message:"Order Approved"
    })
});

const rejected = asyncHandler(async (req,res)=>{
    const { status } = req.body;
    const order = await OrderModel.findOne({ productId: req.body.productId});
    order.updateOne(
        {
            $set:{
                status: status
            }
        }
    )
    res.status(201).json({
        message:"Order Rejected"
    })
});
//user mke reservation for the product
const orderProduct = asyncHandler(async (req, res) => {
    const { productId, startDate, endDate, quantity } = req.body;
    const custId = uuidv4();
    const customer = new CustomerModel({
        custId: custId,
        email: req.body.email,
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
    });
    const order = await OrderModel.find({ productId: productId, status: "Approved" });
    // console.log("Order", order)
    let Cquantity = 0;
    order.map((booked) => {
        const bookedStartDate = new Date(booked.startDate);
        const bookedEndDate = new Date(booked.endDate);
        const newEndDate = new Date(endDate);
        const newStartDate = new Date(startDate)

        if (bookedEndDate.getTime() >= newStartDate.getTime()
            && bookedEndDate.getTime() <= newEndDate.getTime()
            || bookedStartDate.getTime() >= newStartDate.getTime()
            && bookedStartDate.getTime() <= newEndDate.getTime()) {
            console.log("Booked", booked)
            Cquantity += booked.quantity
        }
    })

    const product = await RentProductModel.findOne({ productId: productId });
    const remainQuantity = product.quantity - Cquantity

    customer.save()
    const orderId = uuidv4();
    const reservation = {
        orderId: orderId,
        email: req.body.email,
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        productId: req.body.productId,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        quantity: req.body.quantity,
    };
    console.log("remainQuantity",remainQuantity)
    if (quantity <= remainQuantity) {
        reservation.avaliablity = "Available"
        const reserved = new OrderModel(reservation);
        reserved.save().then(result => {
            res.status(201).json({
                message: "We have recived your reservation request, we will contact you",
                order
            })
        }).catch * (err => {
            console.log(err),
                res.status(500).json({
                    error: err
                });
        });
    } else {
        reservation.avaliablity = "Not Available"
        const reserved = new OrderModel(reservation);
        reserved.save().then(result => {
            res.status(201).json({
                message: "product not available",
                order
            })
        }).catch * (err => {
            console.log(err),
                res.status(500).json({
                    error: err
                });
        });
    }
});

module.exports = {
    orderProduct,
    getOrders, 
    approval, 
    rejected
}