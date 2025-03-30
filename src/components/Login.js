"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

const Login = ({ onClose, switchMode }) => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const { setUser } = useAuth();  // Now setUser exists

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Login failed.");

            localStorage.setItem("token", data.token);
            setUser(data.user); // Now updates global auth state correctly
            onClose();
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2 className="text-white text-lg font-semibold mt-2 text-center">FICTIONZONE</h2>
            <p className="text-gray-400 text-sm text-center">Please enter your account details.</p>

            <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="email" 
                    placeholder="Username or Email" 
                    className="w-full p-2 bg-gray-800 text-white rounded-md" 
                    onChange={handleChange} 
                    required 
                />
                <input 
                    type="password" 
                    name="password" 
                    placeholder="Password" 
                    className="w-full p-2 bg-gray-800 text-white rounded-md" 
                    onChange={handleChange} 
                    required 
                />
                
                <button 
                    type="submit" 
                    className="w-full bg-[#E6C478] text-black font-semibold p-2 rounded-md disabled:opacity-50" 
                    disabled={loading}
                >
                    {loading ? "Logging in..." : "LOG IN"}
                </button>
                
                <p className="text-gray-400 text-sm text-center cursor-pointer">Forgot Password?</p>
                
                <p className="text-gray-400 text-sm text-center">
                    Don&apos;t have an account? <span className="text-blue-400 cursor-pointer" onClick={switchMode}>Sign up</span>
                </p>
            </form>
        </div>
    );
};

export default Login;
