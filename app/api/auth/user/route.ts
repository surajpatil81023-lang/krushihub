import { NextResponse } from "next/server";
import connectDB from "@/app/lib/db";
import User from "@/app/models/User";

export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");

        if (!userId) {
            return NextResponse.json({ message: "User ID is required" }, { status: 400 });
        }

        await connectDB();

        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Account deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Delete Account Error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
