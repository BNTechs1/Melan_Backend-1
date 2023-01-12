const express = require("express");
const router = express.Router();
const { checkSchema } = require('express-validator');
const auth = require("../middleware/auth.middleware")
const orderController = require("../controller/order.controller")
router.post("/create", orderController.orderProduct)
router.get("/get", auth,orderController.getOrders);
router.put("/approve", auth, orderController.approval);
router.put("/reject", auth, orderController.rejected);

// router.get("/getproduct", orderController.getProduct)
module.exports = router;