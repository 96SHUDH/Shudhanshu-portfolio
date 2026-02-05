import { connect } from "@/dbConfig/dbConfig";
import Project from "@/models/projectModel";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        // Destructure the incoming data

        const { title, slug, description, technologies, githubLink, liveLink, featured } = reqBody;
        console.log("Attempting to create project:", title);

        //1. Validation: check if critical fields are present

        if (!title || !slug || !description || !githubLink) {
            return NextResponse.json({ error: "Please fill required fields (Title, Slug, Desc, Github)" }, { status: 400 });
        }

        // 2. Duplicate Check: Ensure slug is unique

        const existingProject = await Project.findOne({ slug });
        if (existingProject) {
            return NextResponse.json({ error: "A project withi this Slug already exixts!" }, { status: 400 });

        }

        // 3. Create the Project
        const newProject = new Project({
            title,
            slug,
            description,
            technologies, // This should be an array ["Node", "React"]
            githubLink,
            liveLink,
            featured: featured || false,
        });

        const savedProject = await newProject.save();
        console.log("✅ Project saved successfully!")

        return NextResponse.json({
            message: "Project created successfully",
            success: true,
            savedProject
        });

    } catch (error:any) {
        console.log("❌ Error in POST /api/projects:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}


export async function GET(request: NextRequest) {
    
    try {
        // Fetch all projects, sorted by newest first (-1)
        const projects = await Project.find({}).sort({ createdAt: -1 });

        return NextResponse.json({
            message: "Projects fetched successfully",
            success: true,
            data: projects
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
        
    }
    
}