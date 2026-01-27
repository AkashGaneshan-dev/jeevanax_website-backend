import ImageKit from "imagekit";
import multer from "multer";
import 'dotenv/config'; 

export default class ImageKitUpload {
    imagekit: ImageKit;
    upload;

    requireEnv(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Missing environment variable: ${name}`);
        }
        return value;
    }

    constructor() {
        this.upload = multer({ storage: multer.memoryStorage() });

        this.imagekit = new ImageKit({
            publicKey: this.requireEnv('IMAGEKIT_PUBLIC_KEY'),
            privateKey: this.requireEnv('IMAGEKIT_PRIVATE_KEY'),
            urlEndpoint: this.requireEnv('IMAGEKIT_URL_ENDPOINT'),
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
