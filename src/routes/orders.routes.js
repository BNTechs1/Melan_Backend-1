const express = require("express");
const router = express.Router();
const { checkSchema } = require('express-validator');
const auth = require("../middleware/auth.middleware")
const orderController = require("../controller/order.controller")
router.post("/create", auth, orderController.orderProduct)
router.get("/get", orderController.getOrders);
module.exports = router;