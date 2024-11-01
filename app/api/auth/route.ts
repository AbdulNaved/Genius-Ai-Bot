// import handlers from "@/app/api/auth/[...nextauth]/route"; // Correct relative path

import { NextResponse } from 'next/server';
import { connectToDatabase } from "@/app/lib/utils"; // Ensure this import path is correct
import { User } from "@/app/models/userModel"; // Ensure this import path is correct
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
    }

    await connectToDatabase();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 400 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 400 });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );

    return NextResponse.json({ message: "Login successful", token }, { status: 200 });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}


// export const { GET, POST } = handlers; // Destructuring GET and POST from handlers


// export async function GET(request: Request) {
//     // Handle GET requests
//     return new Response("GET method from auth");
//   }
  
//   export async function POST(request: Request) {
//     // Handle POST requests
//     const data = await request.json();
//     return new Response(`POST method with data: ${JSON.stringify(data)}`);
// }

// //import handlers from "@/app/api/auth/[...nextauth]/auth"
// import handlers from "../auth/"; // Assuming `auth.ts` is in the same directory

// // export const { GET, POST } = handlers;

// // app/api/auth/auth.ts
// // app/api/auth/route.ts
  