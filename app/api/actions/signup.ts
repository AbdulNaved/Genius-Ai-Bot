// "use server";

// import { connectToDatabase } from "@/app/lib/utils";
// import { User } from "@/app/models/userModel";
// import { hash } from "bcryptjs";
// import { redirect } from "next/navigation"; // Use next/navigation for redirection

// const signUp = async (formData: FormData) => {
//   const name = formData.get("name") as string | undefined;
//   const email = formData.get("email") as string | undefined;
//   const password = formData.get("password") as string | undefined;

//   // Check if all fields are provided
//   if (!name || !email || !password) {
//     throw new Error("Please provide all fields");
//   }

//   // Connect to the database
//   await connectToDatabase();

//   // Check if the user already exists
//   const existingUser = await User.findOne({ email });
//   if (existingUser) throw new Error("User already exists");

//   // Hash the password
//   const hashedPassword = await hash(password, 10);

//   // Create a new user
//   await User.create({
//     name,
//     email,
//     password: hashedPassword,
//   });

//   // Redirect after successful signup
//   redirect("/login");
// };

// export { signUp };
