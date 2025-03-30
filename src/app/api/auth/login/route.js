import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {dbConnect} from "@/lib/dbConnect";
import User from "@/models/Users";

export async function POST(req) {
    try {
        console.log("➡️ Received Login Request");

        // Ensure DB connection
        await dbConnect();
        console.log("✅ Database Connected");

        // Parse request body
        const { email, password } = await req.json();
        console.log("📩 Received Payload:", { email });

        if (!email || !password) {
            console.error("❌ Missing Email/Password");
            return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
        }

        // Find user in DB
        const user = await User.findOne({ email }).select("username email password");
        console.log("🔍 User Found:", user ? "Yes" : "No");

        if (!user) {
            return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
        }

        // Compare hashed passwords
        const isMatch = await bcrypt.compare(password, user.password);
        console.log("🔑 Password Match:", isMatch);

        if (!isMatch) {
            return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
        }

        // Ensure JWT_SECRET is set
        if (!process.env.JWT_SECRET) {
            console.error("❌ JWT_SECRET is missing in .env.local");
            throw new Error("JWT_SECRET is missing in environment variables.");
        }

        // Generate JWT Token
        console.log("🛠 Generating JWT...");
        const token = jwt.sign(
            { userId: user._id.toString(), username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );
        console.log("🛡️ JWT Token Generated");

        // Send response
        return NextResponse.json({
            message: "Login successful!",
            token,
            user: { username: user.username, email: user.email }
        }, { status: 200 });

    } catch (error) {
        console.error("❌ Login error:", error.message);
        return NextResponse.json({ error: "Server error. Please try again later." }, { status: 500 });
    }
}
