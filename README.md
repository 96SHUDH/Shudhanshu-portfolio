# 🚀 Portfolio | Shudhanshu Chaubey

A modern, full-stack personal portfolio website built with **Next.js 14**, **TypeScript**, and **MongoDB**. It features a completely dynamic content management system, allowing the admin to update projects, read messages, and upload resumes directly from a secure dashboard.

## ✨ Features

### 🎨 Public Facing (Frontend)

**Responsive Design**: Fully responsive UI built with Tailwind CSS.

**Dynamic Resume:** "Download CV" buttons automatically fetch the latest PDF from the database.

**Project Showcase:** Dynamic grid to display portfolio projects.

Contact Form: Functional contact form that saves messages to the database.

### 🔐 Admin Dashboard (CMS)

**Secure Authentication**: Protected routes with JWT-based login system.

**Resume Uploader**: Drag-and-drop file uploader to update the CV globally without code changes.

**Project Management**: CRUD (Create, Read, Update, Delete) operations for portfolio projects.

**Message Inbox**: View and manage inquiries received from the contact form.

## 🛠️ Tech Stack

**Framework**: Next.js 14 (App Router)

**Language**: TypeScript

**Styling**: Tailwind CSS

**Database**: MongoDB (Mongoose)

**Authentication**: JWT (JSON Web Tokens)

File Handling: Custom Node.js file system implementation

Toast Notifications: React Hot Toast

## 🚀 Getting Started

Follow these instructions to set up the project locally.

1. Clone the repository
   Bash
   git clone https://github.com/96SHUDH/Shudhanshu-portfolio
   cd portfolio
2. Install dependencies
   Bash
   npm install
3. Configure Environment Variables
   Create a .env file in the root directory and add the following keys:

Code snippet
MONGO_URI=your_mongodb_connection_string
TOKEN_SECRET=your_jwt_secret_key
DOMAIN=http://localhost:3000 4. Create the Uploads Folder
To enable file uploads, ensure the uploads folder exists:
