import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "./User";

export interface ISubscription extends Document {
  company: string;
  price: number;
  category: string;
  description?: string;
  image?: string;
  userId?: IUser["_id"];
  createdAt: Date;
  updatedAt: Date;
}

const SubscriptionSchema = new Schema<ISubscription>(
  {
    company: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: [
        "Entertainment",
        "Music",
        "Fitness",
        "Cloud",
        "Shopping",
        "News",
        "Productivity",
      ]
    },
    description: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Subscription = mongoose.model<ISubscription>(
  "Subscription",
  SubscriptionSchema
);
