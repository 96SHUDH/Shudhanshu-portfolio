"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function EditProjectPage() {
  const { id } = useParams(); // Get the Project ID from the URL
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    technologies: "",
    githubLink: "",
    liveLink: "",
    featured: false
  });

  // 1. Fetch the existing data when page loads
  useEffect(() => {
    const fetchProject = async () => {
      try {
        // We use the ID to find the specific project
        const response = await axios.get(`/api/projects/${id}`);
        const data = response.data.data;
        
        setFormData({
            title: data.title,
            slug: data.slug,
            description: data.description,
            technologies: data.technologies.join(", "), // Convert Array back to String for the input box
            githubLink: data.githubLink,
            liveLink: data.liveLink || "",
            featured: data.featured
        });
      } catch (error) {
        toast.error("Failed to fetch project");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProject();
  }, [id]);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const techArray = formData.technologies.split(",").map(t => t.trim());
      
      // 2. Send the UPDATE (PUT) request
      await axios.put(`/api/projects/${id}`, {
        ...formData,
        technologies: techArray
      });

      toast.success("Project updated successfully");
      router.push("/admin/projects");
    } catch (error) {
      toast.error("Failed to update");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto bg-white text-black p-8 rounded-xl shadow-md border border-gray-200">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Edit Project</h1>
      <form onSubmit={handleUpdate} className="space-y-6">
        {/* REUSE THE SAME FORM INPUTS AS THE ADD PAGE */}
        
        <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
                <input name="title" value={formData.title} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" required />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                <input name="slug" value={formData.slug} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" required />
            </div>
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows={4} className="w-full p-2 border border-gray-300 rounded-md" required />
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Technologies</label>
            <input name="technologies" value={formData.technologies} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" />
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">GitHub Link</label>
                <input name="githubLink" value={formData.githubLink} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" required />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Live Link</label>
                <input name="liveLink" value={formData.liveLink} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" />
            </div>
        </div>

        <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition">
            Update Project
        </button>
      </form>
    </div>
  );
}