const express = require("express");
const PartnerController = require("../controller/partner.controller");
const router = express.Router();
const PartnerSchema = require("../utils/validation/partnerSchema.validation");
const {checkSchema} = require('express-validator');
const auth = require("../middleware/auth.middleware")
const multer = require('multer')
const DIR = './public/'
const cloudinary = require("../config/cloudinary")
const PartnerModel = require("../models/partner.model");
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
router.post("/create", auth, upload.array("files", 10),checkSchema(PartnerSchema.partnerSchema),  async  (req, res, next)=>{
  const uploader = async(path) => await cloudinary.uploads(path, "Images")
  
    const files = req.files;
    const urls = []
    for (const file of files){
      const { path } = file; 
      const newPath = await uploader(path)
      urls.push(newPath)
      // fs.unLinkSync(path)
    }
    const partnerId = uuidv4()
    const Partner = new PartnerModel({
      partnerId: partnerId,
      name:req.body.name,
      files:urls
    });

    Partner.save().then(result => {

      res.status(201).json({
        message: "Done upload!",
        PartnerCreated: {
          partnerId:result.partnerId,
          name: result.name,
          files: result.files
        }
      })
    }).catch(err => {
      console.log(err),
        res.status(500).json({
          error: err
        });
    })
});

router.put("/update/:id", auth, upload.array("files", 10), checkSchema(PartnerSchema.partnerSchema), async(req,res)=>{
  const uploader = async(path) => await cloudinary.uploads(path)
  const files = req.files;
    const urls = []
    for (const file of files){
      const { path } = file; 
      const newPath = await uploader(path)
      urls.push(newPath)
      // fs.unLinkSync(path)
    }
  let partner = await PartnerModel.findOne({partnerId: req.params.id});
  partner.updateOne(
    {
      $set:{
        name: req.body.name,
        files: urls
      }
    },{new:true}
    )
     
    res.status(201).json({
      message: "Partner updated successfully!",
      PartnerUpdated: {
        name: partner.name,
        files: partner.files
      }
    })
  })

router.get("/get", PartnerController.getPartners);
router.get("/show/:id", PartnerController.getPartner);
router.delete("/delete/:id", auth, PartnerController.deletePartner);

module.exports = router;