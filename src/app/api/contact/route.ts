import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Message from "@/models/messageModel";

connect();

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


// ... existing POST code is above this ...

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