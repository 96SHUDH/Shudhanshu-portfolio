"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch projects when page loads
  const fetchProjects = async () => {
    try {
      const response = await axios.get("/api/projects");
      setProjects(response.data.data);
    } catch (error) {
      toast.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id: string) => {
    if(!confirm("Are you sure you want to delete this project?")) return;
    
    try {
        await axios.delete(`/api/projects/${id}`);
        toast.success("Project deleted");
        fetchProjects(); // Refresh the list
    } catch (error) {
        toast.error("Failed to delete");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Manage Projects</h1>
        <Link 
            href="/admin/projects/new" 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
            + Add New Project
        </Link>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Tech Stack</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {projects.map((project: any) => (
                <tr key={project._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{project.title}</div>
                    <div className="text-sm text-gray-500">/{project.slug}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1 flex-wrap">
                        {project.technologies.map((t: string) => (
                            <span key={t} className="px-2 py-0.5 bg-gray-100 text-gray-800 text-xs rounded-full">{t}</span>
                        ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium">
                        {/* The New Edit Button */}
                        <Link 
                            href={`/admin/projects/${project._id}`}
                            className="text-indigo-600 hover:text-indigo-900 mr-4"
                        >
                            Edit
                        </Link>

                        {/* The Existing Delete Button */}
                        <button 
                            onClick={() => handleDelete(project._id)}
                            className="text-red-600 hover:text-red-900"
                        >
                            Delete
                        </button>
                    </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}