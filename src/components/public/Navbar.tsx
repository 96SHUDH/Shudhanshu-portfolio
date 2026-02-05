"use client"; 
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

export default function Navbar() {
  // Default fallback is your local file in case API fails
  const [resumeUrl, setResumeUrl] = useState("/uploads/resume.pdf"); 

  // Fetch the dynamic URL on load
  useEffect(() => {
    const getResume = async () => {
        try {
            // CHANGED: Now fetching from the new 'upload' route
            const res = await axios.get("/api/upload");
            
            // CHANGED: The new API returns { success: true, url: "..." }
            if (res.data.success && res.data.url) {
                setResumeUrl(res.data.url);
            }
        } catch (error) {
            console.log("Using default resume fallback");
        }
    };
    getResume();
  }, []);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 transition hover:opacity-80">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black text-white font-bold text-sm">SC</div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">Shudhanshu Chaubey</span>
          </Link>

          {/* Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-gray-600 hover:text-black">Home</Link>
            <Link href="/about" className="text-sm font-medium text-gray-600 hover:text-black">About</Link>
            <Link href="/projects" className="text-sm font-medium text-gray-600 hover:text-black">Projects</Link>
          </div>

          {/* Buttons */}
          <div className="hidden md:flex items-center gap-4">
            
            {/* ✅ DYNAMIC RESUME BUTTON */}
            <a 
                href={resumeUrl} 
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-bold text-gray-600 hover:text-black transition-colors"
            >
                View Resume
            </a>

            <Link href="/contact" className="rounded-full bg-black px-5 py-2.5 text-sm font-bold text-white transition hover:bg-gray-800">
                Let's Talk
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
}