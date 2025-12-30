import mongoose, { Schema, model, models } from "mongoose";

const MandiRecordSchema = new Schema(
    {
        cropName: { type: String, required: true },
        minPrice: { type: Number, required: true },
        maxPrice: { type: Number, required: true },
        modalPrice: { type: Number, required: true },
        location: { type: String, required: true },
        date: { type: String, required: true }, // YYYY-MM-DD
    },
    { timestamps: true }
);

const MandiRecord = models.MandiRecord || model("MandiRecord", MandiRecordSchema);
export default MandiRecord;
