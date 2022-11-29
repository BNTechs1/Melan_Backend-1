const express = require("express");
const router = express.Router();
const serviceSchema = require("../../src/utils/validation/serviceSchema.validation")
const ServiceController = require("../controller/service.controller")
const {checkSchema} = require('express-validator');
const authorize = require("../middleware/auth.middleware")
router.post("/create", authorize, checkSchema(serviceSchema.serviceSchema),ServiceController.createService);
router.get("/get",  checkSchema(serviceSchema.serviceSchema),ServiceController.getServices);
router.get("/show/:id",  checkSchema(serviceSchema.serviceSchema),ServiceController.getService);
router.put("/update/:id", authorize, checkSchema(serviceSchema.serviceSchema),ServiceController.updateService);
router.delete("/delete/:id", authorize, checkSchema(serviceSchema.serviceSchema),ServiceController.deleteService);

module.exports = router;