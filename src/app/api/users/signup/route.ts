import { connect } from "@/dbConfig/dbConfig"
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { error } from "console";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { username, email, password } = reqBody;

        console.log("Creating Admin User:", username);
        // 1. Check if user already exists
        const user = await User.findOne({ email });
        if (user) {
            return NextResponse.json({ error: "User alreasy exists" }, { status: 400 });

        }
        // 2. Hash the password (Security Measure)
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        //3 save User to DB 
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            isAdmin: true //you are the Boss
        });

        const savedUser = await newUser.save();

        return NextResponse.json({
            message: "Admin Created successfully",
            success: true,
            savedUser
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
        
    }
    
}