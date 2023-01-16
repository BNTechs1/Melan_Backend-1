const express = require("express");
const router = express.Router();
const { checkSchema } = require('express-validator');
const auth = require("../middleware/auth.middleware")
const orderController = require("../controller/order.controller")
router.post("/create", orderController.orderProduct)
router.get("/get", auth,orderController.getOrders);
router.get("/pastapproved", auth,orderController.approvedPast);
router.get("/rejectedOrders", auth,orderController.rejectedOrders);
router.get("/activeOrders", auth,orderController.activeOrders);
router.get("/scheduledOrders", auth,orderController.scheduledOrders);
router.get("/approvedOrders", auth, orderController.approvedOrders)
router.put("/approve/:orderId", auth, orderController.approval);
router.put("/reject/:orderId", auth, orderController.rejected);

// router.get("/getproduct", orderController.getProduct)
module.exports = router;