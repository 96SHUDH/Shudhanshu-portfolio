"use client";
import React from "react";
import Link from "next/link";

interface ProjectProps {
  data: {
    title: string;
    description: string;
    slug: string;
    technologies: string[];
    githubLink: string;
    liveLink?: string;
  };
}

export default function ProjectCard({ data }: ProjectProps) {
  
  // 1. Smart Detection: Check if the link is for Documentation
  // If the link contains "postman", "swagger", or "docs", we treat it as an API project.
  const isApiDoc = data.liveLink?.toLowerCase().includes("postman") || 
                   data.liveLink?.toLowerCase().includes("swagger") || 
                   data.liveLink?.toLowerCase().includes("docs");

  return (
    <div className="group relative flex flex-col h-full bg-white rounded-2xl border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-blue-500/50 hover:-translate-y-1">
      
      <div className="p-8 flex-grow">
        <div className="flex justify-between items-start mb-6">
          
          {/* 2. Dynamic Icon (Laptop vs Scroll) */}
          <div className="p-3 bg-blue-50 rounded-xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
            {isApiDoc ? (
                 <span className="text-xl">📜</span> // Scroll icon for API Docs
            ) : (
                 <span className="text-xl">💻</span> // Laptop icon for Web Apps
            )}
          </div>
          
          {/* 3. Links Section (GitHub + Live/Docs) */}
          <div className="flex gap-3">
             {/* GitHub Link */}
             <a href={data.githubLink} target="_blank" className="text-gray-400 hover:text-black transition-colors" title="View Code">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
             </a>
             
             {/* Live/Docs Link (Only shows if liveLink exists) */}
             {data.liveLink && (
                 <a href={data.liveLink} target="_blank" className="text-gray-400 hover:text-blue-600 transition-colors" title={isApiDoc ? "API Documentation" : "Live Demo"}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                 </a>
             )}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
          {data.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">
          {data.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {data.technologies?.slice(0, 5).map((tech, index) => (
            <span key={index} className="px-3 py-1 bg-gray-50 text-gray-600 text-xs font-semibold rounded-full border border-gray-100">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Button */}
      <div className="p-6 border-t border-gray-100 bg-gray-50/50 rounded-b-2xl">
        <Link 
          href={`/projects/${data.slug}`} 
          className="flex items-center justify-center w-full gap-2 bg-black text-white font-bold py-3 px-6 rounded-xl hover:bg-gray-800 hover:shadow-lg transition-all active:scale-95"
        >
          Read Case Study
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </div>

    </div>
  );
}