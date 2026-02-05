import React from 'react';
import Navbar from "@/components/public/Navbar"; // <--- 1. Import the Navbar

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen">
       
       {/* 2. Use the Navbar Component here */}
       <Navbar />

       <main className="flex-grow bg-white">
        {children}
       </main>

       {/* Your Footer (I kept it!) */}
       <footer className="bg-gray-100 p-6 text-center text-gray-500 text-sm border-t border-gray-200">
         © 2026 Shudhanshu. Built with Next.js & MongoDB.
       </footer>
    </div>
  );
}