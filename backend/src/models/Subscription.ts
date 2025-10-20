import { Document } from "mongoose";
import { IUser } from "./User";

export interface ISubscription extends Document {
    company: string;
    price: number;
    description?: string;
    image?: string;
    userId: IUser["_id"];
    createdAt: Date;
    updatedAt: Date;
}

