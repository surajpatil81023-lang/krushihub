import { NextResponse } from "next/server";
import connectDB from "@/app/lib/db";
import User from "@/app/models/User";
// import bcrypt from "bcryptjs"; // Removed for plain text

export async function POST(req: Request) {
    try {
        const { email, password, role } = await req.json();

        if (!email || !password || !role) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        await connectDB();

        const user = await User.findOne({ email, role });
        if (!user) {
            return NextResponse.json({ message: "User not found or role mismatch" }, { status: 404 });
        }

        // const isMatch = await bcrypt.compare(password, user.password); // Removed hashing
        const isMatch = password === user.password; // Plain text check

        if (!isMatch) {
            return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
        }

        // In a production app, we would sign a JWT here.
        // For this MVP, we return the user object (excluding password) to be stored in context/local storage.
        const userWithoutPassword = {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            mobile: user.mobile,
            role: user.role,
            village: user.village,
            district: user.district,
            skills: user.skills,
            expectedWage: user.expectedWage,
        };

        return NextResponse.json({ message: "Login successful", user: userWithoutPassword }, { status: 200 });
    } catch (error) {
        console.error("Login Error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
