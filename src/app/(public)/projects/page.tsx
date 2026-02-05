"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProjectCard from "@/components/public/ProjectCard";

export default function ProjectsPage() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get("/api/projects");
                setProjects(response.data.data);
            } catch (error) {
                console.log("Failed to fetch projects", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
             
             {/* Decorative Background Pattern */}
             <div className="absolute inset-0 z-0 opacity-30 pointer-events-none" 
                  style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
             </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Page Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
                        Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Projects</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        A curated collection of my technical work, featuring high-performance backend systems 
                        and responsive full-stack applications.
                    </p>
                </div>

                {/* Loading State */}
                {loading ? (
                    <div className="flex flex-col justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                        <p className="text-gray-500 animate-pulse">Loading amazing things...</p>
                    </div>
                ) : (
                    <>
                        {/* Grid of Projects */}
                        {projects.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 md:gap-10">
                                {projects.map((project: any) => (
                                    <div key={project._id} className="h-full">
                                        <ProjectCard data={project} />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            /* Empty State (If no projects exist) */
                            <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
                                <div className="text-6xl mb-4">🚀</div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">No Projects Yet</h3>
                                <p className="text-gray-500">
                                    I am currently building something awesome. Check back soon!
                                </p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}