// src/app/(admin)/admin/page.tsx
import React from 'react';
// Notice the import path points to your admin components folder
import ResumeUpload from '@/components/admin/ResumeUpload'; 

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Card: Resume Uploader */}
        <ResumeUpload />
        
        {/* Right Card: Placeholder for future stats */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-medium mb-2">Project Stats</h3>
            <p className="text-gray-500">You can add project counts or views here later.</p>
        </div>
      </div>
    </div>
  );
}