'use client';

import React, { useState } from 'react';
import toast from 'react-hot-toast';

export default function ResumeUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  // 1. This handles the FILE selection (not text)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file); // We attach the file object, not a string

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Resume uploaded successfully!');
        setFile(null); // Reset the input
      } else {
        toast.error('Upload failed');
      }
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      <h3 className="text-lg font-bold mb-2">Update Resume</h3>
      <p className="text-sm text-gray-500 mb-4">Select a PDF file from your computer.</p>
      
      <form onSubmit={handleUpload} className="space-y-4">
        {/* TYPE="FILE" allows you to pick a file */}
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-black file:text-white
            hover:file:bg-gray-800"
        />
        
        <button
          type="submit"
          disabled={!file || uploading}
          className={`w-full py-2 px-4 rounded-md text-white font-medium transition ${
            !file || uploading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-black hover:bg-gray-800'
          }`}
        >
          {uploading ? 'Uploading...' : 'Upload File'}
        </button>
      </form>
    </div>
  );
}