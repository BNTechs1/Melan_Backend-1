const express = require("express");
const GensetController = require("../controller/genset.controller");
const router = express.Router();
const GensetScheama = require("../utils/validation/gensetSchema.validation");
const { checkSchema } = require('express-validator');
const auth = require("../middleware/auth.middleware")
const multer = require('multer')
const DIR = './public/'
const cloudinary = require("../config/cloudinary")
const GensetModel = require("../models/genset.model");
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
router.post("/create", auth, upload.array("files", 10), checkSchema(GensetScheama.gensetSchema), async (req, res, next) => {
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
    const key = req.body.gensetBrand + req.body.gensetPartNumber + req.body.name + req.body.price
    const Genset = new GensetModel({
        productId: productId,
        gensetBrand: req.body.gensetBrand,
        gensetPartNumber: req.body.gensetPartNumber,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        files: urls,
        searchKeyWord: key.toLowerCase()
    });

    Genset.save().then(result => {

        res.status(201).json({
            message: "Product created successfully!",
           
        })
    }).catch(err => {
        console.log(err),
            res.status(500).json({
                error: err
            });
    })
});

router.put("/update/:id", auth, upload.array("files", 10), checkSchema(GensetScheama.gensetSchema), async (req, res) => {
    const uploader = async (path) => await cloudinary.uploads(path)
    const files = req.files;
    const urls = []
    for (const file of files) {
        const { path } = file;
        const newPath = await uploader(path)
        urls.push(newPath)
        // fs.unLinkSync(path)
    }
    let Genset = await GensetModel.findOne({ productId: req.params.id });
    const key = req.body.gensetBrand + req.body.gensetPartNumber + req.body.name + req.body.price
    Genset.updateOne(
        {
            $set: {
                gensetBrand: req.body.gensetBrand,
                gensetPartNumber: req.body.gensetPartNumber,
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                files: urls,
                searchKeyWord: key.toLowerCase()
            }
        },
        {},{ new: true }
    )

    res.status(201).json({
        message: "Product updated successfully!",
        
    })
})

router.get("/get", GensetController.getGensets);
router.get("/show/:id", GensetController.getGenset);
router.delete("/delete/:id", auth,  GensetController.deleteGenset);
module.exports = router;