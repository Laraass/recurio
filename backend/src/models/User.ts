import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    image?: string;
    role: "default" | "subscriber" | "admin";
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: true,
            trim: true,  
        },
         email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        image: {
            type: String,
            default: function (this: IUser) {
                const baseUrl = "https://ui-avatars.com/api/"
                const userName = encodeURIComponent(this.name || "User")
                return `${baseUrl}?name=${userName}&background=random&color=0a0a0a`
            }
        }
    },
    { timestamps: true },
       
);

export const User = mongoose.model<IUser>("User", UserSchema)