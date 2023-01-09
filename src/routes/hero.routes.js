const express = require("express");
const HeroController = require("../controller/hero.controller");
const router = express.Router();
const HeroScheama = require("../utils/validation/heroSchema.validation");
const {checkSchema} = require('express-validator');
const auth = require("../middleware/auth.middleware")
const multer = require('multer')
const DIR = './public/'
const cloudinary = require("../config/cloudinary")
const HeroModel = require("../models/hero.model");
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
router.post("/create", auth, upload.array("files", 10),checkSchema(HeroScheama.heroSchema),  async  (req, res, next)=>{
  const uploader = async(path) => await cloudinary.uploads(path, "Images")
  
    const files = req.files;
    const urls = []
    for (const file of files){
      const { path } = file; 
      const newPath = await uploader(path)
      urls.push(newPath)
      // fs.unLinkSync(path)
    }
    const heroId = uuidv4()
    const Hero = new HeroModel({
      heroId: heroId,
      title:req.body.title,
      description:req.body.description,
      files:urls
    });

    Hero.save().then(result => {

      res.status(201).json({
        message: "Done upload!",
        HeroCreated: {
          heroId:result.heroId,
          name: result.title,
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

router.put("/update/:id", auth, upload.array("files", 10), checkSchema(HeroScheama.heroSchema), async(req,res)=>{
  const uploader = async(path) => await cloudinary.uploads(path)
  const files = req.files;
    const urls = []
    for (const file of files){
      const { path } = file; 
      const newPath = await uploader(path)
      urls.push(newPath)
      // fs.unLinkSync(path)
    }
  let hero = await HeroModel.findOne({heroId: req.params.id});
  hero.updateOne(
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
      message: "Hero updated successfully!",
      HeroUpdated: {
        title: hero.title,
        description:hero.description,
        files: hero.files
      }
    })
  })

router.get("/get", HeroController.getHeros);
router.get("/show/:id", HeroController.getHero);
router.delete("/delete/:id", auth, HeroController.deleteHero);

module.exports = router;