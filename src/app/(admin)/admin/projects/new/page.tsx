"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function NewProjectPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    technologies: "", 
    githubLink: "",
    liveLink: "",
    featured: false
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);

      // Convert "Node, React" -> ["Node", "React"]
      const techArray = formData.technologies.split(",").map(t => t.trim());

      const payload = {
        ...formData,
        technologies: techArray
      };

      await axios.post("/api/projects", payload);
      
      toast.success("Project created successfully!");
      router.push("/admin/projects");

    } catch (error: any) {
        console.log(error);
        toast.error(error.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md border text-black border-gray-200">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Add New Project</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Title & Slug */}
        <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
                <input 
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. Weather App"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL)</label>
                <input 
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. weather-app"
                    required
                />
            </div>
        </div>

        {/* Description */}
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea 
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe your project..."
                required
            />
        </div>

        {/* Technologies */}
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Technologies (Comma separated)</label>
            <input 
                name="technologies"
                value={formData.technologies}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. React, Node.js, MongoDB"
            />
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">GitHub Link</label>
                <input 
                    name="githubLink"
                    value={formData.githubLink}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://github.com/..."
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Live Demo Link</label>
                <input 
                    name="liveLink"
                    value={formData.liveLink}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://..."
                />
            </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
            <button 
                disabled={loading}
                className="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition disabled:opacity-50"
            >
                {loading ? "Saving..." : "Create Project"}
            </button>
        </div>

      </form>
    </div>
  );
}