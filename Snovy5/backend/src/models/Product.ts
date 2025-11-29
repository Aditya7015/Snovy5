import { Schema, model, Document } from "mongoose";


export interface IProduct extends Document {
  name: string;
  description?: string;
  price: number;
  images: string[]; // URLs or /uploads/...
  category?: string;
  stock?: number;
  createdAt?: Date;
  slug?: string;
}

const ProductSchema = new Schema<IProduct>({
  name: { type: String, required: true, trim: true },
  description: { type: String, default: "" },
  price: { type: Number, required: true, default: 0 },
  images: { type: [String], default: [] },
  category: { type: String, default: "" },
  stock: { type: Number, default: 0 },
  createdAt: { type: Date, default: () => new Date() },
  slug: { type: String, index: true }
});

// optional: create a simple slug pre-save
ProductSchema.pre("save", async function () {
  if (!this.slug && this.name) {
    this.slug = this.name.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");
  }
  
});

export default model<IProduct>("Product", ProductSchema);
