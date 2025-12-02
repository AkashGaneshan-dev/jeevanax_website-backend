import { PropertyRepository } from "../database/repo/siteDetailRepo";
import { IProperty } from "../database/models/siteDetailModel";

const repo = new PropertyRepository();

export class PropertyService {
  async createProperty(data: Partial<IProperty>): Promise<IProperty> {
    return repo.create(data);
  }

  async getAllProperties(): Promise<IProperty[]> {
    return repo.findAll();
  }

  async getPropertyById(id: string): Promise<IProperty | null> {
    return repo.findById(id);
  }

  async updateProperty(id: string, data: Partial<IProperty>): Promise<IProperty | null> {
    return repo.update(id, data);
  }

  async deleteProperty(id: string): Promise<IProperty | null> {
    return repo.delete(id);
  }
}
