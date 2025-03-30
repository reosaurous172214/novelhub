"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import SignUp from "./Signup";
import Login from "./Login";

const AuthModal = ({ isOpen, onClose }) => {
    const [isSignUp, setIsSignUp] = useState(false);
    const router = useRouter();

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "auto";
    }, [isOpen]);

    if (!isOpen) return null;

    const toggleAuthMode = () => setIsSignUp((prev) => !prev);

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            router.push("/");
            onClose();
        }
    };

    return (
        <div 
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50"
            aria-hidden={!isOpen}
            onClick={handleOverlayClick}
        >
            <div className="bg-[#121212] p-6 rounded-lg shadow-lg w-96 relative" onClick={(e) => e.stopPropagation()}>
                {/* Close Button */}
                <button onClick={() => { onClose(); router.push("/"); }} className="absolute top-3 right-3 text-white text-xl">
                    ✖
                </button>

                {/* Logo */}
                <div className="flex flex-col items-center">
                    <Image src="/logo.png" alt="FictionZone Logo" width={48} height={48} />
                </div>

                {/* Auth Component (Signup or Login) */}
                {isSignUp ? <SignUp onClose={onClose} switchMode={toggleAuthMode} /> : <Login onClose={onClose} switchMode={toggleAuthMode} />}
            </div>
        </div>
    );
};

export default AuthModal;
