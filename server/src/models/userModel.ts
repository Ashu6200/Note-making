import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
    name: string;
    email: string;
    otp: number;
    otpExpiry: Date;
}

const UserSchema: Schema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true, unique: true
    },
    otp: {
        type: String,
    },
    otpExpiry: {
        type: Date
    }
}, {
    timestamps: true
});

const UserModel = mongoose.model<IUser>("User", UserSchema);
export { UserModel, IUser }
