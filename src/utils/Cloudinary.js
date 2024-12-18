import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFileUrl) => {
    try {
        if (!localFileUrl) return null;
        const cloudinaryResponse = await cloudinary.uploader.upload(localFileUrl,
            {
                resource_type: 'auto'
            }
        )
        console.log(cloudinaryResponse);
        return cloudinaryResponse;
    } catch (error) {
        fs.unlinkSync(localFileUrl); // remove the file from the local server as the uploading failed for some reason
        return null;
    }
}

export {uploadOnCloudinary}