"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Author = () => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [description, setDescription] = useState("");
    const [genre, setGenre] = useState("");
    const [chapter, setChapter] = useState("");
    const [coverImage, setAuthorImage] = useState(null);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const handleImageChange = (e) => {
        setAuthorImage(e.target.files[0]);
    };

    const handleSubmit = async () => {
        setError("");
        setMessage("");

        const formData = new FormData();
        formData.append("title", title);
        formData.append("author", author);
        formData.append("description", description);
        formData.append("genre", genre);
        formData.append("ch", chapter);
        if (coverImage) {
            formData.append("coverImage", coverImage);
        }

        try {
            const response = await fetch("/api/novels", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                setMessage("✅ Novel added successfully!");
                setTitle("");
                setAuthor("");
                setDescription("");
                setGenre("");
                setChapter("");
                setAuthorImage(null);
            } else {
                throw new Error("❌ Failed to add novel");
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <>
            <Navbar page="Author" />
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 px-5 py-10">
                <h2 className="text-3xl font-semibold text-white mb-6">Add a New Novel</h2>

                <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
                    <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-3 mb-3 rounded-md border border-gray-600 bg-gray-700 text-white placeholder-gray-400" />
                    
                    <input type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)}
                        className="w-full p-3 mb-3 rounded-md border border-gray-600 bg-gray-700 text-white placeholder-gray-400" />
                    
                    <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-3 mb-3 rounded-md border border-gray-600 bg-gray-700 text-white placeholder-gray-400" />
                    
                    <input type="text" placeholder="Genre" value={genre} onChange={(e) => setGenre(e.target.value)}
                        className="w-full p-3 mb-3 rounded-md border border-gray-600 bg-gray-700 text-white placeholder-gray-400" />

                    <textarea placeholder="Chapter" value={chapter} onChange={(e) => setChapter(e.target.value)}
                        className="w-full p-3 mb-3 rounded-md border border-gray-600 bg-gray-700 text-white placeholder-gray-400 "></textarea>

                    <input type="file" accept="image/*" onChange={handleImageChange}
                        className="w-full p-2 mb-3 rounded-md border border-gray-600 bg-gray-700 text-white" />

                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-medium transition duration-300"
                        onClick={handleSubmit}>
                        Submit
                    </button>

                    {error && <p className="text-red-400 mt-3 text-sm">{error}</p>}
                    {message && <p className="text-green-400 mt-3 text-sm">{message}</p>}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Author;
