"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

interface Message {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get("/api/contact");
        setMessages(response.data.data);
      } catch (error) {
        toast.error("Failed to load messages");
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const handleDelete = (id: string) => {
    setMessages(messages.filter((msg) => msg._id !== id));
    toast.success("Message dismissed");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <Toaster />
      <div className="max-w-4xl mx-auto">
        
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Inbox</h1>
            <span className="bg-blue-100 text-blue-800 text-sm font-bold px-3 py-1 rounded-full">
                {messages.length} Messages
            </span>
        </div>

        {loading ? (
          <div className="text-center py-20">Loading...</div>
        ) : (
          <div className="space-y-4">
            {messages.length === 0 ? (
               <div className="text-center py-20 bg-white rounded-xl border border-gray-100 shadow-sm">
                  <p className="text-gray-500">No messages found.</p>
               </div>
            ) : (
               messages.map((msg) => (
                <div 
                  key={msg._id} 
                  className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="font-bold text-lg text-gray-900">{msg.name}</h3>
                        <p className="text-sm text-gray-500">{msg.email}</p>
                    </div>
                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                        {new Date(msg.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <p className="text-gray-700 bg-gray-50 p-4 rounded-lg text-sm leading-relaxed mb-6 whitespace-pre-wrap">
                    {msg.message}
                  </p>

                  {/* ✅ UPGRADED BUTTONS */}
                  <div className="flex flex-wrap gap-3 border-t border-gray-100 pt-4">
                    
                    {/* OPTION 1: GMAIL BUTTON (Best for Web) */}
                    <a 
                        href={`https://mail.google.com/mail/?view=cm&fs=1&to=${msg.email}&su=Re: Inquiry from Portfolio&body=Hi ${msg.name},%0D%0A%0D%0AThank you for reaching out!%0D%0A%0D%0ARegards,%0D%0AShudhanshu`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-sm font-bold rounded-lg hover:bg-red-700 transition"
                    >
                        <span>📧</span> Reply with Gmail
                    </a>

                    {/* OPTION 2: DEFAULT MAIL APP */}
                    <a 
                        href={`mailto:${msg.email}?subject=Re: Inquiry from Portfolio&body=Hi ${msg.name},`}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 text-sm font-bold rounded-lg hover:bg-gray-200 transition"
                    >
                        <span>🖥️</span> Default App
                    </a>

                    {/* DELETE BUTTON */}
                    <button 
                        onClick={() => handleDelete(msg._id)}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-red-600 text-sm font-bold rounded-lg hover:bg-red-50 transition ml-auto"
                    >
                        <span>🗑️</span>
                    </button>
                  </div>

                </div>
              ))
            )}
          </div>
        )}

      </div>
    </div>
  );
}