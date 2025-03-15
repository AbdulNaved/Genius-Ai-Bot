"use client";

import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Loader2, Mail, Lock, Eye, EyeOff } from "lucide-react";

const LoginForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
      setIsLoading(false);
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

      if (response.ok) {
        toast.success("Login Successful", { id: toastId });
        // Add a small delay to ensure toast finishes displaying before redirect
        setTimeout(() => {
          router.push("/"); // Redirect to homepage after successful login
        }, 500);
      } else {
        setIsLoading(false);
        toast.error(data.message || "Login failed", { id: toastId });
      }
    } catch (error) {
      console.error("Login error:", error);
      setIsLoading(false);
      toast.error("An error occurred. Please try again later.", {
        id: toastId,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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

      <div className="flex items-center justify-between mt-1 mb-2">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="remember"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
            className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500"
          />
          <label
            htmlFor="remember"
            className="ml-2 text-sm text-gray-400 cursor-pointer"
          >
            Remember me
          </label>
        </div>
        <a
          href="#"
          className="text-sm text-blue-500 hover:text-blue-400 transition-colors"
        >
          Forgot password?
        </a>
      </div>

      <Button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-xl transition-all duration-200 font-medium text-base"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Signing in...
          </>
        ) : (
          "Sign in"
        )}
      </Button>

      <div className="relative my-2">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-700"></div>
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-gray-900 px-2 text-gray-500">
            Or continue with
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          className="flex items-center justify-center gap-2 rounded-lg border border-gray-700 bg-gray-800 py-2.5 px-4 text-sm font-medium text-white hover:bg-gray-700 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            className="h-5 w-5"
          >
            <path
              fill="#EA4335"
              d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115Z"
            />
            <path
              fill="#34A853"
              d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.823l-4.04 3.067A11.965 11.965 0 0 0 12 24c2.933 0 5.735-1.043 7.834-3l-3.793-2.987Z"
            />
            <path
              fill="#4A90E2"
              d="M19.834 21c2.195-2.048 3.62-5.096 3.62-9 0-.71-.109-1.473-.272-2.182H12v4.637h6.436c-.317 1.559-1.17 2.766-2.395 3.558L19.834 21Z"
            />
            <path
              fill="#FBBC05"
              d="M5.277 14.268A7.12 7.12 0 0 1 4.909 12c0-.782.125-1.533.357-2.235L1.24 6.65A11.934 11.934 0 0 0 0 12c0 1.92.445 3.73 1.237 5.335l4.04-3.067Z"
            />
          </svg>
          <span>Google</span>
        </button>
        <button
          type="button"
          className="flex items-center justify-center gap-2 rounded-lg border border-gray-700 bg-gray-800 py-2.5 px-4 text-sm font-medium text-white hover:bg-gray-700 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z" />
            <path d="M10 2c1 .5 2 2 2 5" />
          </svg>
          <span>Apple</span>
        </button>
      </div>
    </form>
  );
};

export { LoginForm };
