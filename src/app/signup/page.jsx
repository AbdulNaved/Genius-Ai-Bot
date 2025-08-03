"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Toaster } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2, Check, Mail, User, Lock, Eye, EyeOff } from "lucide-react";
import Image from "next/image";

export default function SignupPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (!name || !email || !password || !confirmPassword) {
      setIsLoading(false);
      return toast.error("Please provide all fields");
    }

    if (password !== confirmPassword) {
      setIsLoading(false);
      return toast.error("Passwords do not match");
    }

    const toastId = toast.loading("Creating your account...");

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      let data = {};
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      }

      setIsLoading(false);

      if (response.ok) {
        toast.success("Account created successfully", { id: toastId });
        setTimeout(() => {
          router.push("/login");
        }, 500);
      } else {
        toast.error(data.message || "Failed to create account", {
          id: toastId,
        });
      }
    } catch (error) {
      console.error("Signup error:", error);
      setIsLoading(false);
      toast.error("An error occurred. Please try again later.", {
        id: toastId,
      });
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 to-customDark">
      <Toaster position="top-center" />

      {/* Left side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 md:p-12">
        <Card className="w-full max-w-md border border-gray-800 bg-gray-900/90 backdrop-blur-sm text-white shadow-2xl rounded-2xl">
          <CardHeader className="space-y-2 text-center pb-2">
            <div className="mx-auto w-16 h-16 mb-2 flex items-center justify-center rounded-full bg-blue-600/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-blue-500"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <CardTitle className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Create Account
            </CardTitle>
            <CardDescription className="text-gray-400 text-base">
              Join Genius AI and start exploring
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <User size={18} />
                </div>
                <Input
                  type="text"
                  placeholder="Full Name"
                  name="name"
                  className="bg-gray-800 border-gray-700 text-white pl-10 py-6"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Mail size={18} />
                </div>
                <Input
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  className="bg-gray-800 border-gray-700 text-white pl-10 py-6"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Lock size={18} />
                </div>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  className="bg-gray-800 border-gray-700 text-white pl-10 pr-10 py-6"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Lock size={18} />
                </div>
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  className="bg-gray-800 border-gray-700 text-white pl-10 pr-10 py-6"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>

              <Button
                type="submit"
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-xl transition-all duration-200 font-medium text-base"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  <>Create Account</>
                )}
              </Button>
            </form>

            <div className="mt-8 text-center text-sm text-gray-400">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-blue-500 hover:text-blue-400 transition-colors"
              >
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right side - Hidden on mobile */}
      <div className="hidden lg:flex lg:w-1/2 bg-gray-900 items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-500 opacity-10 z-0"></div>
        <div className="relative z-10 max-w-xl text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Join Our Community
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Create an account to access all features and start your AI journey
            with Genius AI.
          </p>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-gray-800/60 backdrop-blur-sm p-4 rounded-xl border border-gray-700">
              <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center mb-3 mx-auto">
                <Check className="h-5 w-5 text-blue-500" />
              </div>
              <h3 className="text-white font-medium mb-1">Smart Responses</h3>
              <p className="text-gray-400 text-sm">
                Get intelligent answers to all your questions
              </p>
            </div>
            <div className="bg-gray-800/60 backdrop-blur-sm p-4 rounded-xl border border-gray-700">
              <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center mb-3 mx-auto">
                <Check className="h-5 w-5 text-blue-500" />
              </div>
              <h3 className="text-white font-medium mb-1">Image Analysis</h3>
              <p className="text-gray-400 text-sm">
                Upload images for AI-powered insights
              </p>
            </div>
          </div>
          <div className="rounded-xl overflow-hidden shadow-2xl border border-gray-700">
            <Image
              src="https://images.unsplash.com/photo-1677442135136-760c813a743d?w=800&q=80"
              alt="AI Technology"
              width={500}
              height={300}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

