import Property, { IProperty } from "../models/siteDetailModel";

export class PropertyRepository {
  async create(data: Partial<IProperty>): Promise<IProperty> {
    return await Property.create(data);
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
}
