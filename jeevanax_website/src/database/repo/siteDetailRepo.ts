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

  async bulkUpload(projectDetails: IProperty[]): Promise<{}> {
        try {
            const data = await Property.insertMany(projectDetails, { ordered: false, rawResult: true });
            return data;
        }
        catch (err: any) {
            console.error('Bulk upload failed. name:', err?.name, 'message:', err?.message);
            // Bulk write errors
            if (err?.writeErrors) {
                console.error('writeErrors:', err.writeErrors.map((e: any) => ({
                    index: e.index,
                    code: e.code,
                    errmsg: e.errmsg
                })));
            }
            // Mongo duplicate key
            if (err?.code === 11000) {
                console.error('Duplicate key error detail:', err.keyValue);
            }
            throw err;
        }
    }
}
