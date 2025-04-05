// app/api/novel/route.js

import { dbConnect } from "@/lib/dbConnect";
import Novel from "@/models/Novel";
import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

export async function POST(req) {
  try {
    await dbConnect();
    const formData = await req.formData();

    const title = formData.get("title");
    const author = formData.get("author");
    const description = formData.get("description");
    const genre = formData.get("genre");
    const chapter = formData.get("ch");
    const file = formData.get("coverImage");

    if (!title || !author || !description || !genre || !chapter || !file) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "Only image files are allowed" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const blob = await put(`covers/${file.name}`, Buffer.from(bytes), {
      access: "public"
    //   token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    const filePath = blob.url;

    const newNovel = await Novel.create({
      title,
      author,
      description,
      genre,
      chapter,
      coverImage: filePath,
    });

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

    const totalNovels = await Novel.countDocuments();
    const novels = await Novel.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    return NextResponse.json({
      novels,
      total: totalNovels,
    });
  } catch (error) {
    console.error("❌ Error fetching novels:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
