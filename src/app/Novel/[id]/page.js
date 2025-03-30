import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {dbConnect }from "@/lib/dbConnect";
import Novel from "@/models/Novel";

export const dynamic = "force-dynamic"; // For SSR

export default async function NovelDetail({ params }) {
    await dbConnect();
    const novel = await Novel.findById(params.id).lean();

    return (
        <>
            <Navbar  />
            <ul>
      {novel.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
            <Footer />
        </>
    );
}
