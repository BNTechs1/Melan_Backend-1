const express = require("express");
const controllerController = require("../controller/controller.controller");
const router = express.Router();
const controllerScheama = require("../utils/validation/controllerSchema.validation");
const { checkSchema } = require('express-validator');
const auth = require("../middleware/auth.middleware")
const multer = require('multer')
const DIR = './public/'
const cloudinary = require("../config/cloudinary")
const controllerModel = require("../models/controller.model");
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
router.post("/create", auth, upload.array("files", 10), checkSchema(controllerScheama.controllerSchema), async (req, res, next) => {
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
    const key = req.body.controllerBrand + req.body.controllerModel + req.body.name + req.body.price
    const controller = new controllerModel({
        productId: productId,
        controllerBrand: req.body.controllerBrand,
        controllerModel: req.body.controllerModel,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        files: urls,
        searchKeyWord: key.toLowerCase()
    });

    controller.save().then(result => {

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

router.put("/update/:id", auth, upload.array("files", 10), checkSchema(controllerScheama.controllerSchema), async (req, res) => {
    const uploader = async (path) => await cloudinary.uploads(path)
    const files = req.files;
    const urls = []
    for (const file of files) {
        const { path } = file;
        const newPath = await uploader(path)
        urls.push(newPath)
        // fs.unLinkSync(path)
    }
    let controller = await controllerModel.findOne({ productId: req.params.id });
    const key = req.body.controllerBrand + req.body.controllerModel + req.body.name + req.body.price
    controller.updateOne(
        {
            $set: {
                controllerBrand: req.body.controllerBrand,
                controllerModel: req.body.controllerModel,
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

router.get("/get", controllerController.getControllers);
router.get("/show/:id", controllerController.getController);
router.delete("/delete/:id", auth,  controllerController.deleteController);
module.exports = router;