import { Schema, model, Document } from "mongoose";

interface ISale extends Document {
  saleId: number;
  ProductId: number;
  quantity: number;
  date: Date;
  totalAmount: number;
}

const SaleSchema = new Schema<ISale>({
  saleId: { type: Number, required: true },
  productId: { type: Number, required: true },
  quantity: { type: Number, required: true },
  date: { type: Date, required: true },
  totalAmount: { type: Number, required: true }
});

const Sale = model<ISale>("Sale", SaleSchema,'sale');
export default Sale;
