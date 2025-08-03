import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/utils";
import { User } from "@/app/models/userModel";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json();

    if (!email || !password || !name) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return NextResponse.json(
      { message: "User created", user: newUser },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("❌ Signup Error:", error.message);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}

// import { NextResponse } from "next/server";
// import { connectToDatabase } from "@/app/lib/utils";
// import { User } from "@/app/models/userModel";
// import bcrypt from "bcryptjs";

// export async function POST(request: Request) {
//   try {
//     const { email, password, name } = await request.json();

//     if (!email || !password || !name) {
//       return NextResponse.json(
//         { message: "All fields are required" },
//         { status: 400 }
//       );
//     }

//     await connectToDatabase();

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return NextResponse.json(
//         { message: "User already exists" },
//         { status: 400 }
//       );
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//     });

//     return NextResponse.json(
//       { message: "User created", user: newUser },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Signup API error:", error?.message, error?.stack);
//     return NextResponse.json(
//       { message: "Internal Server Error" },
//       { status: 500 }
//     );
//   }

// }

// import { NextResponse } from "next/server";
// import { connectToDatabase } from "@/app/lib/utils";
// import { User } from "@/app/models/userModel";
// import bcrypt from "bcryptjs";

// export async function POST(request: Request) {
//   const { email, password, name } = await request.json();

//   if (!email || !password || !name) {
//     return NextResponse.json({ message: "All fields are required" }, { status: 400 });
//   }

//   await connectToDatabase();

//   const existingUser = await User.findOne({ email });
//   if (existingUser) {
//     return NextResponse.json({ message: "User already exists" }, { status: 400 });
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);
//   const newUser = await User.create({
//     name,
//     email,
//     password: hashedPassword,
//   });

//   return NextResponse.json({ message: "User created", user: newUser }, { status: 201 });
// }
