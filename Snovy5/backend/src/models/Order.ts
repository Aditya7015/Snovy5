// import { Schema, model, Document } from "mongoose";

// export interface IOrderItem {
//   productId: string;
//   name?: string;
//   price?: number;
//   qty?: number;
//   image?: string;
// }

// export interface IOrder extends Document {
//   userId: string;
//   items: IOrderItem[];
//   total: number;
//   createdAt?: Date;
// }

// const OrderItemSchema = new Schema<IOrderItem>({
//   productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
//   name: String,
//   price: Number,
//   qty: { type: Number, default: 1 },
//   image: String
// }, { _id: false });

// const OrderSchema = new Schema<IOrder>({
//   userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
//   items: { type: [OrderItemSchema], required: true, default: [] },
//   total: { type: Number, required: true, default: 0 },
//   createdAt: { type: Date, default: () => new Date() }
// });

// export default model<IOrder>("Order", OrderSchema);
