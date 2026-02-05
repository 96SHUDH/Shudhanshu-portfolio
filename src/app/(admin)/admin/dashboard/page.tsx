"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

// ✅ IMPORT THE NEW COMPONENT
// Make sure this path matches where you saved it!
import ResumeUpload from "@/components/admin/ResumeUpload"; 

export default function AdminDashboard() {
  const router = useRouter();

  // Logout Function
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <Toaster />
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500 text-sm">Welcome back, Shudhanshu</p>
        </div>
        
        <div className="flex gap-4">
          <Link href="/" className="px-4 py-2 text-sm text-gray-600 hover:text-black border border-gray-200 rounded-lg transition">
            View Live Site
          </Link>
          <button onClick={logout} className="px-4 py-2 text-sm bg-red-50 text-red-600 hover:bg-red-100 font-bold rounded-lg transition">
            Logout
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Card 1: Manage Projects */}
        <Link href="/admin/projects" className="group block">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition cursor-pointer h-full">
            <div className="text-4xl mb-4">📂</div>
            <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition">Manage Projects</h2>
            <p className="text-gray-500 mt-2">View, Edit, or Delete your existing projects.</p>
          </div>
        </Link>

        {/* Card 2: Inbox (Messages) */}
        <Link href="/admin/messages" className="group block">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition cursor-pointer h-full">
            <div className="text-4xl mb-4">📩</div>
            <h2 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition">Inbox</h2>
            <p className="text-gray-500 mt-2">Check messages from recruiters.</p>
          </div>
        </Link>

        {/* ✅ CARD 3: NEW RESUME UPLOADER (Replaces the old text input) */}
        <div className="col-span-1 md:col-span-2">
            <ResumeUpload />
        </div>

      </div>
    </div>
  );
}