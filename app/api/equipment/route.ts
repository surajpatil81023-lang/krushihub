import { NextResponse } from "next/server";
import connectDB from "@/app/lib/db";
import Equipment from "@/app/models/Equipment";
import User from "@/app/models/User"; // Import User to populate owner details if needed

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const ownerId = searchParams.get("ownerId");
        const type = searchParams.get("type");
        const location = searchParams.get("location");
        const search = searchParams.get("search");

        await connectDB();

        const query: any = { available: true };

        if (ownerId) {
            query.ownerId = ownerId;
            delete query.available; // Owner sees all their equipment
        }
        if (type && type !== "All Types") {
            query.type = type;
        }
        if (location) {
            query.location = { $regex: location, $options: "i" };
        }
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: "i" } },
                { location: { $regex: search, $options: "i" } }
            ];
        }

        // Populate owner details for display
        const equipment = await Equipment.find(query).sort({ createdAt: -1 }).populate("ownerId", "name mobile email");

        // Transform _id to id and restructure owner info
        const formattedEquipment = equipment.map(item => ({
            ...item.toObject(),
            id: item._id.toString(),
            owner: item.ownerId ? {
                name: item.ownerId.name,
                phone: item.ownerId.mobile,
                email: item.ownerId.email // Optional, assuming email might be added to user later
            } : null,
            ownerId: item.ownerId?._id // Keep original ID reference
        }));

        return NextResponse.json(formattedEquipment, { status: 200 });
    } catch (error) {
        console.error("Fetch Equipment Error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, type, rentPerDay, location, ownerId } = body;

        if (!name || !type || !rentPerDay || !location || !ownerId) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        await connectDB();

        const newEquipment = await Equipment.create({
            name,
            type,
            rentPerDay,
            location,
            ownerId,
            available: true,
        });

        return NextResponse.json(
            { message: "Equipment added successfully", equipment: { ...newEquipment.toObject(), id: newEquipment._id } },
            { status: 201 }
        );
    } catch (error) {
        console.error("Add Equipment Error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ message: "Equipment ID is required" }, { status: 400 });
        }

        await connectDB();
        await Equipment.findByIdAndDelete(id);

        return NextResponse.json({ message: "Equipment deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Delete Equipment Error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
