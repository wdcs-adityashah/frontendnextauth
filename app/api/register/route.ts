import User from "@/models/User";
import connectDB from "@/config/db";
import bcrypt from 'bcryptjs';
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export const POST = async(request:NextRequest) => {
    const {username, email, password, confirmpassword} = await request.json();
    
    if (password !== confirmpassword) {
        return new NextResponse(
            JSON.stringify({ error: "Passwords do not match" }),
            { status: 400 }
        );
    }

    await connectDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return new NextResponse(
            JSON.stringify({ error: "User already exists" }),
            { status: 400 }
        );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });

    try {
        await newUser.save();
        return new NextResponse("User is registered", { status: 201 });
    } catch (error) {
        console.error(error); // Log the error to the console

        return new NextResponse(
            JSON.stringify({ error: "Server error, please try again later" }),
            { status: 500 }
        );
    }
};
