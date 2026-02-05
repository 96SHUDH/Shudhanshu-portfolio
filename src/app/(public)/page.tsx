"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios"; // Don't forget to import axios!

export default function HomePage() {
  
  // 1. DYNAMIC RESUME LOGIC (NEW)
  const [resumeUrl, setResumeUrl] = useState("/uploads/resume.pdf"); // Default fallback

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await axios.get("/api/upload");
        if (res.data.success && res.data.url) {
          setResumeUrl(res.data.url);
        }
      } catch (error) {
        console.error("Failed to fetch resume link");
      }
    };
    fetchResume();
  }, []);

  // 2. ANIMATION LOGIC
  const roles = [
    "Backend Developer", 
    "Full Stack Engineer", 
    "Problem Solver", 
  ];
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 relative overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#e5e7eb 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
      </div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 text-center max-w-4xl mx-auto space-y-8">
        
        {/* Animated Role Label */}
        <h2 className="text-blue-600 font-bold tracking-wide uppercase text-sm md:text-base animate-pulse">
          I am a {roles[roleIndex]}
        </h2>
        
        {/* Main Headline */}
        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight">
          Building scalable <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
            systems that matter.
          </span>
        </h1>

        {/* Description */}
        <p className="text-xl text-gray-600 max-w-2xl mx-auto pt-4 leading-relaxed">
          Hi, I'm <span className="font-bold text-black">Shudhanshu Chaubey</span>. 
          A Computer Science graduate in 2024. <span className="text-gray-900 font-semibold">Backend Developer | Fullstack Developer | Software Developer</span>. 
        </p>

        {/* THE BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          
          {/* View Projects */}
          <Link 
            href="/projects"
            className="px-8 py-4 bg-black text-white text-lg font-bold rounded-full hover:bg-gray-800 transition transform hover:-translate-y-1 shadow-lg"
          >
            View My Work
          </Link>
          
          {/* ✅ UPDATED: Dynamic Resume Button */}
          <a 
            href={resumeUrl} // Now uses the state variable
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-blue-600 text-white text-lg font-bold rounded-full hover:bg-blue-700 transition transform hover:-translate-y-1 shadow-lg flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            Download Resume
          </a>

          {/* Contact Me */}
          <Link 
            href="/contact"
            className="px-8 py-4 bg-white text-gray-900 border-2 border-gray-200 text-lg font-bold rounded-full hover:border-black transition"
          >
            Contact Me
          </Link>
        </div>
      </div>

      {/* TECH STACK MARQUEE */}
      <div className="absolute bottom-10 w-full overflow-hidden opacity-30 pointer-events-none">
        <div className="flex justify-center gap-8 md:gap-16 font-bold text-3xl md:text-4xl text-gray-300 uppercase select-none">
            <span>Node.js</span>
            <span>•</span>
            <span>MongoDB</span>
            <span>•</span>
            <span>Docker</span>
            <span>•</span>
            <span>Next.js</span>
            <span>•</span>
            <span>TypeScript</span>
        </div>
      </div>

    </div>
  );
}