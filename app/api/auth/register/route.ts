import { NextResponse } from "next/server";
import connectDB from "@/app/lib/db";
import User from "@/app/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    try {
        const { name, mobile, password, role, village, district, skills, expectedWage } = await req.json();

        if (!name || !mobile || !password || !role) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        await connectDB();

        const existingUser = await User.findOne({ mobile });
        if (existingUser) {
            return NextResponse.json({ message: "User already exists with this mobile number" }, { status: 409 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            mobile,
            password: hashedPassword,
            role,
            village,
            district,
            skills,
            expectedWage,
        });

        return NextResponse.json(
            { message: "User registered successfully", userId: newUser._id },
            { status: 201 }
        );
    } catch (error) {
        console.error("Registration Error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
