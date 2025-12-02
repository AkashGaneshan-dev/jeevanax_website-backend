import { Request, Response } from "express";
import { PropertyService } from "../services/siteDetailService";

const service = new PropertyService();

export class PropertyController {
  async create(req: Request, res: Response) {
    try {
      // Cloudinary URLs come in as file.path
      const imageUrls = req.files
        ? (req.files as Express.Multer.File[]).map(file => file.path)
        : [];

      const data = { ...req.body, images: imageUrls };
      const property = await service.createProperty(data);

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
