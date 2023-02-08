const express = require("express");
const SparePartController = require("../controller/sparePart.controller");
const router = express.Router();
const SparePartScheama = require("../utils/validation/SparePartSchema.validation");
const { checkSchema } = require('express-validator');
const auth = require("../middleware/auth.middleware")
const multer = require('multer')
const DIR = './public/'
const cloudinary = require("../config/cloudinary")
const SparePartModel = require("../models/sparePart.model");
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
router.post("/create", auth, upload.array("files", 10), checkSchema(SparePartScheama.sparePartSchema), async (req, res, next) => {
    const uploader = async (path) => await cloudinary.uploads(path, "Images")

    const files = req.files;
    const urls = []
    for (const file of files) {
        const { path } = file;
        const newPath = await uploader(path)
        urls.push(newPath)
        // fs.unLinkSync(path)
    }
    const productId = uuidv4()
    const sparePart = new SparePartModel({
        productId: productId,
        sparePartType: req.body.sparePartType,
        subType: req.body.subType,
        sparePartBrand: req.body.sparePartBrand,
        sparePartNumber: req.body.sparePartNumber,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        files: urls,
        searchKeyWord: req.body.sparePartBrand + req.body.sparePartPartNumber + req.body.name + req.body.price,
    });

    sparePart.save().then(result => {

        res.status(201).json({
            message: "Product created successfully!",
            sparePartCreated: {
                productId: productId,
                sparePartType: req.body.sparePartType,
                subType: req.body.subType,
                sparePartBrand: req.body.sparePartBrand,
                sparePartNumber: req.body.sparePartNumber,
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                files: urls,
            }
        })
    }).catch(err => {
        console.log(err),
            res.status(500).json({
                error: err
            });
    })
});

router.put("/update/:id", auth, upload.array("files", 10), checkSchema(SparePartScheama.sparePartSchema), async (req, res) => {
    const uploader = async (path) => await cloudinary.uploads(path)
    const files = req.files;
    const urls = []
    for (const file of files) {
        const { path } = file;
        const newPath = await uploader(path)
        urls.push(newPath)
        // fs.unLinkSync(path)
    }
    let sparePart = await SparePartModel.findOne({ productId: req.params.id });
    sparePart.updateOne(
        {
            $set: {
                sparePartType: req.body.sparePartType,
                subType: req.body.subType,
                sparePartBrand: req.body.sparePartBrand,
                sparePartNumber: req.body.sparePartNumber,
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                files: urls,
                searchKeyWord: req.body.sparePartType + req.body.capacity + req.body.sparePartBrand + req.body.engineBrand + req.body.alterantorBrand + req.body.name + req.body.price,
            }
        },
        {}, { new: true }
    )

    res.status(201).json({
        message: "Product updated successfully!",
        sparePartUpdated: {
            sparePartType: req.body.sparePartType,
            subType: req.body.subType,
            sparePartBrand: req.body.sparePartBrand,
            sparePartNumber: req.body.sparePartNumber,
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            files: urls,
            searchKeyWord: req.body.sparePartType + req.body.sparePartBrand + req.body.subType + sparePartNumber + req.body.name + req.body.price,
        }
    })
})

router.get("/get", SparePartController.getspareParts);
router.get("/show/:id", SparePartController.getsparePart);
router.delete("/delete/:id", auth, SparePartController.deletesparePart);
module.exports = router;