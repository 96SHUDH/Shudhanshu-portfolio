"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);

    const onLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login success", response.data);
            toast.success("Login successful! Redirecting...");

            // FIX 1: Use window.location.href to force middleware to recognize the new cookie
            window.location.href = "/admin/dashboard";

        } catch (error: any) {
            console.log("Login failed", error.message);
            // FIX 2: Correct property is 'error', not 'console.error'
            toast.error(error.response?.data?.error || "Login Failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Toaster />

            <div className="bg-white p-8 rounded-lg shadow-lg w-96 border border-gray-200">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Admin Login</h1>
                <form onSubmit={onLogin} className="flex flex-col gap-4">
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <input
                        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-black"
                        type="email"
                        placeholder="Enter Your Email"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                    />

                    <label className="text-sm font-medium text-gray-700">Password</label>
                    <input
                        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-black"
                        type="password" /* FIX 3: Fixed typo (pasword -> password) */
                        placeholder="Enter your password"
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                    />

                    <button
                        disabled={loading}
                        className="bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition disabled:opacity-50 mt-4">
                        {loading ? "Checking..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
}