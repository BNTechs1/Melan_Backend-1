const express = require("express");
const OtherController = require("../controller/other.controller");
const router = express.Router();
const OtherSchema = require("../utils/validation/otherSchema.validation");
const {checkSchema} = require('express-validator');
const auth = require("../middleware/auth.middleware")
const multer = require('multer')
const DIR = './public/'
const cloudinary = require("../config/cloudinary")
const otherModel = require("../models/other.model");
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
router.post("/create", auth, upload.array("files", 10),checkSchema(OtherSchema.otherSchema),  async  (req, res, next)=>{
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
    const key = req.body.name + req.body.price
    const others = new otherModel({
      productId: productId,
      name:req.body.name,
      description:req.body.description,
      price:req.body.price,
      files:urls,
      searchKeyWord:  key.toLowerCase()
    });

    others.save().then(result => {

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

router.put("/update/:id", auth, upload.array("files", 10), checkSchema(OtherSchema.otherSchema), async(req,res)=>{
  const uploader = async(path) => await cloudinary.uploads(path)
  const files = req.files;
    const urls = []
    for (const file of files){
      const { path } = file; 
      const newPath = await uploader(path)
      urls.push(newPath)
      // fs.unLinkSync(path)
    }
  let other = await otherModel.findOne({productId: req.params.id});
  // console.log("Ats is here")
  const key = req.body.name + req.body.price
  other.updateOne(
    {
      $set:{
        name:req.body.name,
      description:req.body.description,
      price:req.body.price,
      files:urls,
      searchKeyWord:  key.toLowerCase()
      },

    },
      {},
      {new:true}, 
    )
     
    res.status(201).json({
      message: "Product updated successfully!",
      
    })
  })
router.get("/get", OtherController.getOthers);
router.get("/show/:id", OtherController.getOther);
router.delete("/delete/:id", auth, OtherController.deleteOthers); 
module.exports = router;