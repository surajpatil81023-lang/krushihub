import { NextResponse } from "next/server";
import connectDB from "@/app/lib/db";
import MandiRecord from "@/app/models/MandiRecord";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const crop = searchParams.get("crop");

        await connectDB();

        const query: any = {};
        if (crop) {
            query.cropName = { $regex: crop, $options: "i" };
        }

        const records = await MandiRecord.find(query).sort({ date: -1 });

        // Map _id to id
        const formattedRecords = records.map(r => ({
            ...r.toObject(),
            id: r._id.toString()
        }));

        return NextResponse.json(formattedRecords, { status: 200 });
    } catch (error) {
        console.error("Fetch Mandi Records Error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { cropName, minPrice, maxPrice, modalPrice, location, date } = await req.json();

        if (!cropName || !minPrice || !maxPrice || !modalPrice || !location || !date) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        await connectDB();

        const newRecord = await MandiRecord.create({
            cropName,
            minPrice,
            maxPrice,
            modalPrice,
            location,
            date,
        });

        return NextResponse.json(
            { message: "Mandi record added", record: { ...newRecord.toObject(), id: newRecord._id } },
            { status: 201 }
        );
    } catch (error) {
        console.error("Add Mandi Record Error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ message: "ID is required" }, { status: 400 });
        }

        await connectDB();
        await MandiRecord.findByIdAndDelete(id);

        return NextResponse.json({ message: "Record deleted" }, { status: 200 });
    } catch (error) {
        console.error("Delete Mandi Record Error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
