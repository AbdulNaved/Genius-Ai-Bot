import { NextApiRequest, NextApiResponse } from "next";
// import { connectToDatabase } from "@/lib/utils";
// import { User } from "@/models/userModel";
import { connectToDatabase } from "@/app/lib/utils";
import { User } from "@/app/models/userModel";
import bcrypt from "bcryptjs";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    await connectToDatabase();

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate and return JWT token or session here

    return res.status(200).json({ message: "Login successful" });
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
