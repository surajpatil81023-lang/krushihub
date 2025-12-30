import { NextResponse } from "next/server";
import connectDB from "@/app/lib/db";
import User from "@/app/models/User";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const district = searchParams.get("district");
        const village = searchParams.get("village");
        const skill = searchParams.get("skill");

        await connectDB();

        const query: any = { role: "labourer" };

        if (district) {
            query.district = { $regex: district, $options: "i" };
        }
        if (village) {
            query.village = { $regex: village, $options: "i" };
        }
        if (skill) {
            query.skills = { $in: [new RegExp(skill, "i")] };
        }

        const labourers = await User.find(query).select("-password").sort({ createdAt: -1 });

        return NextResponse.json(labourers, { status: 200 });
    } catch (error) {
        console.error("Fetch Labourers Error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const body = await req.json();
        const { id, ...updateData } = body;

        if (!id) {
            return NextResponse.json({ message: "User ID is required" }, { status: 400 });
        }

        await connectDB();

        // Security check: In a real app, verify that the requester owns this profile
        const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true }).select("-password");

        if (!updatedUser) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        // Map _id to id for frontend consistency
        const userResponse = {
            ...updatedUser.toObject(),
            id: updatedUser._id.toString()
        };

        return NextResponse.json({ message: "Profile updated", user: userResponse }, { status: 200 });

    } catch (error) {
        console.error("Update Profile Error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
