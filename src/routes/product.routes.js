const express = require("express");
const ProductController = require("../controller/product.controller");
const router = express.Router();
router.get("/get", ProductController.getProducts);
module.exports = router;