"use client";

import Link from "next/link";
import Image from "next/image";
import { Home, Book, LogIn } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import "../app/styles/globals.css";

export default function Navbar({ page }) {
    const { user, logout } = useAuth();
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="bg-black w-full">
            {/* --------- Div 1 --------- */}
            <div className="flex justify-between items-center max-w-7xl mx-auto px-4 md:px-10 py-4">
                {/* Logo + Title */}
                <div className="flex items-center space-x-3">
                    <Image src="/logo.png" alt="logo" width={50} height={50} />
                    <div className="text-white">
                        <h1 className="text-2xl font-bold">NOVELHUB</h1>
                        <p className="text-xs">An Open Online Platform for Web Novels</p>
                    </div>
                </div>

                {/* Authentication Section */}
                <div>
                    {user ? (
                        <div className="flex items-center space-x-4">
                            <span className="text-white">Welcome, {user.username}!</span>
                            <button 
                                onClick={logout} 
                                className="bg-red-500 hover:bg-red-600 text-white font-medium px-3 py-2 rounded-md shadow-sm transition duration-200"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <Link href="/Authentication">
                            <button 
                                onClick={() => setIsModalOpen(true)} 
                                className="flex items-center gap-2 bg-[#E6C478] hover:bg-yellow-600 text-black font-medium px-3 py-2 rounded-md border border-black shadow-sm transition duration-200"
                            >
                                <span>Sign in</span>
                                <LogIn className="h-5 w-5" />
                            </button>
                        </Link>
                    )}
                </div>
            </div>

            <hr />

            {/* --------- Div 2 --------- */}
            <div className="flex justify-center max-w-7xl mx-auto px-4 md:px-10 py-2">
                <ul className="flex space-x-4 text-white text-lg items-center">
                    <li>
                        <Link href="/" className={`flex items-center gap-2 ${page === "Home" ? "text-cyan-500 underline" : "text-white"} hover:text-cyan-400`}>
                            <Home className="h-5 w-5" />
                            Home
                        </Link>
                    </li>
                    <span className="text-gray-400">|</span>
                    <li>
                        <Link href="/Library" className={`flex items-center gap-2 ${page === "Library" ? "text-cyan-500 underline" : "text-white"} hover:text-cyan-400`}>
                            <Book className="h-5 w-5" />
                            Library
                        </Link>
                    </li>
                    <span className="text-gray-400">|</span>
                    <li>
                        <Link href="/Author" className={`flex items-center gap-2 ${page === "Author" ? "text-cyan-500 underline" : "text-white"} hover:text-cyan-400`}>
                            <Book className="h-5 w-5" />
                            Author
                        </Link>
                    </li>
                </ul>
            </div>

            <hr />
        </div>
    );
}
