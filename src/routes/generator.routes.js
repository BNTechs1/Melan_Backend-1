const express = require("express");
const GeneratorController = require("../controller/generator.controller");
const router = express.Router();
const GeneratorScheama = require("../utils/validation/generatorSchema.validation");
const {checkSchema} = require('express-validator');
const auth = require("../middleware/auth.middleware")
const multer = require('multer')
const DIR = './public/'
const cloudinary = require("../config/cloudinary")
const GeneratorModel = require("../models/generator.model");
const {v4 : uuidv4} = require('uuid')
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, DIR)
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) =>{
        if(file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" ){
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error("Only .png .jpg and .jpeg format are allowed"))
        }
    }
})
// checkSchema(productSchema.productSchema),
router.post("/create", auth, upload.array("files", 10),checkSchema(GeneratorScheama.generatorSchema),  async  (req, res, next)=>{
  const uploader = async(path) => await cloudinary.uploads(path, "Images")
  
    const files = req.files;
    const urls = []
    for (const file of files){
      const { path } = file; 
      const newPath = await uploader(path)
      urls.push(newPath)
      // fs.unLinkSync(path)
    }
    const productId = uuidv4()
    const key = req.body.generatorType + req.body.capacity + req.body.generatorBrand + req.body.engineBrand + req.body.alterantorBrand + req.body.name + req.body.price
    const Generator = new GeneratorModel({
      productId: productId,
      generatorType:req.body.generatorType,
      capacity:req.body.capacity,
      generatorBrand:req.body.generatorBrand,
      engineBrand:req.body.engineBrand,
      alterantorBrand:req.body.alterantorBrand,
      name:req.body.name,
      description:req.body.description,
      price:req.body.price,
      files:urls,
      searchKeyWord: key.toLowerCase()
    });

    Generator.save().then(result => {

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

router.put("/update/:id", auth, upload.array("files", 10), checkSchema(GeneratorScheama.generatorSchema), async(req,res)=>{
  const uploader = async(path) => await cloudinary.uploads(path)
  const files = req.files;
    const urls = []
    for (const file of files){
      const { path } = file; 
      const newPath = await uploader(path)
      urls.push(newPath)
      // fs.unLinkSync(path)
    }
  let generator = await GeneratorModel.findOne({productId: req.params.id});
  const key = req.body.generatorType + req.body.capacity + req.body.generatorBrand + req.body.engineBrand + req.body.alterantorBrand + req.body.name + req.body.price
  generator.updateOne(
    {
      $set:{
        generatorType:req.body.generatorType,
        capacity:req.body.capacity,
        generatorBrand:req.body.generatorBrand,
        engineBrand:req.body.engineBrand,
        alterantorBrand:req.body.alterantorBrand,
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        files:urls,
        searchKeyWord: key.toLowerCase()
      }
    },
    {},{new:true}
    )
     
    res.status(201).json({
      message: "Product updated successfully!",
    })
  })

router.get("/get", GeneratorController.getGenerators);
router.get("/show/:id", GeneratorController.getGenerator);
router.delete("/delete/:id", auth, GeneratorController.deleteGenerator); 
module.exports = router;