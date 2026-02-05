import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { error } from "console";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;

        // 1. Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "User does not exist" }, { status: 400 });

        }
        // 2. Check if password is correct
        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json({ error: "Invalid password" }, { status: 400 });

        }

        // 3. Create Token Data

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin
        };

        // 4. Generate the Token (The "Badge")

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" });

        const response = NextResponse.json({
            message: "Login successfully",
            success: true,
        });

        // 5. Set the Cookie (This attaches the badge to your browser)
        response.cookies.set("token", token, {
            httpOnly: true,  //Frontend cannot access this (security)
        });
        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
        
    }
    
}