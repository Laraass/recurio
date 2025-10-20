import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    image?: string;
    role: "default" | "subscriber" | "admin";
    createdAt: Date;
    updatedAt: Date;
}

