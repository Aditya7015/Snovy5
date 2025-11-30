import { Schema, model, Document, Types } from "mongoose";

export interface IOrderItem {
  productId: Types.ObjectId;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface IOrderAddress {
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "canceled";

export interface IOrder extends Document {
  userId: Types.ObjectId;
  items: IOrderItem[];
  total: number;
  shippingAddress: IOrderAddress;
  billingAddress: IOrderAddress;
  status: OrderStatus;
  trackingNumber?: string;
  paymentMethod: "cod";
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema = new Schema<IOrderItem>({
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  name: String,
  price: Number,
  quantity: Number,
  image: String,
});

const AddressSchema = new Schema<IOrderAddress>({
  firstName: String,
  lastName: String,
  street: String,
  city: String,
  state: String,
  postalCode: String,
  country: String,
  phone: String,
});

const OrderSchema = new Schema<IOrder>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [OrderItemSchema],
    total: Number,
    shippingAddress: AddressSchema,
    billingAddress: AddressSchema,
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "canceled"],
      default: "pending",
    },
    trackingNumber: String,
    paymentMethod: {
      type: String,
      enum: ["cod"],
      default: "cod",
    },
  },
  { timestamps: true }
);

export default model<IOrder>("Order", OrderSchema);
