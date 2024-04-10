import mongoose from "mongoose";

interface UserDocument extends mongoose.Document{
    name:string,
    email:string,
    picture:string,
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    picture: {
        type: String,
    }
}, {
    timestamps: true
})
export const UserModel = mongoose.model<UserDocument>("User",UserSchema)