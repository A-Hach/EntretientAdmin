import { Document, Schema, model } from "mongoose";

export interface IProduct extends Document {
  productId: number;
  productName: string;
  category: string;
  price: number;
}

const productSchema = new Schema<IProduct>({
  productId: { type: Number, required: true },
  productName: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true }
});

const Product = model<IProduct>("Product", productSchema, "product");
export default Product;

