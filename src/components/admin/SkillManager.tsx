"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface Skill {
  _id: string;
  name: string;
  category: string;
}

export default function SkillManager() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [category, setCategory] = useState("Backend"); // Default category
  const [loading, setLoading] = useState(false);

  // Fetch skills on load
  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const res = await axios.get("/api/skills");
      if(res.data.success) {
        setSkills(res.data.data);
      }
    } catch (error) {
      console.error("Failed to load skills");
    }
  };

  const addSkill = async () => {
    if (!newSkill) return toast.error("Please enter a skill name");
    
    setLoading(true);
    try {
      // Send Name AND Category to the API
      await axios.post("/api/skills", { name: newSkill, category });
      
      setNewSkill("");
      toast.success(`${newSkill} added to ${category}!`);
      fetchSkills(); // Refresh the list instantly
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to add skill");
    } finally {
      setLoading(false);
    }
  };

  const deleteSkill = async (id: string) => {
    if(!confirm("Are you sure you want to delete this skill?")) return;
    try {
      await axios.delete("/api/skills", { data: { id } });
      toast.success("Skill deleted");
      fetchSkills();
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="text-2xl">⚡</div>
        <h2 className="text-xl font-bold text-gray-900">Manage Skills</h2>
      </div>
      
      {/* Input Area */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        {/* Skill Name Input */}
        <input
          type="text"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          placeholder="Skill Name (e.g. Next.js)"
          className="flex-1 px-4 py-2 border border-gray-300 text-black rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
        />

        {/* Category Dropdown (Crucial for your About Page filters) */}
        <select 
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 text-black bg-white"
        >
            <option value="Backend">Backend</option>
            <option value="Frontend">Frontend</option>
            <option value="Database">Database</option>
            <option value="Core">Core</option>
            
        </select>

        {/* Add Button */}
        <button 
          onClick={addSkill}
          disabled={loading}
          className="bg-black text-white px-6 py-2 rounded-lg font-bold hover:bg-gray-800 disabled:opacity-50 transition"
        >
          {loading ? "..." : "Add"}
        </button>
      </div>

      {/* Skills List (Grouped by tags) */}
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <div key={skill._id} className="group flex items-center gap-2 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-full text-sm font-medium text-gray-700">
            <span>{skill.name}</span>
            <span className="text-xs text-gray-400 bg-white px-1.5 rounded border border-gray-100">{skill.category}</span>
            
            <button 
              onClick={() => deleteSkill(skill._id)}
              className="text-gray-400 hover:text-red-500 font-bold ml-1 transition"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}