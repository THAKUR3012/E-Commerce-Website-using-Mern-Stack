import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

cloudinary.config({
    cloud_name: "diwviu5p3",
    api_key: "427481841532292",
    api_secret: "T2m5NFzCmQLGLsG6WTJTy0M5kwM",
});

const storage = multer.memoryStorage();
export const upload = multer({ storage });

const imageUploadUtils = async (file) => {
    const result = await cloudinary.uploader.upload(file, {
        resource_type: "auto",
    });
    return result;
};

export default imageUploadUtils;
