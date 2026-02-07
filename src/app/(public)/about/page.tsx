"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";

// Define the shape of a Skill object
interface Skill {
  _id: string;
  name: string;
  category: string;
}

export default function AboutPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch Skills from Database
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await axios.get("/api/skills");
        if (res.data.success) {
          setSkills(res.data.data);
        }
      } catch (error) {
        console.error("Failed to load skills");
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  // 2. Helper to filter skills by category
  // This allows us to keep your specific card styling while loading data dynamically
  const getSkillsByCategory = (category: string) => {
    return skills.filter((skill) => skill.category === category);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Background Decoration */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Me</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            I am <span className="text-black font-bold">Shudhanshu Chaubey</span>, a{' '}
            <span className="text-blue-600 font-bold bg-blue-50 px-2 py-1 rounded-md">Full Stack Developer</span>{' '}
            passionate about building scalable systems.
          </p>
        </div>

        {/* My Journey */}
        <div className="mb-20 bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
            My Journey
          </h2>
          <div className="prose prose-lg text-gray-600 leading-relaxed space-y-6 max-w-none">
            <p>
              My journey in software engineering started with a curiosity for how things work behind the scenes. 
              While I specialize in the logic of the <span className="font-semibold text-gray-900">Backend</span>, 
              I have evolved into a <span className="font-semibold text-gray-900">Full Stack Engineer</span>.
              <br/>
              I have developed a strong foundation in Data Structures and Algorithms (DSA), which helps me write efficient and optimized code.
            </p>
          </div>
        </div>

        {/* Technical Skills (Dynamic) */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
            Technical Skills
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* 1. BACKEND CARD */}
            <div className="group bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
              <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4 text-2xl">⚙️</div>
              <h3 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">Backend</h3>
              <ul className="text-gray-600 space-y-2 font-medium">
                {/* Dynamically map backend skills */}
                {getSkillsByCategory("Backend").length > 0 ? (
                    getSkillsByCategory("Backend").map((skill) => (
                        <li key={skill._id} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>{skill.name}
                        </li>
                    ))
                ) : (
                    // Fallback if DB is empty
                    <li className="text-gray-400 text-sm">No skills added yet...</li>
                )}
              </ul>
            </div>

            {/* 2. FRONTEND CARD */}
            <div className="group bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
              <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center mb-4 text-2xl">🎨</div>
              <h3 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">Frontend</h3>
              <ul className="text-gray-600 space-y-2 font-medium">
                {getSkillsByCategory("Frontend").length > 0 ? (
                    getSkillsByCategory("Frontend").map((skill) => (
                        <li key={skill._id} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>{skill.name}
                        </li>
                    ))
                ) : <li className="text-gray-400 text-sm">Loading...</li>}
              </ul>
            </div>

            {/* 3. DATABASE CARD */}
            <div className="group bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
              <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center mb-4 text-2xl">🗄️</div>
              <h3 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-green-600 transition-colors">Database</h3>
              <ul className="text-gray-600 space-y-2 font-medium">
                {getSkillsByCategory("Database").map((skill) => (
                    <li key={skill._id} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>{skill.name}
                    </li>
                ))}
              </ul>
            </div>

             {/* 4. CORE CARD */}
             <div className="group bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
              <div className="h-10 w-10 bg-orange-100 rounded-lg flex items-center justify-center mb-4 text-2xl">⚡</div>
              <h3 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">Core</h3>
              <ul className="text-gray-600 space-y-2 font-medium">
                {getSkillsByCategory("Core").map((skill) => (
                    <li key={skill._id} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-orange-400 rounded-full"></span>{skill.name}
                    </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* CTA Section */}
        <div className="relative overflow-hidden bg-gray-900 rounded-3xl p-10 md:p-16 text-center shadow-2xl">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-blue-900/40 to-transparent pointer-events-none"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
              Let's Build Something Amazing
            </h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/projects" className="bg-white text-gray-900 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 hover:scale-105 transition-all shadow-lg">
                View Projects
              </Link>
              <Link href="/contact" className="bg-transparent border-2 border-white/20 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 hover:border-white transition-all">
                Contact Me
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}