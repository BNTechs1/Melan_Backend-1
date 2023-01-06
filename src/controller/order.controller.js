const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require('uuid')
const OrderModel = require("../models/order.model")
const CustomerModel = require("../models/customer.model");

const getOrders = asyncHandler(async (req, res) => {
    const orders = await OrderModel.find();


    const resut = {
        data: orders
    }
    res.status(200).send(resut)
})
//user mke reservation for the product
const orderProduct = asyncHandler(async (req, res) => {
    const { productId, startDate, endDate } = req.body;
    const custId = uuidv4();
    const customer = new CustomerModel({
        custId: custId,
        email: req.body.email,
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
    });
    const order = await OrderModel.find({ productId: productId });
    // console.log("Order", order)
    const Cquantity = 0;
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

    const orderId = uuidv4();
    const reservation = new OrderModel({
        orderId: orderId,
        email: req.body.email,
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        productId: req.body.productId,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        quantity: req.body.quantity,
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
                quantity:result.quantity,
                email: result.email,
                availablity: result.availablity,
            }
        })
    }).catch * (err => {
        console.log(err),
            res.status(500).json({
                error: err
            });
    });
});

module.exports = {
    orderProduct,
    getOrders
}