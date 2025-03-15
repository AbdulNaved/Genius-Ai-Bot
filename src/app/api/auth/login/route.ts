import { NextResponse } from 'next/server';
import { connectToDatabase } from "@/app/lib/utils";
import { User } from "@/app/models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Validate email and password presence
    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
    }

    // Ensure connection to the database
    await connectToDatabase();

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 400 });
    }

    // Check if the password matches
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 400 });
    }

    // Ensure JWT_SECRET is available and sign the JWT
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not defined in environment variables");
      return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return NextResponse.json({ message: "Login successful", token }, { status: 200 });
  } catch (error: any) {
    console.error("Login error:", error.message || error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}


// import { NextResponse } from 'next/server';
// import { connectToDatabase } from "@/app/lib/utils";
// import { User } from "@/app/models/userModel";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// export async function POST(req: Request) {
//   try {
//     const { email, password } = await req.json();

//     if (!email || !password) {
//       console.log("Missing email or password");
//       return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
//     }

//     await connectToDatabase();

//     const user = await User.findOne({ email });
//     if (!user) {
//       console.log("User not found");
//       return NextResponse.json({ message: "Invalid credentials" }, { status: 400 });
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       console.log("Invalid password");
//       return NextResponse.json({ message: "Invalid credentials" }, { status: 400 });
//     }

//     if (!process.env.JWT_SECRET) {
//       console.log("JWT_SECRET is not defined in environment variables");
//       throw new Error("JWT_SECRET is missing");
//     }

//     const token = jwt.sign(
//       { userId: user._id, email: user.email },
//       process.env.JWT_SECRET,
//       { expiresIn: '1h' }
//     );

//     console.log("Login successful");
//     return NextResponse.json({ message: "Login successful", token }, { status: 200 });
//   } catch (error) {
//     console.error("Login error:", error);
//     return NextResponse.json({ message: "Internal server error" }, { status: 500 });
//   }
// }


// correct
// import { NextResponse } from 'next/server';
// import { connectToDatabase } from "@/app/lib/utils";
// import { User } from "@/app/models/userModel";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// export async function POST(req: Request) {
//   try {
//     const { email, password } = await req.json();

//     if (!email || !password) {
//       return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
//     }

//     await connectToDatabase();

//     const user = await User.findOne({ email });
//     if (!user) {
//       return NextResponse.json({ message: "Invalid credentials" }, { status: 400 });
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return NextResponse.json({ message: "Invalid credentials" }, { status: 400 });
//     }

//     const token = jwt.sign(
//       { userId: user._id, email: user.email },
//       process.env.JWT_SECRET as string,
//       { expiresIn: '1h' }
//     );

//     return NextResponse.json({ message: "Login successful", token }, { status: 200 });
//   } catch (error) {
//     console.error("Login error:", error);
//     return NextResponse.json({ message: "Internal server error" }, { status: 500 });
//   }
// }


// import { credentialsLogin } from '@/app/api/auth/login/route';
// import { NextResponse } from 'next/server';
// import { connectToDatabase } from "@/app/lib/utils";
// import { User } from "@/app/models/userModel";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// export async function credentialsLogin(req: Request) {
//   try {
//     const { email, password } = await req.json();

//     if (!email || !password) {
//       return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
//     }

//     await connectToDatabase();

//     const user = await User.findOne({ email });
//     if (!user) {
//       return NextResponse.json({ message: "Invalid credentials" }, { status: 400 });
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return NextResponse.json({ message: "Invalid credentials" }, { status: 400 });
//     }

//     const token = jwt.sign(
//       { userId: user._id, email: user.email },
//       process.env.JWT_SECRET as string,
//       { expiresIn: '1h' }
//     );

//     return NextResponse.json({ message: "Login successful", token }, { status: 200 });
//   } catch (error) {
//     console.error("Login error:", error);
//     return NextResponse.json({ message: "Internal server error" }, { status: 500 });
//   }
// }

// // Export credentialsLogin as the default export or named export based on your usage
// export { credentialsLogin };





// import { NextResponse } from 'next/server'; // For Next.js App Router responses
// import { connectToDatabase } from "@/app/lib/utils"; // Ensure proper DB connection utility
// import { User } from "@/app/models/userModel"; // Your user model schema
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken"; // For generating JWT tokens (if needed)

// export async function POST(req: Request) {
//   try {
//     // Parse request body
//     const { email, password } = await req.json();

//     // Validate input
//     if (!email || !password) {
//       return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
//     }

//     // Connect to the database
//     await connectToDatabase();

//     // Check if the user exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       return NextResponse.json({ message: "Invalid credentials" }, { status: 400 });
//     }

//     // Validate password
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return NextResponse.json({ message: "Invalid credentials" }, { status: 400 });
//     }

//     // Generate JWT token (or handle session creation if you prefer sessions)
//     const token = jwt.sign(
//       { userId: user._id, email: user.email }, 
//       process.env.JWT_SECRET as string, // Ensure the secret is in your environment variables
//       { expiresIn: '1h' } // Token expires in 1 hour
//     );

//     // Send the token back (or use cookies/sessions as required)
//     return NextResponse.json({ message: "Login successful", token }, { status: 200 });

//   } catch (error) {
//     console.error("Login error:", error); // Log the error for debugging
//     return NextResponse.json({ message: "Internal server error" }, { status: 500 });
//   }
// }




// corect
// import { NextResponse } from 'next/server'; // Use NextResponse for new App Router
// import { connectToDatabase } from "@/app/lib/utils";
// import { User } from "@/app/models/userModel";
// import bcrypt from "bcryptjs";

// // POST request handler
// export async function POST(req: Request) {
//   try {
//     const { email, password } = await req.json(); // Use req.json() to parse the body in App Router

//     if (!email || !password) {
//       return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
//     }

//     await connectToDatabase();

//     const user = await User.findOne({ email });
//     if (!user) {
//       return NextResponse.json({ message: "Invalid credentials" }, { status: 400 });
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return NextResponse.json({ message: "Invalid credentials" }, { status: 400 });
//     }

//     // Generate JWT token or session (not implemented here)
//     return NextResponse.json({ message: "Login successful" }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ message: "Internal server error" }, { status: 500 });
//   }
// }


// export async function GET(req: Request) {
//   // Handle GET requests here
// }
