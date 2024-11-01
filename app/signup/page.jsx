"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error before new submission

    try {
      // Make a POST request to the signup API route
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      // Check if the response is OK, otherwise set the error
      if (!res.ok) {
        const errorText = await res.text();
        setError(errorText || "Signup failed");
        return;
      }

      const data = await res.json();

      // Log in the user automatically after signup
      const signInRes = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (signInRes?.error) {
        setError(signInRes.error);
      } else {
        router.push("/"); // Redirect to the home page on successful login
      }
    } catch (error) {
      console.error("Signup error:", error);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen text-white">
      <Card>
        <CardHeader>
          <CardTitle className="text-white">Signup</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="text-white flex flex-col gap-4">
            {error && <p className="text-red-500">{error}</p>}
            <Input
              type="text"
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="text-white"
            />
            <Input
              type="email"
              placeholder="Email"
              name="email"
              className="text-white"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              name="password"
              className="text-white"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <Button type="submit" className="py-2 px-3 mt-3 outline">
              Signup
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <span>Or</span>
          <Button
            variant="outline"
            onClick={async () => {
              await signIn("google");
            }}
          >
            Login With Google
          </Button>
          <Link href="/login" className="mt-2">
            Already have an account? Login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignupPage;




// "use client";
// import React, { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import Link from "next/link";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { signIn } from "next-auth/react";
// import { useRouter } from "next/navigation";

// const SignupPage = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });
//   const [error, setError] = useState(null);
//   const router = useRouter();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Call the correct signup API route
//     const res = await fetch("api/auth/signup", { // Ensure correct API route
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(formData),
//     });

//     const data = await res.json();
//     if (!res.ok) {
//       setError(data.message || "Signup failed");
//       return;
//     }

//     // Log in the user automatically after signup
//     const signInRes = await signIn("credentials", {
//       redirect: false,
//       email: formData.email,
//       password: formData.password,
//     });

//     if (signInRes?.error) {
//       setError(signInRes.error);
//     } else {
//       router.push("/"); // Redirect to home page on successful login
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen text-white">
//       <Card>
//         <CardHeader>
//           <CardTitle className="text-white">Signup</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit} className="text-white flex flex-col gap-4">
//             {error && <p className="text-red-500">{error}</p>}
//             <Input
//               type="text"
//               placeholder="Name"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//               className="text-white"
//             />
//             <Input
//               type="email"
//               placeholder="Email"
//               name="email"
//               className="text-white"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//             <Input
//               type="password"
//               placeholder="Password"
//               name="password"
//               className="text-white"
//               value={formData.password}
//               onChange={handleChange}
//               required
//             />
//             <Button type="submit" className="py-2 px-3 mt-3 outline">Signup</Button>
//           </form>
//         </CardContent>
//         <CardFooter className="flex flex-col gap-4">
//           <span>Or</span>
//           <Button
//             variant="outline"
//             onClick={async () => {
//               await signIn("google");
//             }}
//           >
//             Login With Google
//           </Button>
//           <Link href="/login" className="mt-2">
//             Already have an account? Login
//           </Link>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// };

// export default SignupPage;




// coercty
// 'use client';
// import React, { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import Link from "next/link";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { signIn } from "next-auth/react";

// const SignupPage = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const res = await signIn("credentials", {
//       redirect: false, // Don't automatically redirect on success
//       ...formData, // Spread the form data to include all required fields
//     });

//     if (res?.error) {
//       // Handle error (e.g., show a message)
//       console.log("Error signing up:", res.error);
//     } else {
//       // Handle successful signup, possibly redirecting the user
//       console.log("Signed up successfully!");
//       // Redirect to a specific page or dashboard after signup
//       window.location.href = "/"; // Redirect to home or dashboard
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen text-white">
//       <Card>
//         <CardHeader>
//           <CardTitle className="text-white">Signup</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit} className="text-white flex flex-col gap-4">
//             <Input
//               type="text"
//               placeholder="Name"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//               className="text-white"
//             />
//             <Input
//               type="email"
//               placeholder="Email"
//               name="email"
//               className="text-white"
//               value={formData.email}
//               onChange={handleChange}
//               required

//             />
//             <Input
//               type="password"
//               placeholder="Password"
//               name="password"
//               className="text-white"
//               value={formData.password}
//               onChange={handleChange}
//               required
//             />
//             <Button type="submit" className="text- py-2 px-3 b-3 outline ">Signup</Button>
//           </form>
//         </CardContent>
//         <CardFooter className="flex flex-col gap-4">
//           <span>Or</span>
//           <Button
//             variant="outline"
//             onClick={async () => {
//               await signIn("google");
//             }}
//           >
//             Login With Google
//           </Button>
//           <Link href="/login" className="mt-2 ">
//             Already have an account? Login
//           </Link>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// };

// export default SignupPage;



// "use client";
// import React, { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import Link from "next/link";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";

// import { signIn } from "next-auth/react";

// const SignupPage = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Implement your own sign-up logic here or use signIn for authentication
//     const res = await signIn("credentials", {
//       redirect: false, // Don't automatically redirect on success
//       name: formData.name,
//       email: formData.email,
//       password: formData.password,
//     });

//     if (res?.error) {
//       // Handle error (e.g., show a message)
//       console.log("Error signing up:", res.error);
//     } else {
//       // Handle successful signup, possibly redirecting the user
//       console.log("Signed up successfully!");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen">
//       <Card>
//         <CardHeader>
//           <CardTitle>Signup</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//             <Input
//               type="text"
//               placeholder="Name"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//             />
//             <Input
//               type="email"
//               placeholder="Email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//             <Input
//               type="password"
//               placeholder="Password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//             />
//             <Button type="submit">Signup</Button>
//           </form>
//         </CardContent>
//         <CardFooter className="flex flex-col gap-4">
//           <span>Or</span>
//           <Button
//             variant="outline"
//             onClick={async () => {
//               await signIn("google");
//             }}
//           >
//             Login With Google
//           </Button>
//           <Link href="/login" className="mt-2">
//             Already have an account? Login
//           </Link>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// };

// export default SignupPage;


// import React from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import Link from "next/link";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";

// import { signIn } from "next-auth/react";

// const page = () => {
 

//   return (
//     <div className="flex justify-center items-center h-dvh">
//       <Card>
//         <CardHeader>
//           <CardTitle>Signup</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <form action={signIn} className="flex flex-col gap-4">
//             <Input type="text" placeholder="Name" name="name" />
//             <Input type="email" placeholder="Email" name="email" />
//             <Input type="password" placeholder="Password" name="password" />
//             <Button type="submit">Signup</Button>
//           </form>
//         </CardContent>
//         <CardFooter className="flex flex-col gap-4">
//           <span>Or</span>
//           <Button
//             variant="outline"
//             onClick={async () => {
//               await signIn("google");
//             }}
//           >
//             Login With Google
//           </Button>
//           <Link href="/login" className="mt-2">
//             Already have an account? Login
//           </Link>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// };

// export default page;


// import React from "react";
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import Link from "next/link";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { User } from "../models/userModel";
// import hash from "bcryptjs"
// import { redirect } from "next/dist/server/api-utils";
// import { connectToDatabase } from "../lib/utils";

// const page = ()  => {
//   const signUp = async (formData: FormData) => {
//     "use server";

//     const name = formData.get("name") as string | undefined;
//     const email = formData.get("email") as string | undefined;
//     const password = formData.get("password") as string | undefined;
     
//     if(!email || !password || !name)
//       throw new Error("please provide all fields")

//     // connection in db
//    await connectToDatabase();

//     const user = await User.findOne({email});

//     if(user) throw new Error("User already exists");

//     const hashedPassword = await hash(password, 10);
    
//     // create new user
    
//     await User.create({
//       name,
//       email,
//       password: hashedPassword,
//     });

//     redirect("/login")

//   }} 

  
//   return (
//     <div className="flex justify-center items-center h-dvh">
//       <Card>
//         <CardHeader>
//           <CardTitle>Signup</CardTitle>
//         </CardHeader>
//         <CardContent >
//           <form action={signUp} className="flex flex-col gap-4">
//            <Input type="name" placeholder="Name" name="name"/>
//            <Input type="email" placeholder="Email" name="email"/>
//            <Input type="password" placeholder="password" name="password"/>
//            <Button type="submit" >Signup</Button>

//           </form>
  
//         </CardContent>
//         <CardFooter className="flex flex-col gap-4 ">
//           <span>Or</span>
//           <form action=""
          
//           >
//              <button type="submit" variant={"outline"}>
//                Login With Google
//               </button>
//           </form>
         
//           <Link href="/login " className="mt-2">
//            Alredy have an account? Login
//           </Link>

          
//         </CardFooter>
    
//       </Card>
//     </div>
//   );
// }

// export default page;




// "use client";

// import React, { useEffect, useState } from 'react'
// import axios from 'axios'
// import toast from 'react-hot-toast'
// import { useRouter } from 'next/navigation'
// import Link from 'next/link';

// export default function Signuppage() {
//    const router = useRouter()

//    const [user, setUser] = useState({
//      email: "",
//      password: "",
//      username: ""
//    })

//    const [buttonDisabled, setButtonDisabled] = useState(true) // Start with true to disable button initially
//    const [loading, setLoading] = useState(false)

//    const onSignup = async () => {
//       try {
//         setLoading(true)
//         const response = await axios.post("/api/users/signup", user)
//         console.log("signup success", response.data);
//         router.push('/login')
//       } catch (error: any) {
//         console.log("Signup Failed");
//         toast.error(error.message)
//       } finally {
//         setLoading(false) // Stop loading after API call
//       }
//    }

//    useEffect(() => {
//       if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
//          setButtonDisabled(false)
//       } else {
//          setButtonDisabled(true)
//       } 
//    }, [user])

//   return (
//     <div className='flex flex-col items-center justify-center min-h-screen py-2 '>
//       <h1>{loading ? "Processing" : "Signup"}</h1>
//       <hr />
//       <label htmlFor="username">Username</label>
//       <input type="text"
//         className='p-2 border border-gray-300 rounded-xl mb-4 focus:outline-none focus:border-gray-600 text-black'
//         id='username'
//         value={user.username}
//         onChange={(e) => setUser({ ...user, username: e.target.value })}
//         placeholder='Username'
//       />
//       <input type="text"
//         className='p-2 border border-gray-300 rounded-xl mb-4 focus:outline-none focus:border-gray-600 text-black'
//         id='email'
//         value={user.email}
//         onChange={(e) => setUser({ ...user, email: e.target.value })}
//         placeholder='Email'
//       />
//       <input type="password"
//         className='p-2 border border-gray-300 rounded-xl mb-4 focus:outline-none focus:border-gray-600 text-black'
//         id='password'
//         value={user.password}
//         onChange={(e) => setUser({ ...user, password: e.target.value })}
//         placeholder='Password'
//       />
//       <button
//         className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
//         onClick={onSignup} // Use onClick instead of onChange
//         disabled={buttonDisabled} // Disable button if conditions are not met
//       >
//         {buttonDisabled ? "No Signup" : "Signup"}
//       </button>
//       <Link href="/login">Go to login</Link>
//     </div>
//   )
// }
