import React from "react";
import Sidebar from "@/components/admin/Sidebar";
import { Toaster } from "react-hot-toast";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
})  {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Toaster /> {/* To show notifications in Admin area */}
      
      {/* Sidebar (Fixed width) */}
      <Sidebar />

      {/* Main Content Area (Pushed to the right) */}
      <div className="flex-grow ml-64 p-8">
        {children}
      </div>
    </div>
  );
}