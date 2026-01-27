import ImageKit from "imagekit";
import multer from "multer";

export default class ImageKitUpload {
    imagekit: ImageKit;
    upload;

    constructor() {
        this.upload = multer({ storage: multer.memoryStorage() });

        this.imagekit = new ImageKit({
            publicKey: "public_Vy/KO5nnDuYlqKeLcRoD6u0utGI=",
            privateKey: "private_lrQrmwSZyKLtX1ZWDXiy7ygzgzs=",
            urlEndpoint: "https://ik.imagekit.io/4qvhyi3iy"
        });
    }

    uploadToImageKit(
        fileBuffer: Buffer,
        fileName: string,
        folder = "jeevanax-sites"
    ) {
        return this.imagekit.upload({
            file: fileBuffer,
            fileName,
            folder
        });
    }

    uploadImagestoMongoDb(req: { files: Express.Multer.File[] }) {
        if (!req.files || req.files.length === 0) return [];

        return Promise.all(
            req.files.map(file =>
                this.uploadToImageKit(
                    file.buffer,
                    file.originalname,
                    "jeevanax-sites"
                )
            )
        );
    }
}
