import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  id: number;
  name: string;
  nameEn: string;
  category: string;
  description: string;
  descriptionEn: string;
  price: number;
  image: string;
  available: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema = new Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    nameEn: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['빵', '떡', '전통 과자'],
    },
    description: {
      type: String,
      required: true,
    },
    descriptionEn: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    image: {
      type: String,
      required: true,
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IProduct>('Product', ProductSchema);
