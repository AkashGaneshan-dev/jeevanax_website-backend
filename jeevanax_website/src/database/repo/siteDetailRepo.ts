import Property, { IProperty } from "../models/siteDetailModel";
import imageUploader from "../../middleware/cloudinaryUpload";

const imageuploader = new imageUploader();

export class PropertyRepository {
    async create( data: Partial<IProperty>, files?: Express.Multer.File[] ): Promise<IProperty> {

        let imageUrls: string[] = [];

        if (files && files.length > 0) {
            const uploadResults = await Promise.all(
                files.map(file =>
                    imageuploader.uploadToImageKit(
                        file.buffer,
                        file.originalname,
                        "jeevanax-sites"
                    )
                )
            );

            imageUrls = uploadResults.map((result: { url: any; }) => result.url);
        }

        const propertyData = {
            ...data,
            images: imageUrls
        };

        return await Property.create(propertyData);
    }

  async findAll(): Promise<IProperty[]> {
    return await Property.find();
  }

  async findById(id: string): Promise<IProperty | null> {
    return await Property.findById(id);
  }

  async update(id: string, data: Partial<IProperty>): Promise<IProperty | null> {
    return await Property.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<IProperty | null> {
    return await Property.findByIdAndDelete(id);
  }

    async bulkUpload( reqBody: IProperty[], files: Express.Multer.File[] = [] ) {
        // 1. Upload all images first
        const uploadedImages = await Promise.all(
            files.map(file =>
                imageuploader.uploadToImageKit(
                    file.buffer,
                    file.originalname,
                    "jeevanax-sites"
                )
            )
        );

        // 2. Build documents properly
        const documents = reqBody.map(site => ({
            ...site,
            images: uploadedImages
        }));

        // 3. Insert as array
        return await Property.insertMany(documents, {
            ordered: false
        });
    }
}
