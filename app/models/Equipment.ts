import mongoose, { Schema, model, models } from "mongoose";

const EquipmentSchema = new Schema(
    {
        name: { type: String, required: true },
        type: { type: String, required: true }, // Tractor, Tiller, etc.
        rentPerDay: { type: Number, required: true },
        location: { type: String, required: true },
        ownerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        available: { type: Boolean, default: true },
    },
    { timestamps: true }
);

const Equipment = models.Equipment || model("Equipment", EquipmentSchema);
export default Equipment;
