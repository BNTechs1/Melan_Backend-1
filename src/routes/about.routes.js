const express = require("express");
const AboutController = require("../controller/about.controller");
const router = express.Router();
const AboutScheama = require("../utils/validation/aboutSchema.validation");
const {checkSchema} = require('express-validator');
const auth = require("../middleware/auth.middleware")
const multer = require('multer')
const DIR = './public/'
const cloudinary = require("../config/cloudinary")
const AboutModel = require("../models/about.model");
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
router.post("/create", auth, upload.array("files", 10),checkSchema(AboutScheama.aboutSchema),  async  (req, res, next)=>{
  const uploader = async(path) => await cloudinary.uploads(path, "Images")
  
    const files = req.files;
    const urls = []
    for (const file of files){
      const { path } = file; 
      const newPath = await uploader(path)
      urls.push(newPath)
      // fs.unLinkSync(path)
    }
    const aboutId = uuidv4()
    const About = new AboutModel({
      aboutId: aboutId,
      title:req.body.title,
      description:req.body.description,
      files:urls
    });

    About.save().then(result => {

      res.status(201).json({
        message: "Done upload!",
        AboutCreated: {
          aboutId:result.heroId,
          title: result.title,
          description:result.description,
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

router.put("/update/:id", auth, upload.array("files", 10), checkSchema(AboutScheama.aboutSchema), async(req,res)=>{
  const uploader = async(path) => await cloudinary.uploads(path)
  const files = req.files;
    const urls = []
    for (const file of files){
      const { path } = file; 
      const newPath = await uploader(path)
      urls.push(newPath)
      // fs.unLinkSync(path)
    }
  let about = await AboutModel.findOne({aboutId: req.params.id});
  about.updateOne(
    {
      $set:{
        title: req.body.title,
        description: req.body.description, 
        files: urls
      }
    },
    {},{new:true}
    )
     
    res.status(201).json({
      message: "About updated successfully!",
      AboutUpdated: {
        title: about.title,
        description:about.description,
        files: about.files
      }
    })
  })

router.get("/get", AboutController.getAbouts);
router.get("/show/:id", AboutController.getAbout);
router.delete("/delete/:id", AboutController.deleteAbout);

module.exports = router;