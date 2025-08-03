"use client";

import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
import React from "react";

const LoginForm = () => {
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
      return toast.error("Please provide all fields");
    }

    const toastId = toast.loading("Logging in...");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("Login response:", data); // Debugging: Log the response

      if (response.ok) {
        toast.success("Login Successful", { id: toastId });
        // Add a small delay to ensure toast finishes displaying before redirect
        
        router.push("/");
        router.refresh(); // Refresh the router to update the state
        // Redirect to homepage after successful login
       
      } else {
        toast.error(data.message || "Login failed", { id: toastId });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred. Please try again later.", { id: toastId });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="text-white flex flex-col gap-4">
      <Input type="email" placeholder="Email" name="email" className="text-white" required />
      <Input type="password" className="text-white" placeholder="Password" name="password" required />
      <Button type="submit" className="text-black py-2 px-3 rounded-xl bg-gray-200">Login</Button>
    </form>
  );
};

export { LoginForm };



// correct
// "use client";

// import { toast } from "sonner";
// import { Button } from "../ui/button";
// import { Input } from "../ui/input";
// import { useRouter } from "next/navigation";
// import { credentialsLogin } from "@/app/api/actions/login"; // Ensure this path is correct
// import React from "react";

// const LoginForm = () => {
//   const router = useRouter();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData(e.currentTarget);
//     const email = formData.get("email");
//     const password = formData.get("password");

//     if (!email || !password) {
//       return toast.error("Please provide all fields");
//     }

//     const toastId = toast.loading("Logging in...");

//     const error = await credentialsLogin(email, password);

//     if (!error) {
//       toast.success("Login Successful", {
//         id: toastId,
//       });
//       router.push("/"); // Redirect to homepage after successful login
//     } else {
//       toast.error(error, {
//         id: toastId,
//       });
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//       <Input type="email" placeholder="Email" name="email" required />
//       <Input type="password" placeholder="Password" name="password" required />
//       <Button type="submit">Login</Button>
//     </form>
//   );
// };

// export { LoginForm };


// "use client";

// import { toast } from "sonner";
// import { Button } from "../ui/button";
// import { Input } from "../ui/input";
// import { useRouter } from "next/navigation";
// import { credentialsLogin } from "@/app/api/actions/login"; // Ensure this path is correct
// import React, { FormEvent } from "react";

// const LoginForm = () => {
//   const router = useRouter();

//   return (
//     <form action={async (formData) => {
//       const email = formData.get("email") ;
//       const password = formData.get("password");

//       if (!email || !password) 
//         return 
//       toast.error("please provide all fileds");

//       const toastId = toast.loading("Logging in");

//       const error = await credentialsLogin(email, password);

//       if(!error) 
//         toast.success("Login Successfull", {
//         id: toastId,
//         });
//       else

      
//     }} className="flex flex-col gap-4">
//       <Input type="email" placeholder="Email" name="email" required />
//       <Input type="password" placeholder="Password" name="password" required />
//       <Button type="submit">Login</Button>
//     </form>
//   );
// };

// export { LoginForm };


// "use client";

// import { toast } from "sonner";
// import { Button } from "../ui/button";
// import { Input } from "../ui/input";
// import { useRouter } from "next/navigation";
// import { creadentialsLogin } from "@/app/api/actions/login";
// import React, { FormEvent } from "react";

// const LoginForm = () => {
//   const router = useRouter();

//   // Event handler for form submission
//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault(); // Prevent page reload

//     const formData = new FormData(e.currentTarget);
//     const email = formData.get("email") as string;
//     const password = formData.get("password") as string;

//     if (!email || !password) {
//       return toast.error("Please provide all fields");
//     }

//     const toastId = toast.loading("Logging in...");

//     const error = await creadentialsLogin(email, password);

//     if (!error) {
//       toast.success("Login successful.", {
//         id: toastId,
//       });
//       router.push("/"); // Redirect after successful login
//     } else {
//       toast.error(error, {
//         id: toastId,
//       });
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//       <Input type="email" placeholder="Email" name="email" />
//       <Input type="password" placeholder="Password" name="password" />
//       <Button type="submit">Login</Button>
//     </form>
//   );
// };

// export { LoginForm };


// "use client";

// import { toast } from "sonner";
// import { Button } from "../ui/button";
// import { Input } from "../ui/input";
// import { credentialsLogin } from "@/app/api/actions/login"; // Fixed typo
// import { useRouter } from "next/navigation";

// const LoginForm = () => {
//   const router = useRouter();

//   return (
//     <form
//       action={async (formData) => {
//         const email = formData.get("email") as string;
//         const password = formData.get("password") as string;

//         if (!email || !password) {
//           toast.error("Please provide all fields");
//           return;
//         }

//         const toastId = toast.loading("Logging in...");

//         const error = await credentialsLogin(email, password); // Fixed function name

//         if (!error) {
//           toast.success("Login Successful.", {
//             id: toastId,
//           });
//           router.refresh(); // Correctly refreshing the router after success
//         } else {
//           toast.error(error, {
//             id: toastId,
//           });
//         }
//       }}
//       className="flex flex-col gap-4"
//     >
//       <Input type="email" placeholder="Email" name="email" />
//       <Input type="password" placeholder="Password" name="password" />
//       <Button type="submit">Login</Button>
//     </form>
//   );
// };

// export { LoginForm };


// "use client";

// import { toast } from "sonner";
// import { Button } from "../ui/button";
// import { Input } from "../ui/input";
// import { creadentialsLogin } from "@/app/api/actions/login";
// import { useRouter } from "next/navigation";

// const LoginForm = () => {
//     const router =useRouter();

//     return <form action={async (formData) => {
//         const email = formData.get("email") as string 
//         const password = formData.get("password") as string 

//         if (!email ||  !password) 
//             return toast.error("please provide all fileds");
        
//         const toastId = toast.loading("Logging in");

//         const error = await creadentialsLogin(email, password);
       
//         if (!error)
//              toast.success("Login Successfull.",{
//               id: toastId,
//             });
//             router.refresh()
//         else{
//             toast.error(error, {
//                 id: toastId,
//             })
//         }

        
//       }} className="flex flex-col gap-4">
//        <Input type="email" placeholder="Email" name="email"/>
//        <Input type="password" placeholder="password" name="password"/>
//        <Button type="submit" >Login</Button>

//     </form>
// }

// export {
//     LoginForm
// }