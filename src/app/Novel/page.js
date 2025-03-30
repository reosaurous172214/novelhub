'use client'
import { useEffect, useState } from "react";
import Image from "next/image";

export default function NovelsPage() {
    const [novels, setNovels] = useState([]);

    useEffect(() => {
        fetch("/api/novels")
            .then((res) => res.json())
            .then((data) => setNovels(data.novels || []))
            .catch((error) => console.error("Error fetching novels:", error));
    }, []);

    return (
        <div className="min-h-screen bg-gray-900 p-5">
            <h2 className="text-3xl font-semibold text-white mb-5">Latest Novels</h2>
            <div className="grid grid-cols-3 gap-4">
                {novels.map((novel) => (
                    <div key={novel._id} className="bg-gray-800 p-4 rounded-lg">
                        <Image src={novel.coverImage} alt="Cover" width={200} height={300} className="rounded-lg"/>
                        <h3 className="text-white mt-2">{novel.title}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
}
