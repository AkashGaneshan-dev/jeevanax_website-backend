import mongoose, { Schema, Document } from "mongoose";
import { version } from "os";

export interface IProperty extends Document {
  siteName: string;
  ownername: string;
  type: string;
  utilities: string;
  size: string;
  price: string;
  yearbuilt: string;
  address: string;
  district: string;
  location: string;
  description: string;
  images: string[];
  bedrooms: string;
  bathrooms: string;
  services: string;
}

const PropertySchema: Schema = new Schema(
  {
    siteName: { type: String, required: true },
    ownername: { type: String },
    type: { type: String },
    utilities: { type: String },
    size: { type: String },
    price: { type: String },
    yearbuilt: { type: String },
    address: { type: String },
    district: { type: String },
    location: { type: String },
    description: { type: String },
    images: [{ type: String }],
    bedrooms: { type: String },
    bathrooms: { type: String },
    services: { type: String },
  },
  { timestamps: true,
     versionKey: false
   }
 
);

export default mongoose.model<IProperty>("Property", PropertySchema);
