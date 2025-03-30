import { dbConnect } from "@/lib/dbConnect";
import Novel from "@/models/Novel";
import { writeFile } from "fs/promises";
import { join } from "path";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await dbConnect();
        const formData = await req.formData();

        console.log("Received form data:", formData); // ✅ Debug log

        const title = formData.get("title");
        const author = formData.get("author");
        const description = formData.get("description");
        const genre = formData.get("genre");
        const chapter = formData.get("ch")
        const file = formData.get("coverImage");

        if (!title || !author || !description || !genre || !chapter || !file) {
            console.error("❌ Missing fields:", { title, author, description, genre, chapter, file });
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        const filePath = `/uploads/${file.name}`;
        const bytes = await file.arrayBuffer();
        await writeFile(join(process.cwd(), "public", filePath), Buffer.from(bytes));

        const newNovel = await Novel.create({
            title,
            author,
            description,
            genre,
            chapter,
            coverImage: filePath,
        });

        console.log("✅ Novel added:", newNovel);
        return NextResponse.json({ success: true, novel: newNovel });
    } catch (error) {
        console.error("❌ Error adding novel:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}


export async function GET(req) {
    try {
        await dbConnect();

        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get("page")) || 1;
        const limit = parseInt(searchParams.get("limit")) || 5;

        const totalNovels = await Novel.countDocuments(); // ✅ Get total novel count
        const novels = await Novel.find()
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit) // ✅ Skip previous pages
            .limit(limit); // ✅ Fetch only 'limit' novels

        return NextResponse.json({
            novels,
            total: totalNovels, // ✅ Return total count for pagination
        });
    } catch (error) {
        console.error("❌ Error fetching novels:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
