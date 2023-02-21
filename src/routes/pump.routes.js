const express = require("express");
const PumpController = require("../controller/pump.controller");
const router = express.Router();
const PumpScheama = require("../utils/validation/pumpSchema.validation");
const {checkSchema} = require('express-validator');
const auth = require("../middleware/auth.middleware")
const multer = require('multer')
const DIR = './public/'
const cloudinary = require("../config/cloudinary")
const PumpModel = require("../models/pump.model");
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
router.post("/create", auth, upload.array("files", 10),checkSchema(PumpScheama.pumpSchema),  async  (req, res, next)=>{
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
    const key = req.body.pumpType + req.body.motorCapacity + req.body.pumpBrand + req.body.pumpModel + req.body.flowRate + req.body.head + req.body.name + req.body.price
    const Pump = new PumpModel({
      productId: productId,
      pumpType:req.body.pumpType,
      motorCapacity:req.body.motorCapacity,
      pumpBrand:req.body.pumpBrand,
      pumpModel:req.body.pumpModel,
      flowRate:req.body.flowRate,
      head:req.body.head,
      name:req.body.name,
      description:req.body.description,
      price:req.body.price,
      files:urls,
      searchKeyWord: key.toLowerCase()
    });

    Pump.save().then(result => {

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

router.put("/update/:id", auth, upload.array("files", 10), checkSchema(PumpScheama.pumpSchema), async(req,res)=>{
  const uploader = async(path) => await cloudinary.uploads(path)
  const files = req.files;
    const urls = []
    for (const file of files){
      const { path } = file; 
      const newPath = await uploader(path)
      urls.push(newPath)
      // fs.unLinkSync(path)
    }
  let pump = await PumpModel.findOne({productId: req.params.id});
  const key = req.body.pumpType + req.body.motorCapacity + req.body.pumpBrand + req.body.pumpModel + req.body.flowRate + req.body.head + req.body.name + req.body.price

  pump.updateOne(
    {
      $set:{
        pumpType:req.body.pumpType,
      motorCapacity:req.body.motorCapacity,
      pumpBrand:req.body.pumpBrand,
      pumpModel:req.body.pumpModel,
      flowRate:req.body.flowRate,
      head:req.body.head,
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
      message: "Product created successfully!",
    })
});

router.get("/get", PumpController.getPumps);
router.get("/show/:id", PumpController.getPump);
router.delete("/delete/:id", auth, PumpController.deletePump); 
module.exports = router;