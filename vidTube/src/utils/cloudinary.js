import { v2 as cloudinary } from "cloudinary"
import fs from "fs"
import dotenv from "dotenv"

dotenv.config()
//step 1 : configure the cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        const responce = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        console.log("File uploaded on cloudinary File Src : ", responce.url)
        fs.unlinkSync(localFilePath)
        return responce
    } catch (error) {
        console.log("Upload Failed On Cloudinary", error)
        fs.unlinkSync(localFilePath);
        return null
    }
}


export { uploadOnCloudinary }