import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Message from "@/models/messageModel";

connect();

// 1. POST: Send a new message (Public)
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { name, email, message } = reqBody;

    // Validate
    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Save to DB
    const newMessage = new Message({
      name,
      email,
      message,
    });

    await newMessage.save();

    return NextResponse.json({
      message: "Message sent successfully",
      success: true,
      newMessage,
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// 2. GET: Fetch all messages (Admin)
export async function GET() {
  try {
    // Fetch all messages and sort them by newest first (-1)
    const messages = await Message.find().sort({ createdAt: -1 });

    return NextResponse.json({
      message: "Messages fetched successfully",
      success: true,
      data: messages,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// 3. DELETE: Remove a message (Admin) -> THIS WAS MISSING
export async function DELETE(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { id } = reqBody;

    if (!id) {
      return NextResponse.json({ error: "Message ID is required" }, { status: 400 });
    }

    // Find and delete the message
    await Message.findByIdAndDelete(id);

    return NextResponse.json({ 
      success: true, 
      message: "Message deleted successfully" 
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}