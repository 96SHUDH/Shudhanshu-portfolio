"use client";
import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  
  // This state holds the data the user types
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // This function runs when the user clicks "Send Message"
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Stop the page from reloading
    setLoading(true);

    try {
      // Send data to the API we created
      await axios.post("/api/contact", formData);
      
      // Show success message
      toast.success("Message sent successfully!");
      
      // Clear the form
      setFormData({ name: "", email: "", message: "" });
      
    } catch (error: any) {
      console.log("Error sending message", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Toast Notification Container */}
      <Toaster />
      
      {/* Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-8">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-2">
          Let's Work Together
        </h2>
        <p className="text-lg text-gray-600">
            Have a project in mind or just want to say hi?
        </p>
      </div>

      {/* The Form Card */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white text-black py-8 px-4 shadow-xl rounded-2xl sm:px-10 border border-gray-100">
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            
            {/* Name Input */}
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-gray-700">
                Name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your Name"
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-gray-700">
                Email Address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Message Input */}
            <div>
              <label htmlFor="message" className="block text-sm font-bold text-gray-700">
                Message
              </label>
              <div className="mt-1">
                <textarea
                  id="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Tell me about your project..."
                />
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>

          {/* Back Link */}
          <div className="mt-6 text-center">
             <Link href="/" className="text-gray-500 hover:text-black text-sm font-medium">
                ← Back to Home
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}