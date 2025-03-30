'use client';

import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';

export default function RecentlyAdded() {
    const [novels, setNovels] = useState([]);
    const scrollRef = useRef(null);
    const [activeFilter, setActiveFilter] = useState(null); // Track active button

    useEffect(() => {
        fetch(`/api/novels?page=1&limit=10`)
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data.novels)) {
                    setNovels(data.novels);
                } else {
                    console.error('API did not return an array:', data);
                    setNovels([]);
                }
            })
            .catch((error) => {
                console.error('Error fetching novels:', error);
                setNovels([]);
            });
    }, []);

    // Scroll Functions
    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
        }
        setActiveFilter("left");
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
        }
        setActiveFilter("right");
    };

    return (
        <section>
            <div className="flex flex-row justify-between items-center max-w-7xl mx-auto px-4 md:px-10 py-4">
                <h2 className="text-2xl font-bold text-white">Recently Added</h2>
                <div className="flex gap-2">
                    <button 
                        onClick={scrollLeft}
                        className={`px-3 py-1 rounded transition ${
                            activeFilter === "left" ? "bg-blue-500 text-white" : "bg-gray-700 text-white hover:bg-gray-600"
                        }`}
                    >
                        ←
                    </button>
                    <button 
                        onClick={scrollRight}
                        className={`px-3 py-1 rounded transition ${
                            activeFilter === "right" ? "bg-blue-500 text-white" : "bg-gray-700 text-white hover:bg-gray-600"
                        }`}
                    >
                        →
                    </button>
                </div>
            </div>
            <hr className="max-w-7xl mx-auto border-blue-500" />

            <div 
                ref={scrollRef} 
                className="flex flex-row overflow-hidden whitespace-nowrap items-center max-w-7xl mx-auto px-4 md:px-10 py-4 scrollbar-hidden gap-4"
            >
                {novels.map((novel) => (
                    <div key={novel._id} className="w-48 flex-shrink-0">
                        <Image 
                            src={novel.coverImage || '/default-cover.jpg'} 
                            alt={novel.title} 
                            width={160}  
                            height={208} 
                            className="rounded object-cover"
                        />
                        <div className="w-40 h-12 text-white mt-2 text-center overflow-hidden">
                            <p className="line-clamp-2 text-ellipsis overflow-hidden break-words">{novel.title}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
