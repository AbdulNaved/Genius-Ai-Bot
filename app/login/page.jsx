"use client";

import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LoginForm } from "@/components/client/form";
import { signIn } from "next-auth/react";

const Page = () => {
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      await signIn("google", { callbackUrl: "/" }); // Redirect to "/" after Google login
    } catch (error) {
      console.error("Google Sign-in failed", error);
    }
  };

  return (
    <div className="text-white flex justify-center items-center h-dvh">
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-center items-center">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter className="text-white flex flex-col gap-4">
          <span>Or</span>
          <Button variant="outline" onClick={handleGoogleSignIn}>
            Login With Google
          </Button>
          <Link href="/signup" className="mt-2">
            Don’t have an account? Signup
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;


// correct 

// "use client"; // Indicates this is client-side code

// import React from "react";
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"; // Only import once
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { useRouter } from "next/navigation"; // useRouter for client-side navigation
// import { LoginForm } from "@/components/client/form";
// import { signIn } from "next-auth/react"; // Fixed import

// const Page = () => {
//   const router = useRouter(); // For client-side navigation

//   const handleGoogleSignIn = async () => {
//     try {
//       await signIn("google"); // Trigger Google sign-in
//       router.push("/"); // Redirect on success
//     } catch (error) {
//       console.error("Google Sign-in failed", error);
//     }
//   };

//   return (
//     <div className="text-white flex justify-center items-center h-dvh">
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex justify-center items-center">Login</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <LoginForm /> {/* Your login form component */}
//         </CardContent>
//         <CardFooter className=" text-white flex flex-col gap-4">
//           <span>Or</span>
//           <Button variant="outline" onClick={handleGoogleSignIn}>
//             Login With Google
//           </Button>
//           <Link href="/signup" className="mt-2">
//             Dont have an account? Signup
//           </Link>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// };

// export default Page;

