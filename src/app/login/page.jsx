"use client";

import React from "react";
import { LoginForm } from "@/components/client/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Toaster } from "sonner";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 to-customDark">
      <Toaster position="top-center" />

      {/* Left side - Hidden on mobile */}
      <div className="hidden lg:flex lg:w-1/2 bg-gray-900 items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-500 opacity-10 z-0"></div>
        <div className="relative z-10 max-w-xl text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Genius AI Assistant
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Your personal AI-powered assistant for answering questions and
            providing insights.
          </p>
          <div className="rounded-xl overflow-hidden shadow-2xl border border-gray-700 w-full max-w-md mx-auto">
            <Image
              src="https://images.unsplash.com/photo-1593376893114-1aed528d80cf?w=800&q=80"
              alt="AI Assistant"
              width={500}
              height={300}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>

      {/* Right side - Login form */}
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
                <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
                <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
                <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
              </svg>
            </div>
            <CardTitle className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-gray-400 text-base">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <LoginForm />
            <div className="mt-8 text-center text-sm text-gray-400">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="font-medium text-blue-500 hover:text-blue-400 transition-colors"
              >
                Create an account
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
