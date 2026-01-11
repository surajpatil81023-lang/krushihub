import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        mobile: { type: String, required: true },
        password: { type: String, required: true },
        role: {
            type: String,
            enum: ["farmer", "labourer", "equipment_owner", "admin", "guest"],
            default: "guest",
        },
        // Common fields
        village: { type: String },
        district: { type: String },

        // Labourer specific
        skills: { type: [String], default: [] },
        expectedWage: { type: Number },
    },
    { timestamps: true }
);

const User = models.User || model("User", UserSchema);
export default User;
