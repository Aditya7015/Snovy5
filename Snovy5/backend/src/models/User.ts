import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  isAdmin?: boolean;
  createdAt?: Date;
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  firstName: { type: String, default: "" },
  lastName: { type: String, default: "" },
  isAdmin: { type: Boolean, default: false },
  createdAt: { type: Date, default: () => new Date() }
});

export default model<IUser>("User", UserSchema);
