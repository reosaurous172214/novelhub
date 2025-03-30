import { dbConnect } from "@/lib/dbConnect";
import User from "@/models/Users";
import bcrypt from "bcryptjs";

export async function POST(req) {
    await dbConnect(); // Ensure MongoDB is connected

    try {
        const { username, email, password } = await req.json();

        // Check for missing fields
        if (!username || !email || !password) {
            return Response.json({ error: "All fields are required" }, { status: 400 });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return Response.json({ error: "User already exists" }, { status: 409 });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, email, password: hashedPassword });

        return Response.json({ message: "User registered successfully!", userId: newUser._id }, { status: 201 });
    } catch (error) {
        console.error("Signup Error:", error);
        return Response.json({ error: "Failed to register user" }, { status: 500 });
    }
}
