const express = require("express");
const RentProductController = require("../controller/rent.controller");
const router = express.Router();
const RentProductScheama = require("../utils/validation/rentProductSchema.validation");
const { checkSchema } = require('express-validator');
const auth = require("../middleware/auth.middleware")
const multer = require('multer')
const DIR = './public/'
const cloudinary = require("../config/cloudinary")
const ProductRentModel = require("../models/productrent.model");
const { v4: uuidv4 } = require('uuid')
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR)
  }
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png .jpg and .jpeg format are allowed"))
    }
  }
})
// checkSchema(productSchema.productSchema),
router.post("/create", auth, upload.array("files", 10), checkSchema(RentProductScheama.rentProductSchema), async (req, res, next) => {
  const uploader = async (path) => await cloudinary.uploads(path, "Images")

  const files = req.files;
  const urls = []
  for (const file of files) {
    const { path } = file;
    const newPath = await uploader(path)
    urls.push(newPath)
    // fs.unLinkSync(path)
  }
  const productId = uuidv4();
  const rentProducts = new ProductRentModel({
    productId: productId,
    generatorType: req.body.generatorType,
    capacity: req.body.capacity,
    generatorBrand: req.body.generatorBrand,
    engineBrand: req.body.engineBrand,
    alterantorBrand: req.body.alterantorBrand,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    files: urls,
    per: req.body.per,
    minDuration: req.body.minDuration,
    currency: req.body.currency,
    searchKeyWord: req.body.generatorType + req.body.capacity + req.body.generatorBrand + req.body.engineBrand + req.body.alterantorBrand + req.body.name + req.body.price,

  });
  rentProducts.save().then(result => {
    res.status(201).json({
      message: "Product created successfully!",
      productCreated: {
        productId: productId,
        generatorType: result.generatorType,
        capacity: result.capacity,
        generatorBrand: result.generatorBrand,
        engineBrand: result.engineBrand,
        alterantorBrand: result.alterantorBrand,
        name: result.name,
        description: result.description,
        price: result.price,
        files: urls,
        per: result.per,
        minDuration: result.minDuration,
        currency: result.currency,
        searchKeyWord: result.generatorType + result.capacity + result.generatorBrand + result.engineBrand + result.alterantorBrand + result.name + result.price,

      }
    })
  }).catch(err => {
    console.log(err),
      res.status(500).json({
        error: err
      });
  })
});

router.put("/update/:id", auth, upload.array("files", 10), checkSchema(RentProductScheama.rentProductSchema), async (req, res) => {
  const uploader = async (path) => await cloudinary.uploads(path)
  const files = req.files;
  const urls = []
  for (const file of files) {
    const { path } = file;
    const newPath = await uploader(path)
    urls.push(newPath)
    // fs.unLinkSync(path)
  }
  let product = await ProductRentModel.findOne({ productId: req.params.id });
  product.updateOne(
    {
      $set: {
        generatorType: req.body.generatorType,
        capacity: req.body.capacity,
        generatorBrand: req.body.generatorBrand,
        engineBrand: req.body.engineBrand,
        alterantorBrand: req.body.alterantorBrand,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        files: urls,
        per: req.body.per,
        minDuration: req.body.minDuration,
        currency: req.body.currency,
        searchKeyWord: req.body.generatorType + req.body.capacity + req.body.generatorBrand + req.body.engineBrand + req.body.alterantorBrand + req.body.name + req.body.price,
      }
    }, { new: true }
  )

  res.status(201).json({
    message: "Product updated successfully!",
    ProductUpdated: {
      generatorType: req.body.generatorType,
      capacity: req.body.capacity,
      generatorBrand: req.body.generatorBrand,
      engineBrand: req.body.engineBrand,
      alterantorBrand: req.body.alterantorBrand,
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      files: urls,
      per: req.body.per,
      minDuration: req.body.minDuration,
      currency: req.body.currency,
      searchKeyWord: req.body.generatorType + req.body.capacity + req.body.generatorBrand + req.body.engineBrand + req.body.alterantorBrand + req.body.name + req.body.price,
    }
  })
})
router.post("/orderproduct", auth, RentProductController.orderProduct)
router.get("orders")
router.get("/get", RentProductController.getProducts);
router.get("/show/:id", RentProductController.getProduct);
router.delete("/delete/:id", RentProductController.deleteProduct);
module.exports = router;