'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const ITEMS_PER_PAGE = 5; 

export default function Library() {
    const [novels, setNovels] = useState([]);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('Newest');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchNovels = async () => {
            try {
                const response = await fetch(`/api/novels?page=${page}&limit=${ITEMS_PER_PAGE}`);
                const data = await response.json();
                if (response.ok) {
                    setNovels(data.novels);
                    setTotalPages(Math.ceil(data.total / ITEMS_PER_PAGE));
                } else {
                    console.error("❌ Error fetching novels:", data.error);
                }
            } catch (error) {
                console.error("❌ Network error:", error);
            }
        };

        fetchNovels();
    }, [page]);

    const filteredNovels = novels
        .filter(novel => novel.title.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => {
            if (filter === 'Newest') return new Date(b.updated_at) - new Date(a.updated_at);
            if (filter === 'Popular') return b.bookmarked - a.bookmarked;
            return 0;
        });

    return (
        <>
            <Navbar page="Library" />

            <section className="w-full px-4 md:px-10 py-6">
                <h1 className="text-3xl font-bold text-white text-center">Library</h1>
                <p className="text-gray-400 text-center mb-6">Find all the novels you want to read!</p>

                {/* Search & Filter */}
                <div className="flex flex-col md:flex-row justify-center gap-4 mb-6">
                    <input 
                        type="text" 
                        placeholder="Search by title..." 
                        className="p-3 w-full md:w-1/2 bg-gray-900 text-white border border-gray-700 rounded-md"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {/* Sorting Dropdown */}
                <div className="text-center md:text-right mb-6">
                    <label className="text-white">Sort By: </label>
                    <select 
                        className="bg-gray-800 text-white px-3 py-2 rounded-md"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="Newest">Newest</option>
                        <option value="Popular">Most Popular</option>
                    </select>
                </div>

                {/* Novels List */}
                <div className="space-y-8 max-w-5xl mx-auto">
                    {filteredNovels.map((novel) => (
                        <Link key={novel._id} href={`/novel/${novel._id}`} className="block">
                            <div className="flex flex-col md:flex-row bg-gray-900 p-5 rounded-lg border border-gray-800 cursor-pointer hover:shadow-lg transition">
                                <Image 
                                    src={novel.coverImage || "/default-cover.jpg"} 
                                    alt={novel.title} 
                                    width={96} 
                                    height={144} 
                                    className="rounded-md mx-auto md:mx-0"
                                />
                                <div className="ml-0 md:ml-5 mt-4 md:mt-0 flex-1 text-center md:text-left">
                                    <h2 className="text-white text-lg font-bold">{novel.title}</h2>
                                    <p className="text-gray-400 text-sm">Updated {new Date(novel.updated_at).toLocaleDateString()}</p>
                                    <p className="text-gray-300 mt-3 line-clamp-2">{novel.description}</p>
                                    <div className="mt-3 text-gray-400 text-sm">
                                        <span>📖 {novel.chapter} Chapters </span> | 
                                        <span> 📌 {novel.bookmarked} Bookmarked</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex flex-col md:flex-row justify-center items-center mt-8 gap-4">
                    <button 
                        disabled={page === 1} 
                        className={`px-5 py-3 rounded-md ${page === 1 ? "bg-gray-600" : "bg-gray-700 hover:bg-gray-500"}`}
                        onClick={() => setPage(page - 1)}
                    >
                        Previous
                    </button>
                    <span className="text-white">Page {page} of {totalPages}</span>
                    <button 
                        disabled={page === totalPages} 
                        className={`px-5 py-3 rounded-md ${page === totalPages ? "bg-gray-600" : "bg-gray-700 hover:bg-gray-500"}`}
                        onClick={() => setPage(page + 1)}
                    >
                        Next
                    </button>
                </div>
            </section>

            <Footer />
        </>
    );
}
