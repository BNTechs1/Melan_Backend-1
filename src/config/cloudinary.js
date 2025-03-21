const cloudinary = require('cloudinary')
const dotenv = require("dotenv")

dotenv.config();


cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

exports.uploads  = (file, folder) => {
    return new Promise (reslove =>{
        cloudinary.uploader.upload(file, (result)=>{
            reslove({
                url: result.url, 
                id: result.public_id
            },{
                resource_type:"auto", 
                folder:folder
            } 
            )
        })
    })
}