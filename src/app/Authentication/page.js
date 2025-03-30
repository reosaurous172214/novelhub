"use client";
import { useState } from "react";
import AuthModal from "@/components/Auth";
import Footer from "@/components/Footer";

const Authentication = () => {
    const [isAuthOpen, setIsAuthOpen] = useState(true);

    return (
        <div className="flex flex-col min-h-screen bg-black">
            <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
            <Footer />
        </div>
    );
};

export default Authentication;
