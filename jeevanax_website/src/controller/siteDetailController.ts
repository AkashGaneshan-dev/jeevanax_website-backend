import { Request, Response } from "express";
import { PropertyService } from "../services/siteDetailService";

const service = new PropertyService();

export class PropertyController {
    async bulkUpload(req: Request, res: Response): Promise<Response> {
      try {
          const projectDetails = req.body;
          const data = await service.bulkUploadProperty(projectDetails, req.files as Express.Multer.File[]);
        return res.status(200).json({ success: true, data });
      } catch (error) {
        console.error("Bulk Upload Error:", error);
        return res.status(500).json({ success: false, message: "Bulk upload failed", error });
      }
    }

    async create(req: Request, res: Response) {
        try {
            const property = await service.createProperty(
                req.body,
                req.files as Express.Multer.File[]
            );

            res.status(201).json({
                message: "Property created successfully",
                property
            });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
    

  async getAll(req: Request, res: Response) {
    try {
      const properties = await service.getAllProperties();
      res.json(properties);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.body;
      const property = await service.getPropertyById(id);
      if (!property)
        return res.status(404).json({ message: "Property not found" });
      res.json(property);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id, ...updateData } = req.body;

      const newImages = req.files
        ? (req.files as Express.Multer.File[]).map(file => file.path)
        : [];

      if (newImages.length > 0) {
        updateData.images = newImages; // replace or merge with old images as needed
      }

      const property = await service.updateProperty(id, updateData);
      res.json(property);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.body;
      await service.deleteProperty(id);
      res.json({ message: "Property deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
