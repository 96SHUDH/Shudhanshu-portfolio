import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Skill from "@/models/skillModel";

connect();

// 1. GET: Fetch all skills (Used by About Page)
export async function GET() {
  try {
    const skills = await Skill.find({});
    return NextResponse.json({ success: true, data: skills });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// 2. POST: Add a new skill (Used by Admin Dashboard)
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { name, category } = reqBody;

    // specific validation
    if (!name || !category) {
        return NextResponse.json({ error: "Name and Category are required" }, { status: 400 });
    }

    const newSkill = new Skill({ name, category });
    await newSkill.save();

    return NextResponse.json({ success: true, message: "Skill added", data: newSkill });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// 3. DELETE: Remove a skill
export async function DELETE(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { id } = reqBody;

    await Skill.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: "Skill deleted" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}