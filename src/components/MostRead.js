'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function MostReadSection() {
    const [mostRead, setMostRead] = useState([]);
    const [activeFilter, setActiveFilter] = useState('Daily'); // Default filter
    const router = useRouter();

    useEffect(() => {
        fetch(`/api/novels?page=1&limit=8`)
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data.novels)) {
                    // Sort by oldest first (change to sort by `readCount` if available)
                    const sortedNovels = [...data.novels].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                    setMostRead(sortedNovels);
                } else {
                    console.error('API did not return an array:', data);
                    setMostRead([]);
                }
            })
            .catch((error) => {
                console.error('Error fetching novels:', error);
                setMostRead([]);
            });
    }, []);

    const filters = ['Daily', 'Weekly', 'Monthly', 'Yearly'];

    return (
        <section>
            <div className="flex flex-row justify-between items-center max-w-7xl mx-auto px-4 md:px-10 py-4">
                <h2 className="text-2xl font-bold text-white">MOST READ NOVELS</h2>
                <div className="flex gap-2">
                    {filters.map((filter) => (
                        <button 
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`px-3 py-1 rounded transition ${
                                activeFilter === filter 
                                    ? 'bg-blue-500 text-white' // Active button
                                    : 'bg-gray-700 text-white hover:bg-gray-600'
                            }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
            </div>
            <hr className="max-w-7xl mx-auto border-blue-500" />

            <div className="flex flex-row flex-wrap justify-around items-center max-w-7xl mx-auto px-4 md:px-10 py-4 scrollbar-hidden gap-4">
                {mostRead.map((novel, index) => (
                    <div 
                        key={novel._id} 
                        className="w-64 flex-shrink-0 relative cursor-pointer" 
                        onClick={() => router.push(`/novel/${novel._id}`)}
                    >
                        <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                            #{index + 1}
                        </span>
                        <Image 
                            src={novel.coverImage || '/default-cover.jpg'} 
                            alt={novel.title} 
                            width={256}  
                            height={320} 
                            className="rounded object-cover"
                        />
                        <div className="w-64 h-12 text-white mt-2 text-center overflow-hidden">
                            <p className="line-clamp-2 text-ellipsis overflow-hidden break-words">
                                {novel.title}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
