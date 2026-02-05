import mongoose from "mongoose";
import { unique } from "next/dist/build/utils";
import { features, title } from "process";

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide a project title"],
    },
    slug: {
        // This is the URL-friendly name
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: [true, "Please provide a description"],
    },
    technologies: {
        type: [String],  // like array
        default: [],
        
    },
    githubLink: {
        type: String,
        required: [true, "Please provide a GitHub link"],
    },
    liveLink: String,

    //Images
    coverImage: String, //main Thumbnail
    architectureDiagram: String, //For backend projects

    features: {
        type: Boolean,
        default: false, //
    }

}, { timestamps: true });

// Check if model exists to prevent Next.js "OverwriteModelError"

const Project = mongoose.models.projects || mongoose.model("projects", projectSchema);

export default Project;