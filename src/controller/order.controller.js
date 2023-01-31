const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require('uuid')
const OrderModel = require("../models/order.model")
const CustomerModel = require("../models/customer.model");
const RentProductModel = require("../models/productrent.model")
const getOrders = asyncHandler(async (req, res) => {
    const orders = await OrderModel.find();
    let result = {
        data: orders
    }
    res.status(200).send(result)
}) 
const approvedPast = asyncHandler(async (req,res)=>{
    const order = await OrderModel.find();
    let result = []
   order.map((booked)=>{
    const currentDate = new Date(Date.now())
    const bookedEndDate = new Date(booked.endDate)
    if( bookedEndDate.getTime() < currentDate.getTime() && booked.status == "Approved"){
        result.push(booked)
    }
    
 })
    res.status(201).json({
        message:"Orders Approved and completed", 
        result
    })
});
const approvedOrders = asyncHandler(async (req,res)=>{
    const order = await OrderModel.find();
    let result = [];
   order.map((booked)=>{
    if(booked.status = "Approved"){
        result.push(booked)
    }
    
 })
    res.status(201).json({
        message:"Approved Orders", 
        result
    })
});

const rejectedOrders = asyncHandler(async (req,res)=>{
    const order = await OrderModel.find();
    let result = [];
    console.log(order)
   order.map((booked)=>{
    if(booked.status = "rejected"){
        result.push(booked)
    }
    
 })
    res.status(201).json({
        message:"Rejected Orders", 
        result
    })
});

const activeOrders = asyncHandler(async (req,res)=>{
    const order = await OrderModel.find();
    let result = [];
   order.map((booked)=>{
    const currentDate = new Date(Date.now())
    const bookedEndDate = new Date(booked.endDate)
    const bookedStartDate = new Date(booked.startDate)
    if(bookedEndDate.getTime() >= currentDate.getTime() && bookedStartDate.getTime() <= currentDate.getTime() && booked.status === "Approved"){
        result.push(booked);
    }
    
 })
    res.status(201).json({
        message:"Active Orders", 
        result
    })
});
const scheduledOrders = asyncHandler(async (req,res)=>{
    const order = await OrderModel.find();
    let result = [];
   order.map((booked)=>{
    const currentDate = new Date(Date.now())
    const bookedStartDate = new Date(booked.startDate)
    if(bookedStartDate.getTime() > currentDate.getTime() && booked.status === "Approved" ){
        result.push(booked)
    }
    
 })
    res.status(201).json({
        message:"Scheduled Orders", 
        result
    })
});
const approval = asyncHandler(async (req,res)=>{
    const order = await OrderModel.findOne({ orderId: req.params.orderId});
    const currentDate = new Date(Date.now())
    const bookedStartDate = new Date(order.startDate)
    if( bookedStartDate.getTime() < currentDate.getTime()){
        return res.status(400).send("Order Startdate has passed")
    }
    order.status = "Approved"
    order.save()
    res.status(201).json({
        message:"Order Approved"
    })
});

const rejected = asyncHandler(async (req,res)=>{
    const order = await OrderModel.findOne({ orderId: req.params.orderId});
    order.status = "Rejected"
    order.save()
    res.status(201).json({
        message:"Order Rejected"
    })
});

const pendingOrders = asyncHandler(async (req,res)=>{
    let pending = []
    const order = await OrderModel.find().then((result)=>{
        result.map((order) =>{
            if(order.status = "pending"){
                pending.push(order)
            } 
        })
    
    });
    res.status(201).json({
        message:"Pending Orders",
        data: pending
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
        productName: product.name, 
        productImg:product.files
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
    rejected, 
    approvedPast,
    rejectedOrders,
    activeOrders, 
    scheduledOrders, 
    approvedOrders, 
    pendingOrders 

}