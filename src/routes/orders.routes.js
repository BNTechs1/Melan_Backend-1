const express = require("express");
const router = express.Router();
const { checkSchema } = require('express-validator');
const auth = require("../middleware/auth.middleware")
const orderController = require("../controller/order.controller")
router.post("/create", orderController.orderProduct)
router.get("/get", orderController.getOrders);
router.get("/approve", orderController.approval);
router.get("/reject", orderController.rejected);

// router.get("/getproduct", orderController.getProduct)
module.exports = router;