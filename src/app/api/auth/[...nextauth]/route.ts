import NextAuth, { AuthOptions, User as NextAuthUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "../../../models/userModel"; // Adjust path as necessary
import { connectToDatabase } from "../../../lib/utils";
import { hash, compare } from "bcryptjs"; // You may need this for hashing passwords

interface Credentials {
  email: string;
  password: string;
  name?: string;
}

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        name: { label: "Name", type: "text" },
      },
      authorize: async (credentials: Credentials | undefined) => {
        if (!credentials) throw new Error("Missing credentials");

        const { email, password, name } = credentials;

        await connectToDatabase();

        // Check if user exists
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
          // Create a new user if they don't exist
          const hashedPassword = await hash(password, 10);

          const newUser = await User.create({
            email,
            password: hashedPassword,
            name,
          });

          return { id: newUser._id.toString(), email: newUser.email, name: newUser.name };
        }

        // If the user exists, compare passwords
        const isMatch = await compare(password, existingUser.password);
        if (!isMatch) {
          throw new Error("Invalid credentials");
        }

        return { id: existingUser._id.toString(), email: existingUser.email, name: existingUser.name };
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/auth/error",
  },
  callbacks: {
    async signIn({ user, account }: { user: NextAuthUser; account: any }) {
      return true;
    },
  },
  debug: true,
};

// Explicitly export the NextAuth handler for GET and POST requests
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };


// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { User } from "../../../models/userModel";
// import { compare } from "bcryptjs";
// import { connectToDatabase } from "../../../lib/utils";

// // Custom error class if needed
// class CredentialsSigninError extends Error {
//   constructor(message: string, cause?: any) {
//     super(message);
//     this.name = "CredentialsSigninError";
//     this.cause = cause;
//   }
// }

// // Create an auth handler function to export as POST
// const authHandler = NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       authorize: async (credentials) => {
//         const email = credentials?.email as string | undefined;
//         const password = credentials?.password as string | undefined;

//         if (!email || !password) {
//           throw new CredentialsSigninError("Please provide both email and password.", {
//             cause: "Missing credentials",
//           });
//         }

//         // Connect to the database
//         await connectToDatabase();

//         const user = await User.findOne({ email }).select("+password");

//         if (!user || !user.password) {
//           throw new CredentialsSigninError("Invalid Email or Password.", {
//             cause: "User not found or missing password",
//           });
//         }

//         const isMatch = await compare(password, user.password);

//         if (!isMatch) {
//           throw new CredentialsSigninError("Invalid Email or Password.", {
//             cause: "Password mismatch",
//           });
//         }

//         return { name: user.name, email: user.email, id: user._id };
//       },
//     }),
//   ],
//   pages: {
//     signIn: "/login", // Custom login page
//   },
//   callbacks: {
//     async signIn({ user, account }) {
//       if (account?.provider === "google") {
//         try {
//           const { email, name, image, id } = user;

//           await connectToDatabase();

//           const existingUser = await User.findOne({ email });

//           if (!existingUser) {
//             await User.create({ email, name, image, googleId: id });
//           }
//           return true; // Allow sign-in
//         } catch (error) {
//           throw new Error("Error while creating user");
//         }
//       }
//       return true; // Allow sign-in for other providers
//     },
//   },
//   debug: true, // Enables detailed logs for debugging
// });

// // Export the POST method explicitly
// export { authHandler as POST };




// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { User } from "../../../models/userModel";
// import { compare } from "bcryptjs";
// import { connectToDatabase } from "../../../lib/utils";

// // Custom error class if needed
// class CredentialsSigninError extends Error {
//   constructor(message: string, cause?: any) {
//     super(message);
//     this.name = "CredentialsSigninError";
//     this.cause = cause;
//   }
// }

// export default NextAuth({
//   providers: [
//     // GoogleProvider({
//     //   clientId: process.env.GOOGLE_CLIENT_ID,
//     //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     // }),
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
    
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: {
//           label: "Email",
//           type: "email",
//         },
//         password: { label: "Password", type: "password" },
//       },
//       authorize: async (credentials) => {
//         const email = credentials?.email as string | undefined;
//         const password = credentials?.password as string | undefined;

//         if (!email || !password) {
//           throw new CredentialsSigninError("Please provide both email and password.", {
//             cause: "Missing credentials",
//           });
//         }

//         // Connect to the database
//         await connectToDatabase();

//         const user = await User.findOne({ email }).select("+password");

//         if (!user || !user.password) {
//           throw new CredentialsSigninError("Invalid Email or Password.", {
//             cause: "User not found or missing password",
//           });
//         }

//         const isMatch = await compare(password, user.password);

//         if (!isMatch) {
//           throw new CredentialsSigninError("Invalid Email or Password.", {
//             cause: "Password mismatch",
//           });
//         }

//         return { name: user.name, email: user.email, id: user._id };
//       },
//     }),
//   ],
//   pages: {
//     signIn: "/login", // Custom login page
//   },
//   callbacks: {
//     async signIn({ user, account }) {
//       if (account?.provider === "google") {
//         try {
//           const { email, name, image, id } = user;

//           await connectToDatabase();

//           const existingUser = await User.findOne({ email });

//           if (!existingUser) {
//             await User.create({ email, name, image, googleId: id });
//           }
//           return true; // Allow sign-in
//         } catch (error) {
//           throw new Error("Error while creating user");
//         }
//       }
//       return true; // Allow sign-in for other providers
//     },
//   },
//   debug: true, // Enables detailed logs for debugging
// });



// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { User } from "./models/userModel";
// import { compare } from "bcryptjs";
// import { connectToDatabase } from "./lib/utils";

// // Custom error class if needed
// class CredentialsSigninError extends Error {
//   constructor(message: string, cause?: any) {
//     super(message);
//     this.name = "CredentialsSigninError";
//     this.cause = cause;
//   }
// }

// export default NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: {
//           label: "Email",
//           type: "email",
//         },
//         password: { label: "Password", type: "password" },
//       },
//       authorize: async (credentials) => {
//         const email = credentials?.email as string | undefined;
//         const password = credentials?.password as string | undefined;

//         if (!email || !password) {
//           throw new CredentialsSigninError("Please provide both email and password.", {
//             cause: "Missing credentials",
//           });
//         }

//         // Connect to the database
//         await connectToDatabase();

//         const user = await User.findOne({ email }).select("+password");

//         if (!user || !user.password) {
//           throw new CredentialsSigninError("Invalid Email or Password.", {
//             cause: "User not found or missing password",
//           });
//         }

//         const isMatch = await compare(password, user.password);

//         if (!isMatch) {
//           throw new CredentialsSigninError("Invalid Email or Password.", {
//             cause: "Password mismatch",
//           });
//         }

//         return { name: user.name, email: user.email, id: user._id };
//       },
//     }),
//   ],
//   pages: {
//     signIn: "/login",
//   },
//   callbacks: {
//     signIn: async ({ user, account }) => {
//       if (account?.provider === "google") {
//         try {
//           const { email, name, image, id } = user;

//           await connectToDatabase();

//           const alreadyUser = await User.findOne({ email });

//           if (!alreadyUser) {
//             await User.create({ email, name, image, googleId: id });
//           }
//           return true; // Allow sign-in
//         } catch (error) {
//           throw new Error("Error while creating user");
//         }
//       }

//       return true; // Allow sign-in for other providers
//     },
//   },
// });


