import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"; //file system used for performing read,write, and other operations on file
 

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINAR_API_KEY, 
    api_secret: process.env.CLOUDINAR_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath)=>{
    try{
        if(!localFilePath) return null
        //upload the file on cloudinary
        const response =await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })
        //file has been uploaded successfully
        console.log("file uploaded on cloudinary ",response.url);
        return response;
    }
catch(error){
    fs.unlinkSync(localFilePath) //remove the locally saved temporary file as the upload operation got failed
    return null;
}
}

export {uploadOnCloudinary}