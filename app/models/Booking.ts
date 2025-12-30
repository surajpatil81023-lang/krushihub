import mongoose, { Schema, model, models } from "mongoose";

const BookingSchema = new Schema(
    {
        equipmentId: { type: Schema.Types.ObjectId, ref: "Equipment", required: true },
        farmerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        date: { type: String, required: true }, // Storing as string YYYY-MM-DD for simplicity
        status: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending",
        },
    },
    { timestamps: true }
);

const Booking = models.Booking || model("Booking", BookingSchema);
export default Booking;
