import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/utils";
import { User } from "@/app/models/userModel";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  const { email, password, name } = await request.json();

  if (!email || !password || !name) {
    return NextResponse.json({ message: "All fields are required" }, { status: 400 });
  }

  await connectToDatabase();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json({ message: "User already exists" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return NextResponse.json({ message: "User created", user: newUser }, { status: 201 });
}


// // app/api/auth/signup/route.ts
// import { NextApiRequest, NextApiResponse } from "next";
// import { connectToDatabase } from "@/app/lib/utils";
// import { User } from "@/app/models/userModel";
// import bcrypt from "bcryptjs";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === "POST") {
//     const { email, password, name } = req.body;

//     if (!email || !password || !name) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     await connectToDatabase();

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//     });

//     return res.status(201).json({ message: "User created", user: newUser });
//   } else {
//     res.setHeader("Allow", ["POST"]);
//     return res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }
