import mongoose from "mongoose";

const NovelSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    genre: { type: String, required: true },
    ch: { type: String }, // Optional content field
    coverImage: { type: String, default: "/default-cover.jpg" }, // Store image path
}, { timestamps: true });

export default mongoose.models.Novel || mongoose.model("Novel", NovelSchema);
