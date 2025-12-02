import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../database/cloudinary";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "properties",
    allowed_formats: ["jpg", "jpeg", "png"],
    transformation: [{ quality: "auto", fetch_format: "auto" }]
  } as any
});

const upload = multer({ storage });

export default upload;
