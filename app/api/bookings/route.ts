import { NextResponse } from "next/server";
import connectDB from "@/app/lib/db";
import Booking from "@/app/models/Booking";
import Equipment from "@/app/models/Equipment";
import User from "@/app/models/User";

export async function POST(req: Request) {
    try {
        const { equipmentId, farmerId, date } = await req.json();

        if (!equipmentId || !farmerId || !date) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        await connectDB();

        const newBooking = await Booking.create({
            equipmentId,
            farmerId,
            date,
            status: "pending",
        });

        return NextResponse.json(
            { message: "Booking request created", booking: { ...newBooking.toObject(), id: newBooking._id } },
            { status: 201 }
        );
    } catch (error) {
        console.error("Create Booking Error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const { bookingId, status } = await req.json();

        if (!bookingId || !status) {
            return NextResponse.json({ message: "Booking ID and status are required" }, { status: 400 });
        }

        if (!["approved", "rejected"].includes(status)) {
            return NextResponse.json({ message: "Invalid status" }, { status: 400 });
        }

        await connectDB();

        const updatedBooking = await Booking.findByIdAndUpdate(bookingId, { status }, { new: true });

        if (!updatedBooking) {
            return NextResponse.json({ message: "Booking not found" }, { status: 404 });
        }

        return NextResponse.json({ message: `Booking ${status}`, booking: updatedBooking }, { status: 200 });

    } catch (error) {
        console.error("Update Booking Error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

// Optional: GET to list bookings for a farmer or owner
export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const farmerId = searchParams.get("farmerId");
        const ownerId = searchParams.get("ownerId");

        await connectDB();

        let query: any = {};
        if (farmerId) {
            query.farmerId = farmerId;
        } else if (ownerId) {
            const equipments = await Equipment.find({ ownerId });
            const equipmentIds = equipments.map(eq => eq._id);
            query.equipmentId = { $in: equipmentIds };
        }

        const bookings = await Booking.find(query)
            .populate("equipmentId", "name type location rentPerDay")
            .populate("farmerId", "name mobile")
            .sort({ createdAt: -1 });

        const formattedBookings = bookings.map(b => {
            const obj = b.toObject();
            return {
                ...obj,
                id: b._id.toString(),
                date: b.date,
                status: b.status,
                farmerId: b.farmerId && b.farmerId._id ? b.farmerId._id.toString() : (obj.farmerId ? obj.farmerId.toString() : obj.farmerId),
                farmerName: b.farmerId?.name,
                equipmentId: b.equipmentId && b.equipmentId._id ? b.equipmentId._id.toString() : (obj.equipmentId ? obj.equipmentId.toString() : obj.equipmentId),
                equipmentName: b.equipmentId?.name,
            };
        });

        return NextResponse.json(formattedBookings, { status: 200 });
    } catch (error) {
        console.error("Fetch Bookings Error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
