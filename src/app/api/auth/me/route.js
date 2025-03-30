import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import {dbConnect} from "@/lib/dbConnect";
import User from "@/models/Users";

export async function GET(req) {
    await dbConnect();
    
    try {
        const authHeader = req.headers.get("authorization");
        if (!authHeader) return NextResponse.json({ error: "No token provided" }, { status: 401 });

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("-password");

        return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
}
