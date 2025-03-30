"use client";
import { useState } from "react";

const SignUp = ({ onClose, switchMode }) => {
    const [formData, setFormData] = useState({ username: "", email: "", password: "", confirmPassword: "" });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
    
        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
    
            // Debugging the response format
            const text = await res.text(); 
            console.log("Raw Response:", text); 
    
            try {
                const data = JSON.parse(text); // Ensure it's valid JSON
                if (res.ok) {
                    alert("Signup successful!");
                    switchMode();
                } else {
                    alert(data.error || "Signup failed.");
                }
            } catch (parseError) {
                console.error("JSON Parse Error:", parseError);
                alert("Unexpected server response. Check console.");
            }
        } catch (error) {
            console.error("Signup Error:", error);
            alert("Something went wrong. Check console for details.");
        }
    };
    

    return (
        <div>
            <h2 className="text-white text-lg font-semibold mt-2 text-center">FICTIONZONE</h2>
            <p className="text-gray-400 text-sm text-center">Create a new account</p>
            
            <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Username" className="w-full p-2 bg-gray-800 text-white rounded-md" onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" className="w-full p-2 bg-gray-800 text-white rounded-md" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" className="w-full p-2 bg-gray-800 text-white rounded-md" onChange={handleChange} required />
                <input type="password" name="confirmPassword" placeholder="Confirm Password" className="w-full p-2 bg-gray-800 text-white rounded-md" onChange={handleChange} required />
                
                <button type="submit" className="w-full bg-[#E6C478] text-black font-semibold p-2 rounded-md" disabled={loading}>
                    {loading ? "Signing up..." : "SIGN UP"}
                </button>

                <p className="text-gray-400 text-sm text-center">
                    Already have an account? <span className="text-blue-400 cursor-pointer" onClick={switchMode}>Log in</span>
                </p>
            </form>
        </div>
    );
};

export default SignUp;
