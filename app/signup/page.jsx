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


