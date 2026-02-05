"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import Link from "next/link";


export default function ProjectDtailsPage() {
    const { slug } = useParams();
    const [project, setProject] = useState<any>(null); //It creates a state variable named project that starts empty (null), and gives you a function named setProject that you use to fill it with data later (once the API responds).
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 2. Fetch data for ONLY this specific project
        const fetchProjectDetails = async () => {
            if (!slug) return;
            try {
                // We need to create this specific API route next!
                const response = await axios.get(`/api/projects/${slug}`);
                setProject(response.data.data);

            } catch (error) {
                console.log("Failed to fetch project details", error);

            } finally {
                setLoading(false);
            }
        };

        fetchProjectDetails();
    }, [slug]);

    if (loading) {
        return (
            <div className="flex h-screen justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }
    if (!project) {
        return <div className="text-center py-20 text-xl">Project not found</div>;

    }
    return (
        <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Back Button */}
                <Link href="/projects" className="text-gray-500 hover:text-black mb-6 inline-block">← Back to Projects</Link>
                {/*Header */}
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                    {project.title}
                </h1>
                {/*Tech Stack Used */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {project.technologies.map((tech: string, index: number) => (
                        <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                            {tech}
                        </span>
                    ))}
                </div>
                {/*Links */}
                <div className="flex gap-4 mb-12 border-b border-gray-100 pb-8">
                    <a href={project.githubLink} target="_blank" className="bg-black text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition">
                        View on Github
                    </a>
                    {project.liveLink && (
                        <a href={project.liveLink} target="_blank" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-800 transition">
                            Live Demo
                        </a>
                    )}
                </div>
                {/*Main Content */}
                <div className="prose max-w-none text-gray-700 text-lg leading-relaxed whitespace-pre-line">
                    {/* whitespace-pre-line preserves your paragraph breaks from the database */}
                    {project.description}
                </div>
            </div>
        </div>
    );
}