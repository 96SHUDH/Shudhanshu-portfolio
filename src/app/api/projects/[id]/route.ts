import { connect } from "@/dbConfig/dbConfig";
import Project from "@/models/projectModel";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

connect();

// The "params" argument gives us the [id] from the URL
export async function GET(
    request: NextRequest, 
    { params }: { params: Promise<{ id: string }> }) {
 try {
        const { id } = await params; 

        let project;

        // SMART CHECK: Is this a MongoDB ID or a Slug?
        if (mongoose.isValidObjectId(id)) {
            // It looks like an ID (e.g., 69805bf0...), so search by _id
            project = await Project.findById(id);
        } else {
            // It's not an ID, so it must be a slug (e.g., weather-app)
            project = await Project.findOne({ slug: id });
        }

        if (!project) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }

        return NextResponse.json({
            message: "Project found",
            success: true,
            data: project
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// ... (Your existing GET function is up here)

export async function DELETE(
    request: NextRequest, 
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        
        // Note: We are finding by _id here, not slug, because the frontend usually sends ID for delete
        // But if your frontend sends ID, we use findByIdAndDelete
        const deletedProject = await Project.findByIdAndDelete(id);

        if (!deletedProject) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }

        return NextResponse.json({
            message: "Project deleted successfully",
            success: true,
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const reqBody = await request.json();

        // Find by ID and Update
        // { new: true } returns the updated document so we can see it
        const updatedProject = await Project.findByIdAndUpdate(id, reqBody, { new: true });

        if (!updatedProject) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }

        return NextResponse.json({
            message: "Project updated successfully",
            success: true,
            data: updatedProject
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}