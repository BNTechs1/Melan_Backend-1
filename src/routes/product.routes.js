const express = require("express");
const ProductController = require("../controller/product.controller");
const router = express.Router();
router.get("/get", ProductController.getProducts);
router.get("/overview", ProductController.overView)
router.post("/search", ProductController.searchProducts),
router.get("/filter/:route", ProductController.filter),

module.exports = router;