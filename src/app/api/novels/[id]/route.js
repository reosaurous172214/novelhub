import {dbConnect} from "@/lib/dbConnect";
import Novel from "@/models/Novel";

// GET single novel
export async function GET(_, { params }) {
    await dbConnect();
    const novel = await Novel.findById(params.id);
    if (!novel) return Response.json({ error: "Novel not found" }, { status: 404 });
    return Response.json(novel);
}

// PUT (edit) novel
export async function PUT(req, { params }) {
    await dbConnect();
    const data = await req.json();
    const updatedNovel = await Novel.findByIdAndUpdate(params.id, data, { new: true });
    if (!updatedNovel) return Response.json({ error: "Novel not found" }, { status: 404 });
    return Response.json({ message: "Novel updated successfully", novel: updatedNovel });
}

// DELETE novel
export async function DELETE(_, { params }) {
    await dbConnect();
    const deletedNovel = await Novel.findByIdAndDelete(params.id);
    if (!deletedNovel) return Response.json({ error: "Novel not found" }, { status: 404 });
    return Response.json({ message: "Novel deleted successfully" });
}
