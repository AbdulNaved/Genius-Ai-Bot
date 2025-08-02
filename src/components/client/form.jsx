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
        // Store the token in a cookie for middleware authentication
        document.cookie = `authToken=${data.token}; path=/; max-age=${60 * 60}`; // 1 hour expiry
        localStorage.setItem("authToken", data.token);

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

      </div>

    </form>
  );
};

export { LoginForm };
