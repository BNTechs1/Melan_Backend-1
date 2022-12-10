const express = require("express");
const AtsController = require("../controller/Ats.controller");
const router = express.Router();
const AtsScheama = require("../utils/validation/atsSchema.validation");
const {checkSchema} = require('express-validator');
const auth = require("../middleware/auth.middleware")
const multer = require('multer')
const DIR = './public/'
const cloudinary = require("../config/cloudinary")
const AtsModel = require("../models/Ats.model");
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
router.post("/create", auth, upload.array("files", 10),checkSchema(AtsScheama.atsSchema),  async  (req, res, next)=>{
  const uploader = async(path) => await cloudinary.uploads(path, "Images")
  
    const files = req.files;
    const urls = []
    for (const file of files){
      const { path } = file; 
      const newPath = await uploader(path)
      urls.push(newPath)
      // fs.unLinkSync(path)
    }
    const atsId = uuidv4()
    const Ats = new AtsModel({
      atsId: atsId,
      atsRange:req.body.atsRange,
      amp:req.body.amp,
      name:req.body.name,
      description:req.body.description,
      price:req.body.price,
      files:urls,
      searchKeyWord: req.body.atsRange + req.body.amp + req.body.name + req.body.price,
    });

    Ats.save().then(result => {

      res.status(201).json({
        message: "Product created successfully!",
        AtsCreated: {
            atsId: atsId,
      atsRange:req.body.atsRange,
      amp:req.body.amp,
      name:req.body.name,
      description:req.body.description,
      price:req.body.price,
      files:urls,
      searchKeyWord: req.body.atsRange + req.body.amp + req.body.name + req.body.price,
        }
      })
    }).catch(err => {
      console.log(err),
        res.status(500).json({
          error: err
        });
    })
});

router.put("/update/:id", auth, upload.array("files", 10), checkSchema(AtsScheama.AtsSchema), async(req,res)=>{
  const uploader = async(path) => await cloudinary.uploads(path)
  const files = req.files;
    const urls = []
    for (const file of files){
      const { path } = file; 
      const newPath = await uploader(path)
      urls.push(newPath)
      // fs.unLinkSync(path)
    }
  let Ats = await AtsModel.findOne({AtsId: req.params.id});
  Ats.updateOne(
    {
      $set:{
        atsRange:req.body.atsRange,
      amp:req.body.amp,
      name:req.body.name,
      description:req.body.description,
      price:req.body.price,
      files:urls,
      searchKeyWord: req.body.atsRange + req.body.amp + req.body.name + req.body.price,
      }
    },{new:true}
    )
     
    res.status(201).json({
      message: "Product updated successfully!",
      GeneratorUpdated: {
        AtsType:result.AtsType,
        atsRange:req.body.atsRange,
        amp:req.body.amp,
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        files:urls,
        searchKeyWord: req.body.atsRange + req.body.amp + req.body.name + req.body.price,
      }
    })
  })

router.get("/get", AtsController.getAtss);
router.get("/show/:id", AtsController.getAts);
router.delete("/delete/:id", AtsController.deleteAts); 
module.exports = router;